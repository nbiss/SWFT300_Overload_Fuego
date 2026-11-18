const API_URL = "https://script.google.com/macros/s/AKfycbzKrs9yNy5cUizl6QPXh-01MP_NH-T7gdDBIHyTNu_ZzjWrQNyeTzsnuQVzkHaIJQXI/exec"

async function createAccount() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const role = document.getElementsByID("role").value;

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
        window.location.href = "createAccount.html";

    } catch (error) {
        console.error("Create account error:", error);
        alert("Unable to connect to the server.");
    }
}