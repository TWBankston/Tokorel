<?php
require_once __DIR__ . '/config.php';

handle_preflight();
cors_headers();
require_post();

$token = $_COOKIE['tokorel_session'] ?? null;

if ($token) {
    try {
        $db = get_db();
        $stmt = $db->prepare('DELETE FROM sessions WHERE token = ?');
        $stmt->execute([$token]);
    } catch (PDOException $e) {
        // Silently fail — cookie will be cleared anyway
    }
}

clear_session_cookie();

echo json_encode(['success' => true]);
