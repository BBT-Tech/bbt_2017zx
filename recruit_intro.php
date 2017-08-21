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
<div id="vm_div">
    <img class="bottom-img" src="img/bottom.png" />
    <div class="head-div">
        <div class="head-img-div">
            <img :src="cur_head_img" />
        </div>
    </div>
    <span class="left-arrow" v-if="cur_pos>0 || true" @click="goPage(cur_pos-1)"></span>
    <span class="right-arrow" v-if="cur_pos<apartments-1 || true" @click="goPage(cur_pos+1)"></span>
    <div class="description" v-html="cur_description">
    </div>
    <button class="button">马上报名</button>
</div>


<script type="text/javascript">
    var vm=new Vue(
        {
            el: "#vm_div",
            data: {
                apartments :[],
                cur_head_img:"img/word/技术部.png",
                cur_pos:0,
                cur_description:'<p>“厚德”一词典出 周易：“地势坤，君子以厚德载物”。郑玄注《周礼•地官•师氏》云：“德行，内外之称，在心为德，施之为行。”“德” 包括思想修养和行为规范两个方面。</p>' +
                '<p> “自强不息”出自 周易：“天行健，君子以自强不息”。意为自觉地奋发图强，积极向上，永不懈怠。“自强不息”浓缩了华南理工大学艰苦奋斗、砥砺前行的办学历程，展示了华南理工人自立自强、乐观向上的积极态度。</p>'
            },
            filters: {

            },
            created: function(){
                axios.get("")
                    .then(function(response)
                    {
                        vm.apartments=response.data.apartments;
                    });
            },
            methods: {
                goPage:function(page)
                {
                    this.cur_pos=page;
                    this.cur_description=this.apartments[page].description;
                }
            }
        }
    );
</script>
</body>
</html>