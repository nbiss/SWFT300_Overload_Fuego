// script.js (frontend)
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role })
  });

  const result = await response.json();
  document.getElementById('message').innerText = result.message;

  if (result.success) {
    if (result.role === 'coach') {
      window.location.href = 'coach-dashboard.html';
    } else {
      window.location.href = 'athlete-dashboard.html';
    }
  }
});
