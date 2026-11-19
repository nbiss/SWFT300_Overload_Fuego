window.addEventListener('DOMContentLoaded', ()=>{
    let teamNameMap = {"lax":"lax Link", "baseball":"base Link","soccer":"soc link"};
    inializeTeams(teamNameMap);
    initButtons();
    
})


//initalize team boxes for homepage
function inializeTeams(teamNameMap){
    const contentBox = document.getElementById('pageContent');
    const keys = Object.keys(teamNameMap);
    for (let i = 0; i < keys.length; i++) {
        const cell = document.createElement('a');
        cell.textContent = keys[i]
        cell.dataset.index = i;
        cell.classList.add("teamBox");

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
    
    const addTeamsbtn = document.getElementById("addTeam");
    const settingsBtn = document.getElementById("settings");

    addTeamsbtn.addEventListener("click", ()=>{
        alert("add teams")
    });


    settingsBtn.addEventListener("click" , ()=>{
    alert("settings")
    });


}
