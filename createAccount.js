const API_URL =
    "https://script.google.com/macros/s/AKfycby4lOpF22NI3CdFyE3diI7G1F9yDKYyLxXfofeFctHR2c4HeYrZpYA36R1VMyAQoa8k/exec";

document
    .getElementById("createAccountForm")
    .addEventListener("submit", createAccount);

async function createAccount(event) {
    event.preventDefault();

    const firstName = document
        .getElementById("firstName")
        .value
        .trim();

    const lastName = document
        .getElementById("lastName")
        .value
        .trim();

    const email = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    const password = document
        .getElementById("password")
        .value;

    const role = document
        .getElementById("role")
        .value;

    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        password === "" ||
        role === ""
    ) {
        alert("Please complete all fields.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "createAccount",
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                role: role
            })
        });

        const responseText = await response.text();

        console.log("Server response:", responseText);

        const result = JSON.parse(responseText);

        if (!result.success) {
            alert(result.message);
            return;
        }

        alert("Account created successfully!");

        window.location.href = "index.html";

    } catch (error) {
        console.error("Create account error:", error);
        alert("Unable to connect to the server.");
    }
}