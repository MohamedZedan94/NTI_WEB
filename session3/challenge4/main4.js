function login(username, callback) {
    console.log("Logging in...");

    setTimeout(() => {
        console.log("Login Successful");
        callback(username);
    }, 2000);
}

function goToHome(username) {
    console.log("Welcome " + username);
    console.log("Opening Home Page...");
}

login("Mohamed", goToHome);