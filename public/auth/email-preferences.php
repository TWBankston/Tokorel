<?php
require_once __DIR__ . '/config.php';

handle_preflight();
cors_headers();

$user = get_authenticated_user();

if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated.']);
    exit();
}

$action = $_GET['action'] ?? 'status';

if ($action === 'status') {
    $contact = find_reach_contact($user['email']);
    echo json_encode([
        'subscribed' => $contact !== null,
        'email' => $user['email'],
    ]);
} elseif ($action === 'unsubscribe' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $contact = find_reach_contact($user['email']);

    if (!$contact) {
        echo json_encode(['success' => true, 'message' => 'You are not currently subscribed to emails.']);
        exit();
    }

    $uuid = $contact['uuid'] ?? null;
    if (!$uuid) {
        http_response_code(500);
        echo json_encode(['error' => 'Could not identify subscription record.']);
        exit();
    }

    $deleted = delete_reach_contact($uuid);
    if ($deleted) {
        echo json_encode(['success' => true, 'message' => 'You have been unsubscribed from all emails.']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to unsubscribe. Please try again or contact support.']);
    }
} elseif ($action === 'resubscribe' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $existing = find_reach_contact($user['email']);
    if ($existing) {
        echo json_encode(['success' => true, 'message' => 'You are already subscribed.']);
        exit();
    }

    fire_reach_api($user['name'], $user['email']);
    echo json_encode(['success' => true, 'message' => 'You have been re-subscribed to emails.']);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid action.']);
}

function find_reach_contact(string $email): ?array {
    $page = 1;
    $maxPages = 10;

    while ($page <= $maxPages) {
        $url = REACH_API_URL . '?page=' . $page;
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . REACH_API_KEY,
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode < 200 || $httpCode >= 300) {
            return null;
        }

        $data = json_decode($response, true);
        $contacts = $data['data'] ?? [];

        if (empty($contacts)) {
            return null;
        }

        foreach ($contacts as $contact) {
            if (isset($contact['email']) && strtolower($contact['email']) === strtolower($email)) {
                return $contact;
            }
        }

        $lastPage = $data['meta']['last_page'] ?? $data['last_page'] ?? $page;
        if ($page >= $lastPage) {
            return null;
        }

        $page++;
    }

    return null;
}

function delete_reach_contact(string $uuid): bool {
    $url = REACH_API_URL . '/' . $uuid;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . REACH_API_KEY,
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);

    curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return $httpCode >= 200 && $httpCode < 300;
}
