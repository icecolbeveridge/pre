document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const responseMessage = document.getElementById("responseMessage");

    // Capture the time when the page loads
    const pageLoadTime = Date.now();

    form.addEventListener("submit", function(event) {
        const currentTime = Date.now();
        const timeElapsed = currentTime - pageLoadTime; // Time in milliseconds

        // Check if less than 5 seconds (5000 milliseconds) have passed
        if (timeElapsed < 5000) {
            event.preventDefault(); // Prevent form submission
            responseMessage.innerHTML = "<p>Please take your time before submitting the form.</p>";
            return; // Exit the function
        }

        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this); // Gather form data

        fetch("send_email.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            responseMessage.innerHTML = data; // Display success or failure message
            form.reset(); // Reset the form
        })
        .catch(error => {
            responseMessage.innerHTML = "There was an error sending your message.";
        });
    });
});

