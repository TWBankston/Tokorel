<?php
require_once __DIR__ . '/config.php';

handle_preflight();
cors_headers();
require_post();

$user = get_authenticated_user();

if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated.']);
    exit();
}

$input = get_json_input();
$currentPassword = $input['current_password'] ?? '';
$newPassword = $input['new_password'] ?? '';

if (empty($currentPassword)) {
    http_response_code(400);
    echo json_encode(['error' => 'Current password is required.']);
    exit();
}

if (strlen($newPassword) < 8) {
    http_response_code(400);
    echo json_encode(['error' => 'New password must be at least 8 characters.']);
    exit();
}

try {
    $db = get_db();

    $stmt = $db->prepare('SELECT password_hash FROM users WHERE id = ?');
    $stmt->execute([$user['id']]);
    $row = $stmt->fetch();

    if (!$row || !password_verify($currentPassword, $row['password_hash'])) {
        http_response_code(403);
        echo json_encode(['error' => 'Current password is incorrect.']);
        exit();
    }

    $hash = password_hash($newPassword, PASSWORD_BCRYPT, ['cost' => BCRYPT_COST]);
    $stmt = $db->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
    $stmt->execute([$hash, $user['id']]);

    echo json_encode(['success' => true, 'message' => 'Password updated successfully.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error.']);
}
