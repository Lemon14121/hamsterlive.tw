const videoPreview = document.getElementById('video-preview');
const imageOverlay = document.getElementById('image-overlay');
let lastX, lastY;
let isDragging = false;
let initialDistance = 0;
let currentScale = 1;
let translateX = 0;
let translateY = 0;

// 初始化圖片樣式
imageOverlay.style.position = 'absolute';
imageOverlay.style.transform = 'translate(0px, 0px) scale(1)';

// 擷取前鏡頭畫面
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        videoPreview.srcObject = stream;
        const container = document.createElement('div');
        container.style.transform = 'scaleX(-1)';
        container.style.display = 'inline-block';
        container.appendChild(videoPreview);
        const videoContainer = document.getElementById('video-container');
        videoContainer.appendChild(container);
    })
    .catch(error => {
        console.log('無法讀取鏡頭：', error);
    });

// 更換成員
function changeImage(imagePath, button) {
    imageOverlay.src = imagePath;
}

function image() {
    const newImage = prompt('請自行输入想合照的完整網址：');
    if (newImage) {
        imageOverlay.src = newImage;
    }
}

// 拖曳與縮放功能
function applyTransform() {
    imageOverlay.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
}

function startDragging(e) {
    isDragging = true;
    if (e.touches && e.touches.length === 1) {
        const touch = e.touches[0];
        lastX = touch.clientX;
        lastY = touch.clientY;
    } else {
        lastX = e.clientX;
        lastY = e.clientY;
    }
}

function stopDragging() {
    isDragging = false;
}

function dragImage(e) {
    if (isDragging) {
        e.preventDefault();
        if (e.touches && e.touches.length === 1) {
            const touch = e.touches[0];
            const deltaX = touch.clientX - lastX;
            const deltaY = touch.clientY - lastY;
            translateX += deltaX;
            translateY += deltaY;
            lastX = touch.clientX;
            lastY = touch.clientY;
            applyTransform();
        } else {
            const deltaX = e.clientX - lastX;
            const deltaY = e.clientY - lastY;
            translateX += deltaX;
            translateY += deltaY;
            lastX = e.clientX;
            lastY = e.clientY;
            applyTransform();
        }
    }
}

// 滾輪縮放功能（適用於電腦）
imageOverlay.addEventListener('wheel', (e) => {
    e.preventDefault();
    const scaleStep = 0.1; // 每次滾輪縮放的比例
    if (e.deltaY < 0) {
        // 放大
        currentScale += scaleStep;
    } else {
        // 縮小
        currentScale = Math.max(0.1, currentScale - scaleStep); // 確保縮放比例不低於 0.1
    }
    applyTransform();
});

// 綁定拖曳事件
imageOverlay.addEventListener('mousedown', startDragging);
imageOverlay.addEventListener('mouseup', stopDragging);
imageOverlay.addEventListener('mousemove', dragImage);

imageOverlay.addEventListener('touchstart', startDragging);
imageOverlay.addEventListener('touchend', stopDragging);
imageOverlay.addEventListener('touchmove', dragImage);

// 截圖功能
function captureScreenshot() {
    const video = document.getElementById('video-preview');
    const canvas = document.createElement('canvas');
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;
    const ctx = canvas.getContext('2d');

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);

    const overlayRect = imageOverlay.getBoundingClientRect();
    const videoRect = video.getBoundingClientRect();

    const overlayX = overlayRect.left - videoRect.left;
    const overlayY = overlayRect.top - videoRect.top;
    const overlayWidth = overlayRect.width;
    const overlayHeight = overlayRect.height;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(imageOverlay, overlayX, overlayY, overlayWidth, overlayHeight);

    const link = document.createElement('a');
    link.download = 'usie.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
