// ===============================
// CONFIG
// ===============================
const API_KEY = "b6eb9c2e474d41e3bcc8550e873623de";
const BASE_URL = "https://api.rawg.io/api";

// Containers
const gamesContainer = document.getElementById("gamesContainer");
const searchInput = document.getElementById("searchInput");

// Popup
const gamePopup = document.getElementById("gamePopup");
const popupTitle = document.getElementById("popupTitle");
const popupDesc = document.getElementById("popupDesc");
const popupImg = document.getElementById("popupImg");
const popupTrailer = document.getElementById("popupTrailer");
const popupScreens = document.getElementById("popupScreens");
const popupDownload = document.getElementById("popupDownload");

// Hamburger
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");
const menuTheme = document.getElementById("menuTheme");
const themeLabel = document.getElementById("themeLabel");

// Bottom nav
document.getElementById("homeNav").onclick = () => window.location.href = "index.html";
document.getElementById("gamesNav").onclick = () => window.location.href = "games.html";
document.getElementById("tournamentsNav").onclick = () => window.location.href = "tournaments.html";
document.getElementById("chatNav").onclick = () => window.location.href = "chat.html";
document.getElementById("accountNav").onclick = () => window.location.href = "account.html";

// Hamburger toggle
menuBtn.addEventListener("click", () => sidebar.classList.add("open"));
closeSidebar.addEventListener("click", () => sidebar.classList.remove("open"));

// Dark/Light theme
menuTheme.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  themeLabel.innerText = document.body.classList.contains("light-theme") ? "Light" : "Dark";
});

// ===============================
// FETCH GAMES
// ===============================
async function fetchGames() {
  const res = await fetch(`${BASE_URL}/games?key=${API_KEY}&platforms=4,187&page_size=24`);
  const data = await res.json();
  renderGames(data.results);
}
fetchGames();

// ===============================
// RENDER GAME CARDS (square cards)
// ===============================
function renderGames(games) {
  gamesContainer.innerHTML = "";
  games.forEach(game => {
    const stars = "⭐".repeat(Math.round(game.rating));
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${game.background_image}" alt="${game.name}" />
      <div class="game-info">
        <div class="game-title">${game.name}</div>
        <div class="game-rating">${stars}</div>
        <div class="game-date">${game.released}</div>
      </div>
    `;
    card.onclick = () => openGame(game.id);
    gamesContainer.appendChild(card);
  });
}

// ===============================
// SEARCH FUNCTION
// ===============================
searchInput.addEventListener("input", async () => {
  const q = searchInput.value.trim();
  if(q.length < 2) return fetchGames();
  const res = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${q}`);
  const data = await res.json();
  renderGames(data.results);
});

// ===============================
// POPUP FUNCTION
// ===============================
async function openGame(id) {
  const res = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
  const game = await res.json();

  popupTitle.innerText = game.name;
  popupDesc.innerText = game.description_raw.substring(0, 150) + "...";
  popupImg.src = game.background_image;

  // Screenshots
  const shotRes = await fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
  const shots = await shotRes.json();
  popupScreens.innerHTML = "";
  shots.results.slice(0, 6).forEach(pic => {
    popupScreens.innerHTML += `<img src="${pic.image}" class="screen">`;
  });

  // Trailer
  const trailerRes = await fetch(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`);
  const trailerData = await trailerRes.json();
  const trailer = trailerData.results[0]?.data?.max || "";
  popupTrailer.innerHTML = trailer
    ? `<video controls width="100%"><source src="${trailer}" type="video/mp4"></video>`
    : "No trailer available";

  popupDownload.onclick = () => window.open(game.website || "#", "_blank");
  gamePopup.style.display = "flex";
}

// Close popup by X or clicking outside
gamePopup.addEventListener("click", (e) => {
  if (e.target === gamePopup || e.target.classList.contains("close")) closeGame();
});
function closeGame() {
  gamePopup.style.display = "none";
}
