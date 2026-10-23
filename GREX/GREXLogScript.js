async function login(){

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const response =
        await fetch("users.csv");

    const csv =
        await response.text();

    const lines =
        csv.split("\n");

    let found = false;

    for(let i=1;i<lines.length;i++){

        const columns =
            lines[i].split(",");

        if(columns.length < 6)
            continue;

        const userEmail =
            columns[3].trim();

        const userPassword =
            columns[4].trim();

        if(
            email === userEmail &&
            password === userPassword
        ){

            localStorage.setItem(
                "currentUserID",
                columns[0]
            );

            localStorage.setItem(
                "currentRole",
                columns[5].trim()
            );

            found = true;

            window.location.href =
                "athleteDashboard.html";
        }
    }

    if(!found){

        alert(
          "Account not found. Create an account."
        );

        window.location.href =
            "createAccount.html";
    }
}