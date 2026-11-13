const API_URL =
"https://script.google.com/macros/s/AKfycbzTdaEhme-9LjTrOeFGeeNQ0mPDNYwNA3rLMTr9RspmLrJR_8xNlTwQzsmq0Rh5fvxK/exec";

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
        console.error(error);
        alert("Unable to connect to the account server.");
    }
}

document
    .getElementById("createAccountForm")
    .addEventListener("submit", createAccount);