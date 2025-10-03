// -------------------- Greeter Quran App --------------------

// ----- User Name -----
let userName = "";
if (localStorage.getItem("userName")) {
  userName = localStorage.getItem("userName");
  document.getElementById("nameInput").value = userName;
}

// ----- Track Background -----
let currentBackground = "";

// ----- Quranic Verses -----
const verses = [
  "Surah Al-Baqarah 2:286 - 'Allah does not burden a soul beyond that it can bear.'",
  "Surah Ash-Sharh 94:5-6 - 'For indeed, with hardship [will be] ease.'",
  "Surah At-Tawbah 9:51 - 'Say, Never will we be struck except by what Allah has decreed for us.'",
  "Surah Al-Baqarah 2:153 - 'O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.'",
  "Surah Ar-Ra'd 13:28 - 'Unquestionably, by the remembrance of Allah hearts are assured.'",
  "Surah Al-Imran 3:17 - 'The patient, the true, the obedient, those who spend, and those who seek forgiveness before dawn.'",
  "Surah Al-Bayyina 98:7 - 'Indeed, those who have believed and done righteous deeds – they are the best of creatures.'",
  "Surah Al-Ikhlas 112:1-4 - 'Say, He is Allah, One, Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.'"
];

// ----- Helper Functions -----
function getRandomVerse() {
  const index = Math.floor(Math.random() * verses.length);
  return verses[index];
}

// ----- Update Greeting -----
function updateGreeting() {
  const hour = new Date().getHours();
  let greeting, icon, newBackground;

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
    icon = "🌅";
    newBackground = "morning";
  } else if (hour >= 12 && hour < 15) {
    greeting = "Good Day";
    icon = "☀️";
    newBackground = "day";
  } else if (hour >= 15 && hour < 18) {
    greeting = "Good Afternoon";
    icon = "🌤️";
    newBackground = "afternoon";
  } else if (hour >= 18 && hour < 22) {
    greeting = "Good Evening";
    icon = "🌇";
    newBackground = "evening";
  } else {
    greeting = "Good Night";
    icon = "🌙";
    newBackground = "night";
  }

  if (currentBackground !== newBackground) {
    document.body.className = newBackground;
    currentBackground = newBackground;
  }

  const displayGreeting = userName ? `${greeting}, ${userName}!` : greeting;

  document.getElementById("icon").innerText = icon;
  document.getElementById("text").innerText = displayGreeting;
  document.getElementById("verse").innerText = getRandomVerse();
}

// ----- Clock -----
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById("clock").innerText = `${h}:${m}:${s}`;
}

// ----- Date -----
function updateDate() {
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  document.getElementById("date").innerText = now.toLocaleDateString("en-US", options);
}

// ----- Name Input Listeners -----
document.getElementById("nameInput").addEventListener("input", e => {
  userName = e.target.value.trim();
  localStorage.setItem("userName", userName);
  updateGreeting();
});

document.getElementById("resetButton").addEventListener("click", () => {
  localStorage.removeItem("userName");
  userName = "";
  document.getElementById("nameInput").value = "";
  updateGreeting();
});

// ----- Initialize -----
updateGreeting();
updateClock();
updateDate();

setInterval(updateClock, 1000);
setInterval(updateGreeting, 60000);
setInterval(updateDate, 60000);
