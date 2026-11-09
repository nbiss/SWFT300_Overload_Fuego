const API_URL =
"https://script.google.com/macros/s/AKfycbwpffMmN5de9m7p0zPs6U5yPFOUPw70IzD_kLOAqMxa2rMgLs5g_3RXe6eTylMeraxl/exec";

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
                action: "login",
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (!result.success) {
            alert(result.message);
            return;
        }

        localStorage.setItem(
            "currentUserID",
            result.user.id
        );

        localStorage.setItem(
            "currentRole",
            result.user.role
        );

        localStorage.setItem(
            "currentUserEmail",
            result.user.email
        );

        window.location.href = "homePage.html";

    } catch (error) {
        console.error(error);
        alert("Unable to connect to the login server.");
    }
}