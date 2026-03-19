<?php
require_once __DIR__ . '/config.php';

handle_preflight();
cors_headers();
require_post();

$input = get_json_input();
$email = isset($input['email']) ? trim(strtolower($input['email'])) : '';
$password = isset($input['password']) ? $input['password'] : '';

if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password are required.']);
    exit();
}

if (!check_rate_limit()) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many login attempts. Please try again in 15 minutes.']);
    exit();
}

record_login_attempt();

try {
    $db = get_db();

    $stmt = $db->prepare('SELECT id, email, password_hash, name, role FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid email or password.']);
        exit();
    }

    $token = create_session($user['id']);
    set_session_cookie($token);

    $db->prepare('UPDATE users SET last_login = NOW() WHERE id = ?')->execute([$user['id']]);

    cleanup_expired_sessions();

    echo json_encode([
        'success' => true,
        'user' => [
            'id' => (int)$user['id'],
            'email' => $user['email'],
            'name' => $user['name'],
            'role' => $user['role'],
        ],
        'redirectUrl' => '/portal',
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Login failed. Please try again.']);
}
