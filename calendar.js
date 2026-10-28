const EVENTS_KEY = "grexCalendarEvents";
const TEAMS_KEY = "grexTeams";

const currentUserID =
    localStorage.getItem("currentUserID");

const currentRole =
    localStorage.getItem("currentRole");

let teams = [];
let events = [];

document.addEventListener("DOMContentLoaded", startCalendar);

async function startCalendar() {
    if (!currentUserID || !currentRole) {
        alert("Please log in first.");
        window.location.href = "GREXLogin.html";
        return;
    }

    document.getElementById("userInfo").textContent =
        "User ID: " + currentUserID +
        " | Role: " + currentRole;

    events = getEvents();

    teams = await loadTeams();

    setupRoleAccess();
    displayEvents();
}

function getEvents() {
    return JSON.parse(
        localStorage.getItem(EVENTS_KEY) || "[]"
    );
}

function saveEvents() {
    localStorage.setItem(
        EVENTS_KEY,
        JSON.stringify(events)
    );
}

async function loadTeams() {
    const savedTeams =
        localStorage.getItem(TEAMS_KEY);

    if (savedTeams) {
        return JSON.parse(savedTeams);
    }

    try {
        const response =
            await fetch("teams.csv");

        const csv =
            await response.text();

        const lines =
            csv.trim().split(/\r?\n/);

        const loadedTeams = [];

        for (let i = 1; i < lines.length; i++) {
            const columns =
                lines[i].split(",");

            if (columns.length < 4) {
                continue;
            }

            loadedTeams.push({
                teamID: columns[0].trim(),
                teamName: columns[1].trim(),
                coachID: columns[2].trim(),
                athleteID: columns[3].trim()
            });
        }

        localStorage.setItem(
            TEAMS_KEY,
            JSON.stringify(loadedTeams)
        );

        return loadedTeams;

    } catch (error) {
        console.log("Could not load teams.csv");
        return [];
    }
}

function setupRoleAccess() {
    const teamSelect =
        document.getElementById("teamSelect");

    if (currentRole.toLowerCase() === "coach") {
        const coachTeams = teams.filter(team =>
            team.coachID === currentUserID
        );

        coachTeams.forEach(team => {
            const option =
                document.createElement("option");

            option.value = team.teamID;
            option.textContent =
                team.teamName;

            teamSelect.appendChild(option);
        });

        document
            .getElementById("eventForm")
            .addEventListener("submit", createCoachEvent);

    } else {
        // Athletes create personal calendar events.
        teamSelect.style.display = "none";

        document
            .getElementById("eventForm")
            .addEventListener("submit", createAthleteEvent);
    }
}

function createCoachEvent(event) {
    event.preventDefault();

    const selectedTeam =
        document.getElementById("teamSelect").value;

    if (!selectedTeam) {
        alert("Please select a team.");
        return;
    }

    createEvent(selectedTeam);
}

function createAthleteEvent(event) {
    event.preventDefault();

    // Empty teamID means this is an athlete's personal event.
    createEvent("");
}

function createEvent(teamID) {
    const eventTitle =
        document.getElementById("eventTitle").value.trim();

    const eventDate =
        document.getElementById("eventDate").value;

    const eventTime =
        document.getElementById("eventTime").value;

    const eventLocation =
        document.getElementById("eventLocation").value.trim();

    const eventDescription =
        document.getElementById("eventDescription").value.trim();

    const highestEventID = events.reduce(
        (highest, currentEvent) =>
            Math.max(highest, Number(currentEvent.eventID) || 0),
        0
    );

    const newEvent = {
        eventID: highestEventID + 1,
        title: eventTitle,
        date: eventDate,
        time: eventTime,
        location: eventLocation,
        description: eventDescription,
        teamID: teamID,
        createdByID: currentUserID,
        createdByRole: currentRole
    };

    events.push(newEvent);

    saveEvents();
    downloadCalendarCSV();

    document.getElementById("eventForm").reset();

    displayEvents();

    alert("Event created successfully.");
}

function displayEvents() {
    const container =
        document.getElementById("eventsContainer");

    container.innerHTML = "";

    const visibleEvents =
        events.filter(event => canViewEvent(event));

    visibleEvents.sort((first, second) => {
        return (
            first.date + first.time
        ).localeCompare(
            second.date + second.time
        );
    });

    if (visibleEvents.length === 0) {
        container.innerHTML =
            "<p>No events are available.</p>";

        return;
    }

    visibleEvents.forEach(event => {
        const card =
            document.createElement("div");

        card.className = "event-card";

        const team =
            teams.find(team =>
                team.teamID === event.teamID
            );

        const teamName =
            team ? team.teamName : "Personal event";

        card.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Team:</strong> ${teamName}</p>
            <p>${event.description}</p>
            <p><strong>Created by ID:</strong> ${event.createdByID}</p>
        `;

        if (
            currentRole.toLowerCase() === "coach" ||
            event.createdByID === currentUserID
        ) {
            const deleteButton =
                document.createElement("button");

            deleteButton.textContent =
                "Delete Event";

            deleteButton.className =
                "delete-button";

            deleteButton.onclick = function () {
                deleteEvent(event.eventID);
            };

            card.appendChild(deleteButton);
        }

        container.appendChild(card);
    });
}

function canViewEvent(event) {
    if (currentRole.toLowerCase() === "coach") {
        return true;
    }

    if (event.createdByID === currentUserID) {
        return true;
    }

    const athleteBelongsToTeam =
        teams.some(team =>
            team.teamID === event.teamID &&
            team.athleteID === currentUserID
        );

    return athleteBelongsToTeam;
}

function deleteEvent(eventID) {
    events = events.filter(event =>
        event.eventID !== eventID
    );

    saveEvents();
    downloadCalendarCSV();
    displayEvents();
}

function downloadCalendarCSV() {
    const header =
        "EventID,Title,Date,Time,Location,Description,TeamID,CreatedByID,CreatedByRole";

    const rows = events.map(event => {
        return [
            event.eventID,
            event.title,
            event.date,
            event.time,
            event.location,
            event.description,
            event.teamID,
            event.createdByID,
            event.createdByRole
        ].map(value => `"${value}"`).join(",");
    });

    const csv =
        [header, ...rows].join("\n");

    const file =
        new Blob([csv], { type: "text/csv" });

    const url =
        URL.createObjectURL(file);

    const link =
        document.createElement("a");

    link.href = url;
    link.download = "calendar.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}