// Get video player and custom controls elements
const videoPlayer = document.getElementById('custom-video-player');
const playPauseButton = document.getElementById('custom-play-pause-button');
const progressBar = document.getElementById('custom-progress-bar');
const fullScreenButton = document.getElementById('custom-fullscreen-button');
const fullscreenOverlay = document.getElementById('custom-fullscreen-overlay');


// Add event listeners for play/pause button, video time update, and full screen button
playPauseButton.addEventListener('click', togglePlayPause);
videoPlayer.addEventListener('timeupdate', updateProgressBar);
fullScreenButton.addEventListener('click', toggleFullScreen);

fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen().catch(err => {
            console.error('Fullscreen request failed:', err);
        });
    } else {
        document.exitFullscreen();
    }
});

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement === video) {
        fullscreenControls.style.display = 'flex'; // Show custom controls in fullscreen
    } else {
        fullscreenControls.style.display = 'none'; // Hide custom controls when exiting fullscreen
    }
});

// Function to toggle play/pause
function togglePlayPause() {
    if (videoPlayer.paused || videoPlayer.ended) {
        videoPlayer.play();
        playPauseButton.textContent = 'Pause';
    } else {
        videoPlayer.pause();
        playPauseButton.textContent = 'Play';
    }
}

// Function to update the progress bar
function updateProgressBar() {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = progress + '%';
}

// Function to toggle full screen
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        } else if (videoPlayer.mozRequestFullScreen) { // Firefox
            videoPlayer.mozRequestFullScreen();
        } else if (videoPlayer.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            videoPlayer.webkitRequestFullscreen();
        } else if (videoPlayer.msRequestFullscreen) { // IE/Edge
            videoPlayer.msRequestFullscreen();
        }
  
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        fullScreenButton.textContent = 'Full Screen';
    }
}

// Update the play/pause button text when video ends
videoPlayer.addEventListener('ended', () => {
    playPauseButton.textContent = 'Replay';
    progressBar.style.width = '0%';
});
