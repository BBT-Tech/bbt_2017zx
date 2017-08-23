/**
 * Created by i on 2017-08-18.
 */
var stage;
var forgiveHat;
var width;
var height;
var objs=new Array;
var score=0;
var scoreLabel;
var loader;
var start_time;
var isGameEnd=false;
var container;
var drop_obj;
var isGameEnded=false;
var records="";
function record(data)
{

    var tmp=((1<<20)^1-1)^(getPlayTime()*100);
    data=data.toString();
    var tt=100000000;
    for(var i=0;i<data.length;i++)
    {
        tt+=(data.charAt(i)*tmp^tmp);
    }
    records+=tt.toString();
}
function getRecord(check)
{
    var where=(1<<8)-1;
    where=where^(check<<3);
    var ret=records.substr(0,where-1)+check+records.substr(where+1,records.length-where);
    console.log(ret.charAt(246));
    return ret;
}
function init(){
    var manifest = [
        {src: "daluobo.png", id: "drop_obj"},
        {src: "background.png", id: "background"},
        {src: "1.png", id: "description_1"},
        {src: "2.png", id: "description_2"},
        {src: "desc_3.png", id: "description_3"}

    ];
    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", onLoaded);
    loader.loadManifest(manifest, true, "game_resource/");


}
function onLoaded()
{
    setTimeout(tmp,2000);
}

function tmp()
{
    var isPlayed=localStorage.played;
    /*console.log(isPlayed);
    console.log(true);*/
    if(isPlayed=='true')//localStorage的坑
    {
        gameInit(false);
        document.getElementById("loading").style.display="none";
        gameReseeResult();
    }
    else
    {
        document.getElementById("loading").style.display="none";
        document.getElementById("description-1").style.display="block";
        document.getElementById("description-1").className+=" animated infinite pulse";
        document.getElementById("description-1").onclick= function () {
            document.getElementById("description-1").style.display="none";
            showDescription2();
        }
    }


}
function showDescription2()
{
    document.getElementById("description-2").style.display="block";
    setTimeout(function(){
        if(document.getElementById("description-2").style.display!='none')
        {
            document.getElementById("description-2").style.display="none";
            gameInit();
        }
    },1000);
    document.getElementById("description-2").onclick= function () {
        document.getElementById("description-2").style.display="none";
        gameInit();
    }
}
function showResult(play_time,pass_count)
{
    document.getElementById("score_display").style.display="none";

    score=play_time;
    var is_succeed;
    if(play_time>=30)
    {
        is_succeed=true;
        score=30;
    }
    else
        is_succeed=false;
    if(is_succeed)
        document.getElementById("game_succeed").style.display="block";
    else
        document.getElementById("game_faild").style.display="block";
    document.getElementById("player_score_faild").innerText=score;
    document.getElementById("player_score_succeed").innerText=score;
    document.getElementById("description-3-cover").style.display="block";
    setTimeout(function(){
        document.getElementById("description-3-cover").style.display="none";

    },2000);
    document.getElementById("description-3").style.display="block";
    document.getElementById("description-3").className+=" animated rollIn";
    isGameEnd=true;
    localStorage.played='true';
    if(localStorage.score!=null && localStorage.score<score)
        localStorage.score=score;
    console.log("game end");
}
function gameEnd()
{
    if(isGameEnded)
        return;
    isGameEnded=true;
    var play_time=getPlayTime();
    var obj=new Object;
    obj.passedRecord=getRecord(play_time>=30?1:0);
    axios.post("game.php",JSON.stringify(obj))
        .then(function(response){
            if(response.data.code==0)
            {
                showResult(play_time,response.data.passedNo);
            }
            else
                alert("看起来您的网络不太好喔...请刷新一下页面");

        })
        .catch(function(err){
            alert("看起来您的网络不太好喔...请刷新一下页面");
        });


}


