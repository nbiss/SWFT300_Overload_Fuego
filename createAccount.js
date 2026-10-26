function createAccount(){

    const user = {

        firstName:
        document.getElementById(
            "firstName"
        ).value,

        lastName:
        document.getElementById(
            "lastName"
        ).value,

        email:
        document.getElementById(
            "email"
        ).value,

        password:
        document.getElementById(
            "password"
        ).value,

        role:
        document.getElementById(
            "role"
        ).value
    };

    localStorage.setItem(
        user.email,
        JSON.stringify(user)
    );

    alert(
        "Account Created!"
    );

    window.location.href =
        "index.html";
}