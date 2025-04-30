const moodToMusic = {
  happy: {
    track: "https://open.spotify.com/embed/track/1rfofaqEpACxVEHIZBJe6W",
    description: "Uplifting beats to match your mood!"
  },
  sad: {
    track: "https://open.spotify.com/embed/track/0ofHAoxe9vBkTCp2UQIavz",
    description: "A gentle tune for your blue skies."
  },
  angry: {
    track: "https://open.spotify.com/embed/track/4fSIb4hdOQ151TILNsSEaF",
    description: "Let the rage flow through the rhythm."
  },
  chill: {
    track: "https://open.spotify.com/embed/track/5jAIouBES8LTMtlxjWDgZz",
    description: "Lo-fi sounds to float with your mood."
  },
  anxious: {
    track: "https://open.spotify.com/embed/track/7yYuvKX3zFfu4fjwEGkcVw",
    description: "Soft melodies to help ease your mind."
  },
  romantic: {
    track: "https://open.spotify.com/embed/track/0RZcRz6la9o6cYpX2D4A77",
    description: "Let your heart sing along with this tune."
  }
};

document.getElementById("generate").addEventListener("click", () => {
  const mood = document.getElementById("mood").value;
  const today = new Date().toLocaleDateString();
  const { track, description } = moodToMusic[mood];

  const entryDiv = document.getElementById("entry");
  entryDiv.innerHTML = `
    <h2>${today}: ${mood.toUpperCase()}</h2>
    <p>${description}</p>
    <iframe src="${track}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  `;

  const journal = JSON.parse(localStorage.getItem("moodJournal") || "{}");
  journal[today] = { mood, track, description };
  localStorage.setItem("moodJournal", JSON.stringify(journal));

  updateCalendar();
});

function updateCalendar() {
  const calendar = document.getElementById("calendar");
  const journal = JSON.parse(localStorage.getItem("moodJournal") || "{}");
  calendar.innerHTML = "<h2>📅 Your Mood Calendar</h2>";

  for (let date in journal) {
    const entry = journal[date];
    calendar.innerHTML += `
      <div>
        <strong>${date}</strong>: ${entry.mood} – ${entry.description}
      </div>
    `;
  }
}

// Load calendar on page load
updateCalendar();

// Dark mode toggle
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const mode = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", mode);
});

// Set saved theme on load
window.addEventListener("load", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});
