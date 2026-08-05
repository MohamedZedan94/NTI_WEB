function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

function sayWelcome() {
    console.log("Welcome!");
}

greet("Mohamed", sayWelcome);