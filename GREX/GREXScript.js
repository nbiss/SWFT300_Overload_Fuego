// Navigation helper
function navigate(page) {
  window.location.href = page;
}

// Add Team button interaction
const addBox = document.querySelector('.add-box');
if (addBox) {
  addBox.addEventListener('click', () => {
    alert('Add Team functionality coming soon!');
  });
}

// Calendar auto-fill (for calendar.html)
const calendarGrid = document.querySelector('.calendar-grid');
if (calendarGrid) {
  const events = {
    6: ['Practice'],
    9: ['Game'],
    12: ['Exam'],
  };
  for (let day = 1; day <= 30; day++) {
    const box = document.createElement('div');
    box.innerHTML = `<strong>${day}</strong><br>${(events[day] || []).join('<br>')}`;
    calendarGrid.appendChild(box);
  }
}
