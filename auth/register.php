<?php
require_once __DIR__ . '/config.php';

handle_preflight();
cors_headers();
require_post();

$input = get_json_input();
$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim(strtolower($input['email'])) : '';
$password = isset($input['password']) ? $input['password'] : '';

if (empty($name)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name is required.']);
    exit();
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'A valid email is required.']);
    exit();
}

if (strlen($password) < 8) {
    http_response_code(400);
    echo json_encode(['error' => 'Password must be at least 8 characters.']);
    exit();
}

try {
    $db = get_db();

    $stmt = $db->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['error' => 'An account with this email already exists. Please log in.']);
        exit();
    }

    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => BCRYPT_COST]);

    $stmt = $db->prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)');
    $stmt->execute([$email, $hash, $name]);
    $userId = (int)$db->lastInsertId();

    $token = create_session($userId);
    set_session_cookie($token);

    fire_reach_api($name, $email);

    cleanup_expired_sessions();

    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $userId,
            'email' => $email,
            'name' => $name,
            'role' => 'user',
        ],
        'redirectUrl' => '/portal',
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Registration failed. Please try again.']);
}
