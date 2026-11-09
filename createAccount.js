const API_URL =
    "https://script.google.com/macros/s/AKfycbwnrDbFBlwllLcjsHaK1xGiumRjdt-25qbZhyc8MiCiU8_5l5YAYmngiWQYtlZfRE2e/exec"";

async function createAccount() {
    const user = {
        firstName: document
            .getElementById("firstName")
            .value
            .trim(),

        lastName: document
            .getElementById("lastName")
            .value
            .trim(),

        email: document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase(),

        password: document
            .getElementById("password")
            .value,

        role: document
            .getElementById("role")
            .value
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

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "createAccount",
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                role: user.role
            })
        });

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return;
        }

        alert("Account created. You can now log in.");
        window.location.href = "index.html";

    } catch (error) {
        console.error("Account creation error:", error);
        alert("Unable to connect to the account server.");
    }
}