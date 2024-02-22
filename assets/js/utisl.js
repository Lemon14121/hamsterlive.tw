const videoPreview = document.getElementById('video-preview');
const imageOverlay = document.getElementById('image-overlay');
let lastX, lastY;
let isDragging = false;
let initialDistance;
let initialScale;
// 擷取前鏡頭畫面
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        // 前鏡頭畫面套入影片播放
        videoPreview.srcObject = stream;
        // 建立一個新容器打包顯示畫面
        const container = document.createElement('div');
        container.style.transform = 'scaleX(-1)';
        container.style.display = 'inline-block'; // 確保新容器可以正確顯示
        // 將顯示畫面匯入新容器中
        container.appendChild(videoPreview);
        // 將新容器加入原來的容器內
        const videoContainer = document.getElementById('video-container');
        videoContainer.appendChild(container);
    })
    .catch(error => {
        console.log('無法讀取鏡頭：', error);
    });
    
// 更换成員
function changeImage(imagePath,button) {
    document.getElementById('image-overlay').src = imagePath;
}
function image() {
    const newImage = prompt('請自行输入想合照的完整網址：');
    if (newImage) {
        imageOverlay.src = newImage;
    }
}
// 電腦版拖曳
imageOverlay.addEventListener('mousedown', startDragging);
imageOverlay.addEventListener('mouseup', stopDragging);
imageOverlay.addEventListener('mousemove', dragImage);

// 移動版拖曳
imageOverlay.addEventListener('touchstart', startDragging);
imageOverlay.addEventListener('touchend', stopDragging);
imageOverlay.addEventListener('touchmove', dragImage);
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
        initialScale = parseFloat(getComputedStyle(imageOverlay).transform.split(',')[3].trim());
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
            imageOverlay.style.left = parseFloat(getComputedStyle(imageOverlay).left) + deltaX + 'px';
            imageOverlay.style.top = parseFloat(getComputedStyle(imageOverlay).top) + deltaY + 'px';
            lastX = touch.clientX;
            lastY = touch.clientY;
        } else if (e.touches && e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
            const scale = distance / initialDistance * initialScale;
            imageOverlay.style.transform = `scale(${scale})`;
        } else {
            const deltaX = e.clientX - lastX;
            const deltaY = e.clientY - lastY;
            imageOverlay.style.left = parseFloat(getComputedStyle(imageOverlay).left) + deltaX + 'px';
            imageOverlay.style.top = parseFloat(getComputedStyle(imageOverlay).top) + deltaY + 'px';
            lastX = e.clientX;
            lastY = e.clientY;
        }
    }
}
function captureScreenshot() {
    var videoContainer = document.getElementById('video-container');

    var canvas = document.createElement('canvas');
    canvas.width = videoContainer.offsetWidth;
    canvas.height = videoContainer.offsetHeight;
    var ctx = canvas.getContext('2d');

    ctx.drawImage(videoContainer, 0, 0, canvas.width, canvas.height);

    var link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
