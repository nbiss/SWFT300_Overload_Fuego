const API_URL =
    "https://script.google.com/macros/s/AKfycbwnrDbFBlwllLcjsHaK1xGiumRjdt-25qbZhyc8MiCiU8_5l5YAYmngiWQYtlZfRE2e/exec";

function saveCurrentUser(user) {
    localStorage.setItem("currentUserID", user.id || user.email);
    localStorage.setItem("currentRole", user.role || "user");
    localStorage.setItem("currentUserEmail", user.email);
}

async function login() {
    const email = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    const password = document
        .getElementById("password")
        .value;

    if (email === "" || password === "") {
        alert("Please enter your email and password.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            window.location.href = "createAccount.html";
            return;
        }

        saveCurrentUser(result.user);

        window.location.href = "homePage.html";

    } catch (error) {
        console.error("Login error:", error);
        alert("Unable to connect to the login server.");
    }
}