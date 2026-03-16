const googleUser = JSON.parse(localStorage.getItem("googleUser"));
if(!googleUser){ window.location.href = "index.html"; }

const API_KEY = "b6eb9c2e474d41e3bcc8550e873623de";
const BASE_URL = "https://api.rawg.io/api";

const gamesContainer = document.getElementById("gamesContainer");
const searchInput = document.getElementById("searchInput");
const slidesContainer = document.querySelector(".slides");
const dotsContainer = document.querySelector(".dots");
const loader = document.getElementById("loader");

const gamePopup = document.getElementById("gamePopup");
const popupContent = document.querySelector(".popup-content");
const popupTitle = document.getElementById("popupTitle");
const popupDesc = document.getElementById("popupDesc");
const popupImg = document.getElementById("popupImg");
const popupScreens = document.getElementById("popupScreens");
const popupTrailer = document.getElementById("popupTrailer");
const popupDownload = document.getElementById("popupDownload");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const menuTheme = document.getElementById("menuTheme");
const themeLabel = document.getElementById("themeLabel");
const logoutBtn = document.getElementById("logoutBtn");

if(googleUser){
  document.getElementById("googleProfilePic").src = googleUser.picture;
  document.getElementById("popupProfilePic").src = googleUser.picture;
  document.getElementById("accountName").innerText = googleUser.name;
  document.getElementById("accountEmail").innerText = googleUser.email;
}

// ===============================
// NAVIGATION
// ===============================
document.getElementById("menuSettings").onclick = () => location.href="settings.html";
document.getElementById("menuPrivacy").onclick = () => location.href="privacy.html";
document.getElementById("menuHelp").onclick = () => location.href="help.html";
document.getElementById("menuRate").onclick = () => location.href="rate.html";
document.getElementById("menuAbout").onclick = () => location.href="about.html";

document.getElementById("menuShare").onclick = ()=>{
  if(navigator.share){
    navigator.share({title:"Crunk Games", url:window.location.href}).catch(console.error);
  } else alert("Share not supported on this browser!");
};

logoutBtn.onclick = ()=>{
  localStorage.removeItem("googleUser");
  location.href="index.html";
};

// ===============================
// SIDEBAR
// ===============================
menuBtn.onclick = ()=> sidebar.classList.toggle("open");

// ===============================
// THEME TOGGLE
// ===============================
menuTheme.addEventListener("click", ()=>{
  document.body.classList.toggle("light-theme");
  themeLabel.innerText = document.body.classList.contains("light-theme") ? "Light" : "Dark";
});

// ===============================
// FETCH GAMES
// ===============================
let sliderInterval, sliderGames=[], currentSlide=0;

async function fetchGames(query=""){
  try{
    loader.style.display="flex";
    const res = await fetch(`${BASE_URL}/games?key=${API_KEY}${query?"&search="+query:""}&platforms=4,187&page_size=24&ordering=-added`);
    const data = await res.json();
    const games = data.results || [];
    loader.style.display="none";
    if(!games.length) return gamesContainer.innerHTML="<p style='text-align:center;color:#ff6b6b'>No games found</p>";
    renderGames(games);
    createSlider(games.slice(0,4));
  } catch(e){
    console.error(e);
    loader.style.display="none";
    gamesContainer.innerHTML="<p style='text-align:center;color:#ff6b6b'>Failed to load games</p>";
  }
}
fetchGames();

// ===============================
// SEARCH
// ===============================
let searchTimeout;
searchInput.addEventListener("input", ()=>{
  clearTimeout(searchTimeout);
  searchTimeout=setTimeout(()=> fetchGames(searchInput.value.trim()), 500);
});

// ===============================
// RENDER GAMES
// ===============================
function renderGames(games){
  gamesContainer.innerHTML="";
  games.forEach(game=>{
    const stars="⭐".repeat(Math.round(game.rating||0));
    const card=document.createElement("div");
    card.className="game-card";
    card.innerHTML=`<img src="${game.background_image||'placeholder.png'}"><div class="game-info"><div class="game-title">${game.name}</div><div class="game-date">${game.released||''}</div><div class="game-rating">${stars}</div></div>`;
    card.onclick=()=>openGame(game.id);
    gamesContainer.appendChild(card);
  });
}

// ===============================
// SLIDER
// ===============================
function goSlide(index){
  currentSlide=index;
  slidesContainer.style.transform=`translateX(-${index*100}%)`;
  dotsContainer.querySelectorAll(".dot").forEach((dot,i)=>dot.classList.toggle("active",i===index));
}
function createSlider(games){
  sliderGames=games;
  slidesContainer.innerHTML="";
  dotsContainer.innerHTML="";
  sliderGames.forEach((game,i)=>{
    const img=document.createElement("img");
    img.src=game.background_image;
    img.className="slide";
    img.onclick=()=>openGame(game.id);
    slidesContainer.appendChild(img);
    const dot=document.createElement("span");
    dot.className="dot";
    dot.onclick=()=>goSlide(i);
    dotsContainer.appendChild(dot);
  });
  goSlide(0);
  if(sliderInterval) clearInterval(sliderInterval);
  sliderInterval=setInterval(()=> goSlide((currentSlide+1)%sliderGames.length),5000);
}

// ===============================
// GAME POPUP
// ===============================
async function openGame(id){
  try{
    const res=await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
    const game=await res.json();
    popupTitle.innerText=game.name;
    popupDesc.innerText=game.description_raw?.substring(0,200)+"..."||"";
    popupImg.src=game.background_image||"placeholder.png";
    popupScreens.innerHTML="";
    const shotRes=await fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
    (await shotRes.json()).results?.slice(0,6).forEach(s=>{
      const img=document.createElement("img");
      img.src=s.image;
      popupScreens.appendChild(img);
    });
    const trailerRes=await fetch(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`);
    const trailer=(await trailerRes.json()).results?.[0]?.data?.max;
    popupTrailer.innerHTML=trailer?`<video controls width="100%" style="border-radius:12px;background:#000"><source src="${trailer}" type="video/mp4"></video>`:"<div style='color:#ffb400'>No trailer available</div>";
    popupDownload.onclick=()=> window.open(game.website||"#","_blank");
    gamePopup.style.display="flex";
  } catch(e){ console.error("Error opening game:",e); }
}

// ===============================
// CLOSE POPUP
// ===============================
gamePopup.addEventListener("click",e=>{ if(e.target===gamePopup||e.target.classList.contains("close")) gamePopup.style.display="none"; });
popupContent.addEventListener("click",e=>e.stopPropagation());

// ===============================
// SERVICE WORKER (Optional PWA)
if("serviceWorker" in navigator){
  window.addEventListener("load",()=> navigator.serviceWorker.register("/sw.js").then(()=>console.log("Service Worker Registered")).catch(err=>console.log("SW Error",err)));
}
