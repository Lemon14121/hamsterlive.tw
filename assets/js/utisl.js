const videoPreview = document.getElementById('video-preview');
const imageOverlay = document.getElementById('image-overlay');
let lastX, lastY;
let isDragging = false;
let initialDistance = 0;
let currentScale = 1;
let translateX = 0;
let translateY = 0;

imageOverlay.style.position = 'absolute';
imageOverlay.style.transform = 'translate(0px, 0px) scale(1)';

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

function changeImage(imagePath, button) {
    imageOverlay.src = imagePath;
}

function image() {
    const newImage = prompt('請自行输入想合照的完整網址：');
    if (newImage) {
        imageOverlay.src = newImage;
    }
}

function applyTransform() {
    imageOverlay.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
}

function startDragging(e) {
    isDragging = true;
    if (e.touches && e.touches.length === 1) {
        const touch = e.touches[0];
        lastX = touch.clientX;
        lastY = touch.clientY;
    } else if (e.touches && e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
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
        } else if (e.touches && e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
            currentScale *= distance / initialDistance;
            initialDistance = distance;
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

imageOverlay.addEventListener('mousedown', startDragging);
imageOverlay.addEventListener('mouseup', stopDragging);
imageOverlay.addEventListener('mousemove', dragImage);

imageOverlay.addEventListener('touchstart', startDragging);
imageOverlay.addEventListener('touchend', stopDragging);
imageOverlay.addEventListener('touchmove', dragImage);

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
