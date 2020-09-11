const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
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

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    // console.log(e)
    const { duration, currentTime } = e.srcElement;
    // console.log(duration, currentTime)

    // Update progress bar width ----
    const progressPercent = (currentTime / duration) * 100;
    // Access progress.style.width to dynamically manipulate width of class="progress" in css 
    // assaign width value type in string
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration ----
    const durationMinutes = Math.floor(duration / 60);
    // *** use % remainder operator to calcutate seconds
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`
    }
    // Delay display duration elements when switching song to avoid NaN by checking if durationSeconds is loaded
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current ----
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  // console.log('setProgressBar', e);
  const width = this.clientWidth;
  // const width2 = e.srcElement.clientWidth
  // console.log("width", width, width2)
  const clickX = e.offsetX;
  // console.log("clickX", clickX)

  const { duration } = music;
  // console.log("percentage", clickX / width)
  // console.log("duration in second", (clickX / width) * duration)
  // using 'audio' currentTime attribute to set/changing current time
  music.currentTime = (clickX / width) * duration;
}

// ===== EVENT LISTENRS =============
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
// auto play next song when current song is ended
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
