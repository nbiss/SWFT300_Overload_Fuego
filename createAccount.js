const USERS_KEY = "grexUsers";

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function convertToCSVValue(value) {
    return `"${String(value).replaceAll('"', '""')}"`;
}

function downloadUsersCSV(users) {
    const header =
        "ID,FirstName,LastName,Email,Password,Role";

    const rows = users.map(user => {
        return [
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            user.password,
            user.role
        ]
        .map(convertToCSVValue)
        .join(",");
    });

    const csv = [header, ...rows].join("\n");

    const file = new Blob([csv], {
        type: "text/csv"
    });

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = "users.csv";
    link.click();

    URL.revokeObjectURL(url);
}

function createAccount() {
    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("email").value.trim().toLowerCase();

    const password =
        document.getElementById("password").value;

    const role =
        document.getElementById("role").value;

    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        password === "" ||
        role === ""
    ) {
        alert("Please complete every field.");
        return;
    }

    const users = getUsers();

    const existingUser = users.find(user =>
        user.email.toLowerCase() === email
    );

    if (existingUser) {
        alert("An account with this email already exists.");
        return;
    }

    let highestID = 0;

    users.forEach(user => {
        const userID = Number(user.id);

        if (userID > highestID) {
            highestID = userID;
        }
    });

    const newUser = {
        id: highestID + 1,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role
    };

    users.push(newUser);

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

    downloadUsersCSV(users);

    alert(
        "Account created successfully. Your ID is "
        + newUser.id
    );

    window.location.href = "GREXLogin.html";
}