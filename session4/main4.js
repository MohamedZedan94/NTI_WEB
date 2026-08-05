const fetchUser = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const { name, email } = await response.json();

        console.log(`User Name: ${name}`);
        console.log(`User Email: ${email}`);
    } catch {
        console.log("Error");
    }
};

fetchUser(1);
fetchUser(5);