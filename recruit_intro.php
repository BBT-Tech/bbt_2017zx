<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1,minimum-scale=1,maximum-scale=1">
    <link rel="stylesheet" href="css/recruit_intro.css?<?php echo filemtime("css/recruit_intro.css");?>">
    <link rel="stylesheet" href="lib/animate.css/animate.min.css">
    <script src="lib/axios/dist/axios.min.js"></script>
    <script src="lib/vue/dist/vue.min.js"></script>
    <title></title>
</head>
<body>
<div id="vm_div" @touchstart="touchstart" @touchend="touchend">
    <img class="bottom-img" src="img/bottom.png" />
    <transition-group name="fade-in"
                :enter-active-class="fade_in_class"
                :leave-active-class="fade_out_class"
                      >
        <div v-for="(department,pos) in departments" v-show="cur_pos==pos" key="'div-'+pos" class="animate-div">
            <div class="head-div" >
                <div class="head-img-div" >
                    <img :src="department.img" />
                </div>
            </div>
            <div class="description" v-html="department.description">
            </div>
            <button class="button" onclick="window.location='recruit.html'">马上报名</button>
            <div class="sitg-div"></div>
        </div>
    </transition-group>


    <span class="left-arrow animated fadeOutLeft infinite" v-if="true || cur_pos>0" @click="goPage(cur_pos-1)"></span>
    <span class="right-arrow animated fadeOutRight infinite" v-if="true || cur_pos<departments.length-1" @click="goPage(cur_pos+1)"></span>
<!-- animated fadeOutLeft infinite
animated fadeOutRight infinite -->
</div>
<script src="js/recruit_intro.js?<?php echo filemtime("js/recruit_intro.js");?>"></script>
</body>
</html>