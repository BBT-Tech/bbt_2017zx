/**
 * Created by i on 2017-08-23.
 */
if(localStorage.played!='true')
    window.location="luobo.php";
var vm=new Vue(
    {
        el: "#vm_div",
        data: {
            departments :[],
            cur_pos:0,
            fade_in_class:'',
            fade_out_class:'',
            touch_x:0,
            touch_y:0
        },
        filters: {

        },
        created: function(){
            axios.get("intro.php")
                .then(function(response)
                {
                    if(response.data.code==0)
                        vm.departments=response.data.departments;
                    else
                        alert("看起来您的网络不太好喔...请刷新一下页面");
                })
                .catch(function(err){
                    alert("看起来您的网络不太好喔...请刷新一下页面");
                });

        },
        methods: {
            goPage:function(page)
            {
                if(page<0)
                {
                    page=this.departments.length-1;
                    this.fade_in_class='animated fadeInLeft';
                    this.fade_out_class='animated fadeOutRight';
                }
                else
                if(page>=this.departments.length)
                {
                    page=0;
                    this.fade_in_class='animated fadeInRight';
                    this.fade_out_class='animated fadeOutLeft';
                }
                else
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
                }

                this.cur_pos=page;

            },
            touchstart:function(e)
            {
                this.touch_x= e.changedTouches[0].clientX;
                this.touch_y= e.changedTouches[0].clientY;


            },
            touchend:function(e)
            {
                var touch_x= e.changedTouches[0].clientX;
                var touch_y= e.changedTouches[0].clientY;
                var diff_x=touch_x-this.touch_x;
                var diff_y=touch_y-this.touch_y;
                if(Math.abs(diff_x)>Math.abs(diff_y))
                {
                    if(diff_x>0)
                        this.goPage(this.cur_pos-1);
                    else
                        this.goPage(this.cur_pos+1);
                    e.preventDefault();
                }



            }
        }
    }
);