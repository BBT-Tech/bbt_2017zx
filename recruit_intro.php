<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1,minimum-scale=1,maximum-scale=1">
    <link rel="stylesheet" href="css/recruit_intro.css?<?php echo filemtime("css/recruit_intro.css");?>">
    <link rel="stylesheet" href="lib/animate.css/animate.min.css">
    <script src="lib/axios/dist/axios.min.js"></script>
    <script src="lib/vue/dist/vue.js"></script>
    <title></title>
</head>
<body>
<div id="vm_div">
    <img class="bottom-img" src="img/bottom.png" />
    <transition-group name="fade-in"
                :enter-active-class="fade_in_class"
                :leave-active-class="fade_out_class"
                      mode="in-out">
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


    <span class="left-arrow" v-if="cur_pos>0" @click="goPage(cur_pos-1)"></span>
    <span class="right-arrow" v-if="cur_pos<departments.length-1" @click="goPage(cur_pos+1)"></span>

</div>


<script type="text/javascript">
    var vm=new Vue(
        {
            el: "#vm_div",
            data: {
                departments :[],
                cur_pos:0,
                fade_in_class:'',
                fade_out_class:''
            },
            filters: {

            },
            created: function(){
                axios.get("departments.json")
                    .then(function(response)
                    {
                        vm.departments=response.data.departments;
                    });
            },
            methods: {
                goPage:function(page)
                {
                    if(page<this.cur_pos)
                    {
                        this.fade_in_class='animated fadeInLeft';
                        this.fade_out_class='animated fadeOutRight';
                    }
                    else
                    {

                        this.fade_in_class='animated fadeInRight';
                        this.fade_out_class='animated fadeOutLeft';
                    }
                    this.cur_pos=page;

                }
            }
        }
    );
</script>
</body>
</html>