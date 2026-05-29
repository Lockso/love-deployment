<?php

header('Content-Type: application/json');
mb_internal_encoding('UTF-8');

$to = "youremail@domain.com";

$date = $_POST["date"] ?? "";
$time = $_POST["time"] ?? "";
$food = $_POST["food"] ?? "";

$subject = "Nuovo appuntamento";

$message = "
Nuovo appuntamento!

Data: $date
Ora: $time
Scelta: $food
";

$headers = "From: fromemail@domain.com\r\n";

$sent = mail(
    $to,
    $subject,
    $message,
    $headers
);

echo json_encode([
    "success" => $sent
]);

?>