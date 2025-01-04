const body = document.body;
const modeToggle = document.querySelector('.toggle-mode');
const savedMode = localStorage.getItem('theme');
if (savedMode) body.classList.add(savedMode);

modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  body.classList.toggle('light');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

const fetchDataButton = document.getElementById('fetchData');
const usernameInput = document.getElementById('username');
const cardsContainer = document.getElementById('cardsContainer');
const errorDiv = document.getElementById('error');
const clearDataButton = document.getElementById('clearData');

async function fetchUserData(username) {
  try {
    const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const data = await response.json();
    displayUserData(data);
    errorDiv.textContent = '';
  } catch (error) {
    errorDiv.textContent = error.message;
  }
}

function displayUserData(user) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h3>${user.username}</h3>
    <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
    <p><strong>Clan:</strong> ${user.clan || 'N/A'}</p>
    <p><strong>Rank:</strong> ${user.ranks.overall.name}</p>
    <p><strong>Languages:</strong> ${Object.keys(user.ranks.languages).join(', ')}</p>
    <p><strong>Honor:</strong> ${user.honor}</p>
  `;
  cardsContainer.appendChild(card);
}

fetchDataButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username) {
    fetchUserData(username);
  } else {
    errorDiv.textContent = 'Please enter a username';
  }
});

clearDataButton.addEventListener('click', () => {
  cardsContainer.innerHTML = '';
  errorDiv.textContent = '';
});