function gameReseeResult()
{
    axios.get("game.php")
        .then(function(response){
            if(response.data.code==0)
            {

            }
            else
                alert("看起来您的网络不太好喔...请刷新一下页面");

        })
        .catch(function(err){
            alert("看起来您的网络不太好喔...请刷新一下页面");
        });
    showResult(localStorage.score,0);
}
function gameInit(ifStartGame)
{
    if(ifStartGame==null)
        ifStartGame=true;
    isGameEnd=false;
    isGameEnded=false;
    var canvas=document.getElementById("gameCanvas");
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    width=canvas.width;
    height=canvas.height;
    stage=new createjs.Stage("gameCanvas");
    createjs.Touch.enable(stage);
    //stage.enableMouseOver();
    drop_obj=loader.getResult("drop_obj");
    var bg_img=loader.getResult("background");
    var background=new createjs.Shape();
    background.graphics.beginBitmapFill(bg_img).drawRect(0, 0, width, height);
    stage.addChild(background);
    container=new createjs.Container();
    stage.addChild(container);

    if(ifStartGame)
        gameStart();
}
function gameStart()
{
    records="";
    isGameEnd=false;
    isGameEnded=false;
    container.removeAllChildren();
    objs=new Array();
    for(var i=0;i<3;i++)
    {
        addObj(drop_obj);

    }
    for(var i=0;i<2;i++)
    {
        addObj(drop_obj,true);

    }
    scoreLabel = new createjs.Text("您的可爱值：", "16px Arial", "red");
    container.addChild(scoreLabel);
    stage.update();
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.interval=25;
    start_time=(new Date()).getTime();
    document.getElementById("score_display").style.display="block";
    createjs.Ticker.addEventListener("tick", tick);
}
function addObj(drop_obj,isUltraQuick)
{
    if(isUltraQuick==null)
        isUltraQuick=false;
    var obj=new createjs.Bitmap(drop_obj);
    var hit = new createjs.Shape();
    obj.enLarge=1+Math.random()/2;
    obj.setTransform(0,0,obj.enLarge,obj.enLarge);
    obj.width=obj.image.width*obj.enLarge;
    obj.height=obj.image.height*obj.enLarge;
    obj.regX=obj.width/2;
    obj.regY=obj.height/2;
    obj.isUltraQucik=isUltraQuick;
    hit.graphics.beginFill("#000").drawRect(-30,-30,obj.width+30,obj.height+30);
    obj.hitArea=hit;
    obj.on("click", function (event,data) {
        onObjClick(this);
    });
    setShapeInfo(obj);
    container.addChild(obj);
    objs.push(obj)
}
function onObjClick(obj)
{
    if(isGameEnd)
    {
        obj.y=obj.target_y;
    }
    else
    {
        record(obj.x*10000+obj.y);
        setShapeInfo(obj);
    }
}
function tick(event)
{
    var play_time=getPlayTime();
    if(play_time>30)
    {
        //createjs.Ticker.removeAllEventListeners();
        gameEnd();
    }
    else
    {
        var obj_cnt=0;
        if(play_time>20)
            obj_cnt=5+(play_time-20)*3+20;
        else
            obj_cnt=5+play_time;
        if(obj_cnt>50)
            obj_cnt=50;
        if(objs.length<obj_cnt && isGameEnd==false)
            addObj(drop_obj);
    }
    if(objs.length>0)
        updateObjStatus();
    else
    {
        createjs.Ticker.removeAllEventListeners();
        setTimeout(gameEnd,1000);
    }
    var time=0;
    if(isGameEnd)
    {
        scoreLabel.text = "您的可爱值："+score.toFixed(2) + " FPS: "+Math.round(createjs.Ticker.getMeasuredFPS() )+ " 萝卜数： " + objs.length ;
        time=score.toFixed(2);

    }
    else
    {
        scoreLabel.text = "您的可爱值："+getPlayTime().toFixed(2) + " FPS: "+Math.round(createjs.Ticker.getMeasuredFPS() )+ " 萝卜数： " + objs.length ;
        time=getPlayTime().toFixed(2);
    }
    //time=time.toString().split(".");
    document.getElementById("score_display").innerText=time;
    stage.update();

}
function updateObjStatus()
{
    for(var i in objs)
    {
        var shape=objs[i];
        shape.y+=(shape.target_y-shape.source_y)*shape.speed;
        shape.x+=(shape.target_x-shape.source_x)*shape.speed;
/*
        if(shape.rotation_direction==0)
            shape.rotation=(shape.rotation+360*shape.speed*3)%360;
        else
            shape.rotation=(shape.rotation-360*shape.speed*3+360)%360;
*/
        if(shape.y>50)
            shape.speed+=shape.speed*0.005;

        /*if(shape.y<50)
            shape.visible=false;
        else
            shape.visible=true;*/
        if(isGameEnd)
            shape.speed*=1.01;
        if((shape.y-shape.source_y)/(shape.target_y-shape.source_y)>1.2)
        {

            if(isGameEnd)
            {
                objs.splice(i,1);
            }
            else
            {
                gameEnd();
                //score++;
                setShapeInfo(shape);
            }

        }

    }
}
function setShapeInfo(shape)
{
    shape.source_x=Math.random() * width;
    shape.x=shape.source_x;
    shape.source_y=-500*Math.random()-300;
    shape.target_y=height;
    shape.y=shape.source_y;
    shape.target_x=Math.random() * (width-shape.getBounds().width/2);
    shape.rotation=Math.random()*360;
    shape.rotation_direction=Math.round(Math.random());
    var diff=shape.target_x-shape.source_x;

    shape.speed=Math.random()*0.002;
    shape.speed+=0.002;
    if(shape.isUltraQucik && objs.length<15)
        shape.speed*=2;

}
function getPlayTime()
{
    return ((new Date()).getTime()-start_time)/1000;
}
function reStartGame()
{
    createjs.Ticker.removeAllEventListeners();
    container.removeAllChildren();
    document.getElementById("game_succeed").style.display="none";
    document.getElementById("game_faild").style.display="none";

    document.getElementById("description-3").style.display="none";
    document.getElementById("description-3").className="description-3-div";
    stage.update();
    localStorage.played='false';
    setTimeout(gameStart,1000);
}