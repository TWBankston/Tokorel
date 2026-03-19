<?php
require_once __DIR__ . '/../config.php';

handle_preflight();
cors_headers();

$user = get_authenticated_user();

if (!$user || $user['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Access denied.']);
    exit();
}

try {
    $db = get_db();

    $action = $_GET['action'] ?? 'list';

    if ($action === 'list') {
        $stmt = $db->query(
            'SELECT id, email, name, role, created_at, last_login FROM users ORDER BY created_at DESC'
        );
        echo json_encode(['users' => $stmt->fetchAll()]);
    } elseif ($action === 'delete' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = get_json_input();
        $targetId = (int)($input['user_id'] ?? 0);

        if ($targetId === (int)$user['id']) {
            http_response_code(400);
            echo json_encode(['error' => 'Cannot delete your own account.']);
            exit();
        }

        $stmt = $db->prepare('DELETE FROM users WHERE id = ?');
        $stmt->execute([$targetId]);
        echo json_encode(['success' => true]);
    } elseif ($action === 'reset-password' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = get_json_input();
        $targetId = (int)($input['user_id'] ?? 0);
        $newPassword = $input['new_password'] ?? '';

        if (strlen($newPassword) < 8) {
            http_response_code(400);
            echo json_encode(['error' => 'Password must be at least 8 characters.']);
            exit();
        }

        $hash = password_hash($newPassword, PASSWORD_BCRYPT, ['cost' => BCRYPT_COST]);
        $stmt = $db->prepare('UPDATE users SET password_hash = ? WHERE id = ?');
        $stmt->execute([$hash, $targetId]);

        $db->prepare('DELETE FROM sessions WHERE user_id = ?')->execute([$targetId]);

        echo json_encode(['success' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action.']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error.']);
}
