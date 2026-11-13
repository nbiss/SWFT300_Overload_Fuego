const API_URL = "https://script.google.com/macros/s/AKfycbwUiTGXsoM3A18KdBCQtQwRpbdGsnaUDv9BGoALM9Gfxv1-46fsuxQOggvZmomFdZpC/exec";

async function createAccount(event) {
    event.preventDefault();

    const account = {
        action: "createAccount",
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim().toLowerCase(),
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    if (
        account.firstName === "" ||
        account.lastName === "" ||
        account.email === "" ||
        account.password === "" ||
        account.role === ""
    ) {
        alert("Please complete every field.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(account)
        });

        const responseText = await response.text();
        console.log("Server response:", responseText);

        const result = JSON.parse(responseText);

        if (!result.success) {
            alert(result.message);
            return;
        }

        alert("Account created successfully.");
        window.location.href = "index.html";

    } catch (error) {
        console.error("FULL ERROR:", error);
        console.error("ERROR MESSAGE:", error.message);

        alert(
            "Connection error:\n\n" +
            error.message +
            "\n\nOpen the browser console for details."
        );
    }
}

document
    .getElementById("createAccountForm")
    .addEventListener("submit", createAccount);