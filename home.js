document.addEventListener("DOMContentLoaded", () => {

  // ===== NAVIGATION =====
  const pages = {
    homeNav: "index.html",
    gamesNav: "games.html",
    tournamentsNav: "tournaments.html",
    chatNav: "chat.html",
    accountNav: "account.html"
  };

  Object.keys(pages).forEach(id => {
    const element = document.getElementById(id);
    if(element){
      element.addEventListener("click", () => {
        window.location.href = pages[id];
      });
    }
  });

  // ===== MENU BUTTON (Three Lines) =====
  const menuBtn = document.getElementById("menuBtn");
  if(menuBtn){
    menuBtn.addEventListener("click", () => {
      alert("Sidebar menu will open here 🔥");
    });
  }

  // ===== NOTIFICATION =====
  const notificationBtn = document.getElementById("notificationBtn");
  if(notificationBtn){
    notificationBtn.addEventListener("click", () => {
      alert("No new notifications 🔔");
    });
  }

  // ===== THREE DOTS =====
  const dotsBtn = document.getElementById("dotsBtn");
  if(dotsBtn){
    dotsBtn.addEventListener("click", () => {
      alert("More options menu ⚙️");
    });
  }

  // ===== IMAGE SLIDER =====
  let currentIndex = 0;
  const slides = document.getElementById("slides");

  if(slides){
    setInterval(() => {
      const total = slides.children.length;
      currentIndex = (currentIndex + 1) % total;
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 3000);
  }

});
const games = [
  {
    title: "Spider-Man",
    desc: "Swing across the city and defeat villains.",
    img: "images/spiderman.jpg",
    download: "downloads/spiderman.apk"
  },
  {
    title: "GTA",
    desc: "Open world action adventure game.",
    img: "images/gta.jpg",
    download: "downloads/gta.apk"
  },
  {
    title: "Racing Game",
    desc: "High speed racing game with many cars.",
    img: "images/racing.jpg",
    download: "downloads/racing.apk"
  }
  // Unaweza kuongeza hadi 100+ games hapa
];

const container = document.getElementById("gamesContainer");

games.forEach(game => {
  const img = document.createElement("img");
  img.src = game.img;
  img.className = "game-img";

  img.dataset.title = game.title;
  img.dataset.desc = game.desc;
  img.dataset.img = game.img;
  img.dataset.download = game.download;

  img.addEventListener("click", () => {
    document.getElementById("popupImg").src = game.img;
    document.getElementById("popupTitle").innerText = game.title;
    document.getElementById("popupDesc").innerText = game.desc;
    document.getElementById("popupDownload").href = game.download;

    document.getElementById("gamePopup").style.display = "flex";
  });

  container.appendChild(img);
});

function closeGame(){
  document.getElementById("gamePopup").style.display = "none";
}
