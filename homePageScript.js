const API_URL = "https://script.google.com/macros/s/AKfycby4lOpF22NI3CdFyE3diI7G1F9yDKYyLxXfofeFctHR2c4HeYrZpYA36R1VMyAQoa8k/exec";

document.addEventListener("DOMContentLoaded", function () {
    loadTeams();
});


async function sendTeamRequest(data) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}


async function loadTeams() {
    const pageContent = document.getElementById("pageContent");
    const userEmail = localStorage.getItem("currentUserEmail");

    pageContent.innerHTML = "";

    if (!userEmail) {
        pageContent.innerHTML =
            "<p>Unable to find the current user's email.</p>";
        return;
    }

    try {
        const result = await sendTeamRequest({
            action: "getDashboard",
            userEmail: userEmail
        });

        if (!result.success) {
            pageContent.innerHTML = `<p>${result.message}</p>`;
            return;
        }

        displayTeams(result.role, result.teams);

    } catch (error) {
        console.error("Error loading teams:", error);

        pageContent.innerHTML =
            "<p>There was an error loading the teams.</p>";
    }
}


function displayTeams(role, teams) {
    const pageContent = document.getElementById("pageContent");

    pageContent.innerHTML = "";

    const normalizedRole = String(role).toLowerCase();

    if (normalizedRole === "coach") {
        createCoachControls();
    }

    if (teams.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No teams have been assigned yet.";
        pageContent.appendChild(message);
        return;
    }

    teams.forEach(function (team) {
        const teamContainer = document.createElement("div");
        teamContainer.classList.add("teamContainer");

        const teamTitle = document.createElement("h2");
        teamTitle.textContent = team.teamName;

        teamContainer.appendChild(teamTitle);

        const athleteTitle = document.createElement("h3");
        athleteTitle.textContent = "Athletes";

        teamContainer.appendChild(athleteTitle);

        const athleteList = document.createElement("ul");

        if (team.athletes.length === 0) {
            const emptyMessage = document.createElement("li");
            emptyMessage.textContent = "No athletes assigned.";
            athleteList.appendChild(emptyMessage);
        } else {
            team.athletes.forEach(function (athlete) {
                const athleteItem = document.createElement("li");

                athleteItem.textContent =
                    athlete.name + " - " + athlete.email;

                athleteList.appendChild(athleteItem);
            });
        }

        teamContainer.appendChild(athleteList);

        if (normalizedRole === "coach") {
            const addAthleteButton = document.createElement("button");

            addAthleteButton.textContent = "Add Athlete";
            addAthleteButton.classList.add("actionButton");

            addAthleteButton.addEventListener("click", function () {
                addAthlete(team.teamID);
            });

            teamContainer.appendChild(addAthleteButton);
        }

        pageContent.appendChild(teamContainer);
    });
}


function createCoachControls() {
    const pageContent = document.getElementById("pageContent");

    const controls = document.createElement("div");
    controls.classList.add("coachControls");

    const createTeamButton = document.createElement("button");

    createTeamButton.textContent = "Create Team";
    createTeamButton.classList.add("actionButton");

    createTeamButton.addEventListener("click", createTeam);

    controls.appendChild(createTeamButton);
    pageContent.appendChild(controls);
}


async function createTeam() {
    const teamName = prompt("Enter the team name:");

    if (!teamName || teamName.trim() === "") {
        return;
    }

    const userEmail = localStorage.getItem("currentUserEmail");

    try {
        const result = await sendTeamRequest({
            action: "createTeam",
            userEmail: userEmail,
            teamName: teamName.trim()
        });

        if (!result.success) {
            alert(result.message);
            return;
        }

        alert("Team created successfully.");
        loadTeams();

    } catch (error) {
        console.error("Error creating team:", error);
        alert("There was an error creating the team.");
    }
}


async function addAthlete(teamID) {
    const athleteEmail = prompt("Enter the athlete's email:");

    if (!athleteEmail || athleteEmail.trim() === "") {
        return;
    }

    const userEmail = localStorage.getItem("currentUserEmail");

    try {
        const result = await sendTeamRequest({
            action: "addAthlete",
            userEmail: userEmail,
            teamID: teamID,
            athleteEmail: athleteEmail.trim().toLowerCase()
        });

        if (!result.success) {
            alert(result.message);
            return;
        }

        alert("Athlete added successfully.");
        loadTeams();

    } catch (error) {
        console.error("Error adding athlete:", error);
        alert("There was an error adding the athlete.");
    }
}