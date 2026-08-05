function sendMessage(message) {
    console.log("Sending...");

    setTimeout(() => {
        console.log("Message sent:", message);
    }, 2000);
}

sendMessage("Hello Mohamed!");