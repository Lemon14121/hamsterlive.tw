<!DOCTYPE HTML>
<html lang="zh-tw">
<head>
    <title>Hamsterlive 來與我們合照吧</title>
	<link rel="icon" href="images/studio.png">
	<meta charset="utf-8" />
	
	<meta name="title" content="Hamsterlive 來與我們合照吧">
	<meta name="description" content="Hamsterlive 來與我們合照吧~">
		
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://hamsterlive.tw/AR.html">
	<meta property="og:title" content="Hamsterlive 來與我們合照吧">
	<meta property="og:description" content="Hamsterlive 來與我們合照吧~">
	<meta property="og:image" content="https://hamsterlive.tw/images/bg-masthead.png">
		
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="https://hamsterlive.tw/AR.html">
	<meta property="twitter:title" content="Hamsterlive 來與我們合照吧">
	<meta property="twitter:description" content="Hamsterlive 來與我們合照吧~">
	<meta property="twitter:image" content="https://hamsterlive.tw/images/bg-masthead.png">
	
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
    <link rel="stylesheet" href="assets/css/main.css"/>
    
</head>
<body class="is-preload">
    <nav id="nav">
        <ul class="">
            <li class="left"><a href="index.html">Hamster Live</a></li>
            <li><a href="vtubers.html">所有成員</a></li>
            <li><a href="join.html">加入流程</a></li>
            <li><a href="#" onclick="downlist()">雷萌工作室</a>
                <ul class="vertical">
                    <li><a href="studio.html" alt="台灣vtuber">雷萌工作室</a></li>
                    <li><a href="secondary_creation_guide.html">二次創作指南</a></li>
                    <li><a href="">合照</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <article>
        <div class="col-12 col-12-large col-12-small" style="background-color: rgb(247, 234, 208);">
            <h6>使用教學 : </h6>
            <h6>1.先授權鏡頭權限才能讀取到鏡頭的畫面</h6>
            <h6>2.等待顯示出鏡頭畫面後點選『一位』想合照的成員</h6>
            <h6>3.調整合拍成員的大小和位置，不限移動次數喔</h6>
            <h6 style="text-indent: -6em;margin-left: 8em;">手機端操作：單指按住鏡頭畫面上的成員可以調整位置；兩指同時觸碰則是縮放成員的大小</h6>
            <h6 style="text-indent: -6em;margin-left: 8em;">電腦端操作：按住鏡頭畫面上的成員移動，然後再放開成員就會跟著游標移動，再按一下就會定位；滑鼠停留在成員身上滾動畫鼠滾輪就可以縮放成員的大小</h6>
            <h6>4.在美好的瞬間按下「下載合照」，就會直接下載到你的裝置的下載位置了喔</h6>
            <h6>特別注意 : 不支援連續大量拍照，如有需求請自行截圖</h6>
        </div>
        <div id="video-container">
            <video id="video-preview" autoplay></video>
            <image id="image-overlay" src="images/Lemon_2.png" alt="AR">
        </div>
        <div class="row">
            <div class="col-12 col-12-large col-12-small"style="display: flex;">
                <div class="circle-button" style="background-image: url('images/Lemon_2.png');" onclick="changeImage('images/Lemon_2.png')"></div>
                <div class="circle-button" style="background-image: url('images/Bear_2.png');" onclick="changeImage('images/Bear_2.png')"></div>
                <div class="circle-button" style="background-image: url('images/Kinro_2.png');" onclick="changeImage('images/Kinro_2.png')"></div>
                <div class="circle-button" style="background-image: url('images/Yan-Yi_2.png');" onclick="changeImage('images/Yan-Yi_2.png')"></div>
                <div class="circle-button" style="background-image: url('images/Xuan_2.png');" onclick="changeImage('images/Xuan_2.png')"></div>
                <div class="circle-button" style="background-image: url('images/meruru_2.png');" onclick="changeImage('images/meruru_2.png')"></div>
                <div class="circle-button" style="background-image: url('images/Tidy-Lusaka_2.png');" onclick="changeImage('images/Tidy-Lusaka_2.png')"></div>
                <div class="circle-button" style="background-image: url('images/CoCo_2.png');" onclick="changeImage('images/CoCo_2.png')"></div>
                <div class="circle-button" style="background-image: url('images/Star-White_2.png');" onclick="changeImage('images/Star-White_2.png')"></div>
            </div>
            <div class="col-12 col-12-large col-12-small">
                <button onclick="captureScreenshot()">下載合照</button>
                <!--<button onclick="image()">更换自己想合照的照片</button>-->
            </div>
        </div>
    </article>

    <!-- Scripts -->
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/jquery.scrolly.min.js"></script>
    <script src="assets/js/browser.min.js"></script>
    <script src="assets/js/breakpoints.min.js"></script>
    <script src="assets/js/util.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/utisl.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/quicklink/2.3.0/quicklink.umd.js"></script>
    <script>
        window.addEventListener('load', () => {
            quicklink.listen();
        });
    </script>
    </body>
</html>
