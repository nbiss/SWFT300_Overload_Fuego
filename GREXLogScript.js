const API_URL = "https://script.google.com/macros/s/AKfycbwCJ1ANPwd7VBd-GxKbDiHNzAa4imS9El1f3rw0ZM2fg1uX0Spv3L08SpwcQB31bR8/exec"

async function login() {
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please enter your email and password.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "login",
                email: email,
                password: password
            })
        });

        const responseText = await response.text();
        console.log("Server response:", responseText);

        const result = JSON.parse(responseText);

        if (!result.success) {
            alert(result.message);
            return;
        }

        localStorage.setItem("currentUserID", result.user.id);
        localStorage.setItem("currentRole", result.user.role);
        localStorage.setItem("currentUserEmail", result.user.email);

        window.location.href = "homePage.html";

    } catch (error) {
        console.error("Login error:", error);
        alert("Unable to connect to the login server.");
    }
}