const sendEmail = (email) => {
    return new Promise((resolve) => {
        console.log("Sending verification email...");
        setTimeout(() => {
            resolve("Email sent successfully");
        }, 2000);
    });
};
async function register(name, email) {
    try {
        if (!name || !email) {
            throw new Error("name and email required");
        }
        console.log(await sendEmail(email));
        console.log("User registered successfully");
    } catch (error) {
        console.log(error.message);
    }
}
register("Mohamed", "mohamed@gmail.com");