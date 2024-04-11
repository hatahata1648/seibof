const videoElement = document.getElementById('camera-stream');
const overlayElement = document.getElementById('overlay');

// カメラの起動と設定
navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: 'environment'
    }
})
.then(stream => {
    videoElement.srcObject = stream;
    // ボタンを動的に生成
    const captureBtn = document.createElement('button');
    captureBtn.id = 'capture-btn';
    captureBtn.textContent = '写真を撮る';
    captureBtn.addEventListener('click', capturePhoto);
    document.getElementById('app').appendChild(captureBtn);
})
.catch(error => {
    console.error('Error accessing camera:', error);
});

// 写真撮影関数
function capturePhoto() {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const capturedImageData = canvas.toDataURL('image/png');

    const downloadLink = document.createElement('a');
    downloadLink.download = 'captured_photo.png';
    downloadLink.href = capturedImageData;
    downloadLink.click();
}

// カメラのストリームを停止
function stopCameraStream() {
    const stream = videoElement.srcObject;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
    }
}
