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
  const notificationBtn = document.getElementById("notificationBtn");
  if(notificationBtn) notificationBtn.addEventListener("click", () => alert("No new notifications 🔔"));

  const dotsBtn = document.getElementById("dotsBtn");
  if(dotsBtn) dotsBtn.addEventListener("click", () => alert("More options menu ⚙️"));

  // ===== SLIDER =====
  const slides = document.getElementById("slides");
  if(slides){
    const slideImages = Array.from(slides.children);
    const totalSlides = slideImages.length;

    // Clone first and last slide for infinite loop
    const firstClone = slideImages[0].cloneNode(true);
    const lastClone = slideImages[totalSlides - 1].cloneNode(true);

    slides.appendChild(firstClone);
    slides.insertBefore(lastClone, slides.children[0]);

    let index = 1; // start from first real slide
    slides.style.transform = `translateX(-${index * 100}%)`;

    function nextSlide() {
      index++;
      slides.style.transition = "transform 0.7s ease-in-out";
      slides.style.transform = `translateX(-${index * 100}%)`;
    }

    // Auto slide every 3 seconds
    let sliderInterval = setInterval(nextSlide, 3000);

    slides.addEventListener("transitionend", () => {
      if(index >= slides.children.length - 1){ // reached cloned first
        slides.style.transition = "none";
        index = 1;
        slides.style.transform = `translateX(-${index * 100}%)`;
      }
      if(index <= 0){ // reached cloned last
        slides.style.transition = "none";
        index = slides.children.length - 2;
        slides.style.transform = `translateX(-${index * 100}%)`;
      }
    });
  }

  // ===== GAMES POPUP =====
  const games = [
    { title:"Where Winds Meet", desc:"Let the wind carry your legend to the boundless adventure....Where Winds Meet is an epic adventure through breathtaking valleys and towering mountains.Meet fascinating characters and make choices that shape your destiny.", img:"images/wherewindsmeet.jpg", download:"downloads/spiderman.apk", rating:4.5, price: 5},
    { title:"Black Myth:Wukong", desc:"Open world action adventure game.", img:"images/blackmythwukong.jpg", download:"downloads/gta.apk", rating:5, price: 0 },
    { title:"Red Dead Redemption", desc:"High speed racing game with many cars.", img:"images/reddeadredemption.jpg", download:"downloads/racing.apk", rating:4, price: 0},
    { title:"Spiderman3", desc:"web will grow time will tell people will be saved buy spider", img:"images/spiderman3.jpg", download:"downloads/spiderman3.apk", rating:3, price: 10},

{
title:"Grand Theft Auto V",
desc:`Grand Theft Auto V is a massive open world action game set in Los Santos.
Players control three criminals planning dangerous heists across the city.
The online mode allows players to build businesses and complete jobs.
It is one of the most successful games ever released.`,
img:"images/gta5.jpg",
download:"#",
rating:5,
price: 7  
},

{
title:"Red Dead Redemption 2",
desc:`Red Dead Redemption 2 is an open world western adventure game.
Players follow Arthur Morgan, a member of the Van der Linde gang.
The story explores loyalty, survival and the end of the outlaw era.
Players can hunt animals, explore towns and ride horses across the wild west.`,
img:"images/rdr2.jpg",
download:"#",
rating:5,
price: 15  
},

{
title:"Cyberpunk 2077",
desc:`Cyberpunk 2077 takes place in the futuristic Night City.
Players control a mercenary named V trying to survive in a dangerous world.
Cybernetic upgrades allow powerful abilities and hacking skills.
The city is filled with gangs, corporations and advanced technology.`,
img:"images/cyberpunk.jpg",
download:"#",
rating:4,
price: 12
},

{
title:"The Witcher 3",
desc:`The Witcher 3 is a fantasy RPG based on the Witcher novels.
Players control Geralt, a monster hunter known as a Witcher.
The game features a massive open world full of creatures and quests.`,
img:"images/witcher3.jpg",
download:"#",
rating:5,
price: 9
},

{
title:"Elden Ring",
desc:`Elden Ring is a dark fantasy RPG created by FromSoftware.
Players explore a mysterious world known as the Lands Between.
The game is filled with powerful bosses and hidden secrets.`,
img:"images/eldenring.jpg",
download:"#",
rating:5,
price: 0
},

{
title:"Spider-Man Remastered",
desc:`Spider-Man Remastered lets players swing through New York City.
Players control Peter Parker fighting famous villains.
The web swinging mechanics are smooth and satisfying.`,
img:"images/spiderman.jpg",
download:"#",
rating:4,
price: 12
},

{
title:"Fortnite",
desc:`Fortnite is a popular battle royale game with colorful graphics.
Players fight to survive against many other players on a large map.
Building structures during combat adds a unique gameplay mechanic.`,
img:"images/fortnite.jpg",
download:"#",
rating:5,
price: 0
},

{
title:"PUBG Mobile",
desc:`PUBG Mobile is a survival battle royale game.
Players land on an island and search for weapons and equipment.
The safe zone slowly shrinks forcing players to fight.`,
img:"images/pubgm.jpg",
download:"#",
rating:5,
price: 0
},

{
title:"Free Fire",
desc:`Free Fire is a fast paced mobile battle royale game.
Matches are shorter making it perfect for quick gameplay.
Players choose characters with special abilities.`,
img:"images/freefire.jpg",
download:"#",
rating:4,
price: 0
},

{
title:"Forza Horizon 5",
desc:`Forza Horizon 5 is an open world racing game set in Mexico.
Players drive hundreds of real world vehicles.
The map includes deserts, jungles, cities and volcanoes.`,
img:"images/forza5.jpg",
download:"#",
rating:5,
price: 5
},

{
title:"Need for Speed Heat",
desc:`Need for Speed Heat focuses on underground street racing.
Players compete in legal races during the day.
At night illegal races attract police attention.
Players must escape police while earning reputation.`,
img:"images/nfsheat.jpg",
download:"#",
rating:4,
price: 4
},

{
title:"Minecraft",
desc:`Minecraft is a sandbox game about creativity and survival.
Players can build houses, castles or entire cities using blocks.
The world is randomly generated and full of resources.`,
img:"images/minecraft.jpg",
download:"#",
rating:5,
price: 4
},

{
title:"Resident Evil Village",
desc:`Resident Evil Village is a survival horror game.
Players explore a mysterious village filled with danger.
The story follows Ethan Winters searching for his daughter.`,
img:"images/revillage.jpg",
download:"#",
rating:4,
price: 12
},

{
title:"Call of Duty Warzone",
desc:`Call of Duty Warzone is a battle royale shooter.
Players drop into a large map and fight to survive.
Weapons, vehicles and teamwork are essential.`,
img:"images/warzone.jpg",
download:"#",
rating:5,
price: 0
},

{
title:"Dream League Soccer 2026",
desc:`Dream League Soccer 2026 is a football simulation game.
Players build their own team and compete in leagues.
You can sign famous players and improve your stadium.`,
img:"images/dls2026.jpg",
download:"#",
rating:5,
price: 0
}
    ,
{
title:"FIFA 23",
desc:`FIFA 23 is a realistic football simulation game.
Players control professional teams from leagues around the world.
The game features improved physics and player animations.
Career mode allows managing clubs and signing players.`,
img:"images/fifa23.jpg",
download:"#",
rating:5,
price: 2
},

{
title:"EA Sports FC 24",
desc:`EA Sports FC 24 continues the legacy of football simulation games.
Players can control famous clubs and international teams.
The game introduces advanced movement and tactical systems.`,
img:"images/fc24.jpg",
download:"#",
rating:5,
price: 9
},

{
title:"Assassin's Creed Valhalla",
desc:`Assassin's Creed Valhalla is an open world action RPG.
Players control a Viking warrior exploring medieval England.
It combines history with action adventure gameplay.`,
img:"images/acvalhalla.jpg",
download:"#",
rating:4,
price: 3
},

{
title:"Assassin's Creed Odyssey",
desc:`Assassin's Creed Odyssey takes place in ancient Greece.
Players explore islands, cities and battlefields.
The game features naval combat and large scale battles.`,
img:"images/acodyssey.jpg",
download:"#",
rating:4
},

{
title:"Far Cry 6",
desc:`Far Cry 6 is an open world shooter set in a tropical island.
Players join a revolution against a powerful dictator.
The game features a large map with cities and jungles.`,
img:"images/farcry6.jpg",
download:"#",
rating:4
},

{
title:"Watch Dogs Legion",
desc:`Watch Dogs Legion is a hacking based open world game.
Players fight against an oppressive system in London.
The game allows recruiting any character in the city.`,
img:"images/watchdogslegion.jpg",
download:"#",
rating:4
},

{
title:"Apex Legends",
desc:`Apex Legends is a fast paced battle royale shooter.
Players choose heroes with special abilities.
Teams must survive against many other squads.`,
img:"images/apex.jpg",
download:"#",
rating:5
},

{
title:"Valorant",
desc:`Valorant is a competitive tactical shooter game.
Players join teams and complete objectives.
It has become a major esports title.`,
img:"images/valorant.jpg",
download:"#",
rating:5
},

{
title:"Counter Strike 2",
desc:`Counter Strike 2 is a classic competitive shooter.
Players join terrorist or counter terrorist teams.
The game focuses on strategy and precise shooting.
Rounds require teamwork and communication.`,
img:"images/cs2.jpg",
download:"#",
rating:5
},

{
title:"Rainbow Six Siege",
desc:`Rainbow Six Siege is a tactical shooter game.
Players plan attacks and defend objectives.
Each operator has unique gadgets and abilities.`,
img:"images/r6.jpg",
download:"#",
rating:4
},

{
title:"Asphalt 9 Legends",
desc:`Asphalt 9 Legends is an arcade racing game.
Players race exotic supercars across the world.
The game features high speed action and stunts.`,
img:"images/asphalt9.jpg",
download:"#",
rating:4
},

{
title:"Real Racing 3",
desc:`Real Racing 3 is a realistic racing simulator.
Players drive licensed cars on real world tracks.
The game focuses on realistic driving physics.
Players can upgrade cars and compete in tournaments.`,
img:"images/realracing3.jpg",
download:"#",
rating:4
},

{
title:"Clash of Clans",
desc:`Clash of Clans is a strategy building game.
Players build villages and train powerful armies.
Battles allow attacking other players worldwide.`,
img:"images/clashofclans.jpg",
download:"#",
rating:5
},

{
title:"Clash Royale",
desc:`Clash Royale is a real time strategy card game.
Players collect cards representing troops and spells.
Battles take place in fast paced arenas.
Players must destroy enemy towers to win.`,
img:"images/clashroyale.jpg",
download:"#",
rating:4
},

{
title:"Among Us",
desc:`Among Us is a multiplayer social deduction game.
Players work together to complete spaceship tasks.
Hidden impostors attempt to sabotage the crew.`,
img:"images/amongus.jpg",
download:"#",
rating:4
}
    ];

