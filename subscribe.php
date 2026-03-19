<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';

if (empty($name)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name is required.']);
    exit();
}

if (empty($email) || strpos($email, '@') === false) {
    http_response_code(400);
    echo json_encode(['error' => 'A valid email is required.']);
    exit();
}

$apiKey = 'ZRLsrFSIMesxrkK5fRNZGpRVDo5uAOsjjzrPt76Df5b9909d';
$reachUrl = 'https://api.hostinger.com/api/reach/v1/contacts';

$ch = curl_init($reachUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey,
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'name' => $name,
    'email' => $email,
]));
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true, 'redirectUrl' => '/download']);
} else {
    echo json_encode(['success' => true, 'redirectUrl' => '/download']);
}
