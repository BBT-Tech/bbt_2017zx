<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1,minimum-scale=1,maximum-scale=1">
    <link rel="stylesheet" href="css/game.css?<?php echo filemtime("css/game.css");?>">
    <link rel="stylesheet" href="lib/animate.css/animate.min.css">
    <script src="lib/EaselJS/lib/easeljs-0.8.2.min.js"></script>
    <script src="lib/PreloadJS/lib/preloadjs-0.6.2.min.js"></script>
    <script src="js/game.js?<?php echo filemtime("js/game.js");?>"></script>
    <title></title>
</head>
<body onload="init();">
<div>
    <img class="bottom-img" src="game_resource/dibuluobo.png" />
    <div class="description-1-div" id="description-1">
        <img class="description-1-img" src="game_resource/1.png"/>
        <div class="description-1-text-div">
            <p>Hi 这里是百步梯</p>
            <p>想加入我们吗</p>
            <p>先接受梯仔的挑战吧！！</p>
            <p>只是个简单的小游戏啦</p>
            <span class="button green-button">开始</span>
        </div>
    </div>
    <div class="description-2-div" id="description-2">
        <div class="description-2-text-div" >
            <p>点击接住三十秒内落下的所有萝卜哦</p>
            <p>开始啦><</p>
        </div>
    </div>
    <div class="description-3-div" id="description-3">
        <img class="description-3-img" src="game_resource/2.png" id="gameover_img"/>

        <div class="description-3-text-div" id="game_faild">
            <p>你的成绩为<span id="player_score_faild">11</span></p>
            <p>很遗憾没能通过梯仔的挑战> <</p>
            <p>不过别灰心</p>
            <p>这游戏就没打算让人通过啦</p>
            <p>虽然现在已经有<span id="passed_faild">11</span>人通过啦</p>
            <p>大家真是太厉害了> - <</p>
            <p>没过也没关系哦</p>
            <p>别忘了报名才是正事啦</p>
            <a href="#">马上报名 > ></a>
            <a href="#">查看部门介绍 > ></a>
            <p>当然你也可以 <a href="#" onclick="reStartGame();">再次挑战</a></p>
        </div>
        <div class="description-3-text-div" id="game_succeed">
            <p>你的成绩为<span id="player_score_succeed">11</span></p>
            <p>恭喜你通过了梯仔的挑战！！</p>
            <p>天啦噜，太厉害了</p>
            <p>你是第<span id="passed_succeed">11</span>位通过挑战的人</p>
            <p>梯妹对你佩服得五体投地 >-<</p>
            <p>当然也不要太得瑟哟</p>
            <p>别忘了报名才是正事啦</p>
            <p>马上报名加入我们吧 >-<</p>
            <a href="#">马上报名 > ></a>
            <a href="#">查看部门介绍 > ></a>
            <p>当然你也可以 <a href="#" onclick="reStartGame();">再次挑战</a></p>
        </div>
        <div class="description-3-cover-div" id="description-3-cover">

        </div>
    </div>
    <div id="loading" class="loading-div">
        <img class="loading-img roating" src="game_resource/daluobo.png" width="71" height="81"/>
        <span class="loading-text animated infinite bounce">Loading...</span>
    </div>
    <canvas id="gameCanvas"></canvas>
</div>

<script type="text/javascript">
</script>
</body>
</html>