// scripts.js
document.addEventListener('DOMContentLoaded', getCurrentImageOfTheDay);

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  getImageOfTheDay(currentDate);
}

function getImageOfTheDay(date) {
  const apiKey = 'U9UtfBF7trtpuNe67KajMmeUr7cv99VFc5AJeRfB'; // Replace with your API key
  const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayImage(data);
      saveSearch(date);
      addSearchToHistory();
    })
    .catch(error => console.error('Error fetching data:', error));
}

// function displayImage(data) {
//   const imageContainer = document.getElementById('current-image-container');
//   imageContainer.innerHTML = `<img src="${data.url}" alt="${data.title}"><p>${data.title}</p>`;
// }
function displayImage(data) {
    const imageContainer = document.getElementById('current-image-container');
    imageContainer.innerHTML = `
      <img src="${data.url}" alt="${data.title}">
      <h2>${data.title}</h2>
      <p>${data.date}</p>
      <p>${data.explanation}</p>
    `;
  }
  
function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem('searches')) || [];
  searches.push(date);
  localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory() {
  const searchHistory = document.getElementById('search-history');
  const searches = JSON.parse(localStorage.getItem('searches')) || [];

  searchHistory.innerHTML = '';
  searches.forEach(search => {
    const listItem = document.createElement('li');
    listItem.textContent = search;
    listItem.addEventListener('click', () => getImageOfTheDay(search));
    searchHistory.appendChild(listItem);
  });
}

document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const selectedDate = document.getElementById('search-input').value;
  getImageOfTheDay(selectedDate);
});
