<?php
session_start();

$client_id = '6af8d08dc8214a1a9970327659dcb156';
$redirect_uri = 'https://se-dev.cse.buffalo.edu/CSE442/2024-Fall/nafismor/CompleteHomepage/php/callback.php';
$scope = implode(' ', [
    'user-read-private', 'user-read-email', 'user-library-read', 'user-top-read',
    'playlist-read-private', 'user-read-recently-played'
]);

// Redirect to Spotify authorization page
header("Location: https://accounts.spotify.com/authorize?response_type=code&client_id=$client_id&redirect_uri=" . urlencode($redirect_uri) . "&scope=$scope");
exit();
