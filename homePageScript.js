window.addEventListener('DOMContentLoaded', ()=>{
    let teamNameArray = ["Lax", "baseball", "soccer"];
    inializeTeams(teamNameArray);
})


//initalize team boxes
function inializeTeams(teamNameArray){
    const contentBox = document.getElementById('pageContent');
    for (let i = 0; i < teamNameArray.length; i++) {
        const cell = document.createElement("div");
        cell.dataset.index = i;
        cell.classList.add("teamBox");
        cell.textContent = teamNameArray[i];

        contentBox.appendChild(cell);

    }
}