// Hii should replace the second renderGames inside DOMContentLoaded
const searchInput = document.getElementById("searchInput");

function renderGames(list){
  const container = document.getElementById("gamesContainer");
  container.innerHTML = "";
  list.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${game.img}" alt="${game.title}">
      <div class="game-info">
        <h3>${game.title}</h3>
        <p>${game.desc.substring(0,60)}...</p>
        <div class="game-rating">${"★".repeat(Math.floor(game.rating))}</div>
        <div class="game-price">${game.price === 0 ? "Free" : "$" + game.price}</div>
      </div>
    `;
    card.addEventListener("click", () => {
      document.getElementById("popupImg").src = game.img;
      document.getElementById("popupTitle").innerText = game.title;
      document.getElementById("popupDesc").innerText = game.desc;
      const popupDownload = document.getElementById("popupDownload");
      if(game.price === 0){
        popupDownload.href = game.download;
        popupDownload.innerText = "Download";
      } else {
        popupDownload.href = "#";
        popupDownload.innerText = "Buy Game";
        popupDownload.onclick = () => alert("Payments coming soon 💳");
      }
      document.getElementById("gamePopup").style.display = "flex";
    });
    container.appendChild(card);
  });
}

// Show all games initially
renderGames(games);
  // Live predictive search
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredGames = games.filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.desc.toLowerCase().includes(query)
    );
    renderGames(filteredGames);
  });

  // Optional: Enter key can blur input but results already live
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchInput.blur(); // removes focus, same as "Done"
    }
  });
});

// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const closeSidebar = document.getElementById("closeSidebar");

menuBtn.addEventListener("click", () => sidebar.classList.add("open"));
closeSidebar.addEventListener("click", () => sidebar.classList.remove("open"));

// Redirect pages
const menuPages = {
  menuSettings: "settings.html",
  menuPrivacy: "privacy.html",
  menuShare: "share.html",
  menuHelp: "help.html",
  menuRate: "rate.html",
  menuAbout: "about.html",
  menuLogout: "logout.html"
};

Object.keys(menuPages).forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("click", () => {
      window.location.href = menuPages[id];
    });
  }
});
// Dark/Light theme toggle
const themeBtn = document.getElementById("menuTheme");
const themeLabel = document.getElementById("themeLabel");

// Check saved theme on load
let currentTheme = localStorage.getItem("theme") || "dark";
document.body.classList.toggle("light-theme", currentTheme === "light");
themeLabel.innerText = currentTheme === "light" ? "Light" : "Dark";

// Toggle on click
themeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("light-theme")) {
    document.body.classList.remove("light-theme");
    localStorage.setItem("theme", "dark");
    themeLabel.innerText = "Dark";
  } else {
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
    themeLabel.innerText = "Light";
  }
});
