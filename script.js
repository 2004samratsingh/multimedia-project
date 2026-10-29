const videoElement = document.getElementById('webcam');
const startCameraBtn = document.getElementById('start-camera');
const stopCameraBtn = document.getElementById('stop-camera');
const captureBtn = document.getElementById('capture-btn');
const canvas = document.getElementById('snapshot');

let mediaStream = null;

startCameraBtn.addEventListener('click', async () => {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        videoElement.srcObject = mediaStream;
    } catch (error) {
        alert('Unable to access camera: ' + error.message);
    }
});

stopCameraBtn.addEventListener('click', () => {
    if (mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
        mediaStream = null;
    }
});

captureBtn.addEventListener('click', () => {
    if (!mediaStream) {
        alert('Please start the camera first!');
        return;
    }
    const context = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
});
