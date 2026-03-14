const API_KEY = "b6eb9c2e474d41e3bcc8550e873623de";
const BASE_URL = "https://api.rawg.io/api";

const gamesContainer = document.getElementById("gamesContainer");
const slides = document.getElementById("slides");
const dots = document.getElementById("dots");
const searchInput = document.getElementById("searchInput");

let currentSlide = 0;
let sliderGames = [];

/* ===============================
   FETCH PLATFORMS
================================ */

async function getPlatforms(){

const res = await fetch(`${BASE_URL}/platforms?key=${API_KEY}`);
const data = await res.json();

console.log("Platforms:",data.results);

}

getPlatforms();


/* ===============================
   FETCH GAMES
================================ */

async function fetchGames(){

const res = await fetch(
`${BASE_URL}/games?key=${API_KEY}&platforms=4,187&page_size=24`
);

const data = await res.json();

renderGames(data.results);
createSlider(data.results.slice(0,5));

}

fetchGames();


/* ===============================
   RENDER GAME CARDS
================================ */

function renderGames(games){

gamesContainer.innerHTML="";

games.forEach(game=>{

const stars = "⭐".repeat(Math.round(game.rating));

const card = document.createElement("div");
card.className="game-card";

card.innerHTML=`

<img src="${game.background_image}" />

<div class="game-info">

<div class="game-title">${game.name}</div>

<div class="game-rating">${stars}</div>

<div class="game-date">
Release: ${game.released}
</div>

</div>

`;

card.onclick = ()=>openGame(game.id);

gamesContainer.appendChild(card);

});

}


/* ===============================
   SEARCH
================================ */

searchInput.addEventListener("input",async()=>{

const q = searchInput.value;

if(q.length < 2) return fetchGames();

const res = await fetch(
`${BASE_URL}/games?key=${API_KEY}&search=${q}`
);

const data = await res.json();

renderGames(data.results);

});


/* ===============================
   SLIDER
================================ */

function createSlider(games){

sliderGames = games;

slides.innerHTML="";
dots.innerHTML="";

games.forEach((game,i)=>{

slides.innerHTML += `
<img src="${game.background_image}" class="slide">
`;

dots.innerHTML += `
<span class="dot" onclick="goSlide(${i})"></span>
`;

});

activateDot();

}

function goSlide(i){

currentSlide = i;

slides.style.transform =
`translateX(-${i*100}%)`;

activateDot();

}

function activateDot(){

document.querySelectorAll(".dot")
.forEach((dot,index)=>{

dot.classList.toggle("active",
index===currentSlide);

});

}


/* ===============================
   GAME POPUP
================================ */

async function openGame(id){

const res = await fetch(
`${BASE_URL}/games/${id}?key=${API_KEY}`
);

const game = await res.json();

document.getElementById("popupTitle")
.innerText = game.name;

document.getElementById("popupDesc")
.innerText = game.description_raw;

document.getElementById("popupImg")
.src = game.background_image;


/* ===== TRAILER ===== */

const trailerRes = await fetch(
`${BASE_URL}/games/${id}/movies?key=${API_KEY}`
);

const trailerData = await trailerRes.json();

const trailer =
trailerData.results[0]?.data?.max || "";

document.getElementById("popupTrailer")
.innerHTML = trailer
? `<video controls width="100%">
<source src="${trailer}">
</video>`
: "No trailer available";


/* ===== SCREENSHOTS ===== */

const shotRes = await fetch(
`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`
);

const shots = await shotRes.json();

const screenBox =
document.getElementById("popupScreens");

screenBox.innerHTML="";

shots.results.slice(0,6).forEach(pic=>{

screenBox.innerHTML+=`
<img src="${pic.image}" class="screen">
`;

});

document.getElementById("gamePopup")
.style.display="flex";

}


/* ===============================
   CLOSE POPUP
================================ */

function closeGame(){

document.getElementById("gamePopup")
.style.display="none";

}
