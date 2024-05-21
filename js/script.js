const songsList = [
    {
        name: "Du Hast",
        artist: "Rammstein",
        album: "Sehnsucht",
        src: "assets/1.mp3",
        cover: "assets/1.jpg"
    },
    {
        name: "Alkaline",
        artist: "Sleep Token",
        album: "This Place Will Become Your Tomb",
        src: "assets/2.mp3",
        cover: "assets/2.jpg"
    },
    {
        name: "Punk Rock Loser",
        artist: "Viagra Boys",
        album: "Cave World",
        src: "assets/3.mp3",
        cover: "assets/3.jpg"
    }
];

const artistName = document.querySelector(".artist-name");
const songName = document.querySelector(".song-name");
const albumName = document.querySelector(".album-name");
const cover = document.getElementById("cover");
const time = document.querySelector(".song-time");
const progress = document.querySelector(".progress-bar");
const fillBar = document.querySelector(".fill");
const playBtn = document.getElementById("play-button");
const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");

let audio = new Audio();
let currentSong = 0;
let playing = false;


document.addEventListener("DOMContentLoaded", () => {
    loadSong(currentSong);
    audio.addEventListener("timeupdate", updateProgressBar);
    audio.addEventListener("ended", nextSong);
    prevBtn.addEventListener("click", prevSong);
    nextBtn.addEventListener("click", nextSong);
    playBtn.addEventListener("click", playPause);
    progress.addEventListener("click", seekTime);
});

function loadSong(index) {
    const { name, artist, album, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    songName.innerText = name;
    albumName.innerText = album;
    audio.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgressBar() {
    if (audio.duration) {
        const pos = (audio.currentTime / audio.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(audio.duration);
        const currentTime = formatTime(audio.currentTime);

        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
}

function playPause() {
    playing ? audio.pause() : audio.play();
    playing = !playing;
    playBtn.classList.toggle("fa-play");
    playBtn.classList.toggle("fa-pause");
    cover.classList.toggle("active", playing);
}

function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    audio.play();
    playing = true;
    playBtn.classList.add("fa-pause");
    cover.classList.add("active");
}

function seekTime(e) {
    const pos = (e.offsetX / progress.offsetWidth) * audio.duration;
    audio.currentTime = pos;
}

