const USERS_KEY = "grexUsers";

function getSavedUsers() {
    return JSON.parse(
        localStorage.getItem(USERS_KEY) || "[]"
    );
}

function saveCurrentUser(user) {
    localStorage.setItem(
        "currentUserID",
        user.id
    );

    localStorage.setItem(
        "currentRole",
        user.role
    );

    localStorage.setItem(
        "currentUserEmail",
        user.email
    );
}

async function login() {
    const email =
        document.getElementById("email").value.trim().toLowerCase();

    const password =
        document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please enter your email and password.");
        return;
    }

    const users = getSavedUsers();

    const user = users.find(currentUser =>
        currentUser.email.toLowerCase() === email &&
        currentUser.password === password
    );

    if (!user) {
        alert(
            "Account not found or password is incorrect. "
            + "Please create an account."
        );

        window.location.href =
            "createAccount.html";

        return;
    }

    saveCurrentUser(user);

    if (user.role.toLowerCase() === "coach") {
        window.location.href = "GREXDash.html";
    } else {
        window.location.href = "GREXDash.html";
    }
}