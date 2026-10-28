const USERS_KEY = "grexUsers";

function getUsers() {
    try {
        return JSON.parse(
            localStorage.getItem(USERS_KEY) || "[]"
        );
    } catch (error) {
        localStorage.removeItem(USERS_KEY);
        return [];
    }
}

function createAccount() {
    const user = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim().toLowerCase(),
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    if (
        user.firstName === "" ||
        user.lastName === "" ||
        user.email === "" ||
        user.password === "" ||
        user.role === ""
    ) {
        alert("Please complete every field.");
        return;
    }

    const users = getUsers();

    const duplicate = users.find(existingUser =>
        existingUser.email === user.email
    );

    if (duplicate) {
        alert("This email already has an account.");
        return;
    }

    user.id = users.length + 1;
    users.push(user);

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

    alert("Account created. Your ID is " + user.id);

    window.location.href = "index.html";
}