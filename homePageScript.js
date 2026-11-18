window.addEventListener('DOMContentLoaded', ()=>{
    let teamNameArray = ["Lax", "baseball", "soccer"];
    inializeTeams(teamNameArray);
    initButtons();
    
})


//initalize team boxes for homepage
function inializeTeams(teamNameArray){
    const contentBox = document.getElementById('pageContent');
    for (let i = 0; i < teamNameArray.length; i++) {
        const cell = document.createElement("div");
        cell.dataset.index = i;
        cell.classList.add("teamBox");
        cell.textContent = teamNameArray[i];

        contentBox.appendChild(cell);

    }
    const but = createAddTeamButton();
    contentBox.appendChild(but)
}

function createAddTeamButton(){
    const but = document.createElement("button");
    but.id = "addTeam";
    but.classList.add("teamBox");
    but.dataset.index = 5;
    but.style.backgroundImage = "url(pictures/cross_transparent.png)";
    but.style.backgroundSize = "80%";
    but.style.backgroundPosition = "center";
    but.style.cursor = "pointer";
    return but;
}


// button advent listeners //
function initButtons(){
    
    const dashBoardBtn = document.getElementById("dashBoard");
    const calendarBtn = document.getElementById("calendar");
    const inboxBtn = document.getElementById("inbox");
    const teamsBtn = document.getElementById("teams");
    const addTeamsbtn = document.getElementById("addTeam");
    const settingsBtn = document.getElementById("settings");
    const homeBtn = document.getElementById("homePage");

    addTeamsbtn.addEventListener("click", ()=>{
        alert("add teams")
    });

    dashBoardBtn.addEventListener("click" , ()=>{
    alert("dashboard")
    });

    calendarBtn.addEventListener("click" , ()=>{
    alert("calendar")
    });

    inboxBtn.addEventListener("click" , ()=>{
    alert("inbox")
    });

    teamsBtn.addEventListener("click" , ()=>{
    alert("teams")
    });

    settingsBtn.addEventListener("click" , ()=>{
    alert("settings")
    });

    homeBtn.addEventListener("click" , ()=>{
    alert("home")
    });


}
