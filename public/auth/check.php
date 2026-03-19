<?php
require_once __DIR__ . '/config.php';

handle_preflight();
cors_headers();

$user = get_authenticated_user();

if (!$user) {
    http_response_code(401);
    echo json_encode(['authenticated' => false]);
    exit();
}

echo json_encode([
    'authenticated' => true,
    'user' => [
        'id' => (int)$user['id'],
        'email' => $user['email'],
        'name' => $user['name'],
        'role' => $user['role'],
    ],
]);
