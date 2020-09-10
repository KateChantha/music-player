const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// CHECK IF PLAYIING
let isPlaying = false;

// PLAY
function playSong() {
  isPlaying = true;
  music.play()
}

// PAUSE
function pauseSong() {
  isPlaying = false;
  music.pause()
}

// PLAY or PAUSE Event Listener
// add play-pause Event Listener to playBtn
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));