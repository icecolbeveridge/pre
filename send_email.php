<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    if (!empty($_POST['user_postcode'])) {
	echo "If you get this message, you know exactly what you did.";
	exit;
    }


    $to = "colin@flyingcoloursmaths.co.uk"; // Your email address
    $subject = "Contact Form Submission from $name";
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "<p>Email sent successfully!</p>";
    } else {
        echo "<p>There was a problem sending the email.</p>";
    }
} else {
    echo "<p>Invalid request.</p>";
}
?>
