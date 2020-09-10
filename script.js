const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// ======== SONG LIST ===============
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto'
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto'
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight Disco Queen',
    artist: 'Jacinto'
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto'
  }
];

// ======== CONTROLS ================
// Check if playing
let isPlaying = false;

// PLAY
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play()
}

// PAUSE
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause()
}

// PLAY or PAUSE Event Listener
// add play-pause Event Listener to playBtn
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// ======== UPDATE DOM ================
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Next Song
function nextSong() {
  songIndex < songs.length - 1 ? songIndex++ : songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

// Prev Song
function prevSong() {
  songIndex <= 0 ? songIndex = songs.length - 1 : songIndex--;
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Even Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);