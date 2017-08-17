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
function init(){
    var manifest = [
        {src: "xiaoluobo.png", id: "drop_obj"},
        {src: "background.png", id: "background"}
    ];
    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", onLoaded);
    loader.loadManifest(manifest, true, "game_resource/");


}
function onLoaded()
{
    setTimeout(tmp,1000);
}

function tmp()
{
    document.getElementById("loading").style.display="none";
    document.getElementById("description-1").style.display="block";
    document.getElementById("description-1").className+=" animated infinite pulse";
    document.getElementById("description-1").onclick= function () {
        document.getElementById("description-1").style.display="none";
        showDescription2();
    }
}
function showDescription2()
{
    document.getElementById("description-2").style.display="block";
    document.getElementById("description-2").onclick= function () {
        document.getElementById("description-2").style.display="none";
        gameStart();
    }
}
function gameStart()
{
    var canvas=document.getElementById("gameCanvas");
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    width=canvas.width;
    height=canvas.height;
    stage=new createjs.Stage("gameCanvas");
    createjs.Touch.enable(stage);
    //stage.enableMouseOver();
    var drop_obj=loader.getResult("drop_obj");
    var bg_img=loader.getResult("background");
    var background=new createjs.Shape();
    background.graphics.beginBitmapFill(bg_img).drawRect(0, 0, width, height);
    stage.addChild(background);
    var container=new createjs.Container();
    stage.addChild(container);
    for(var i=0;i<10;i++)
    {

        var obj=new createjs.Bitmap(drop_obj);
        var hit = new createjs.Shape();
        obj.enLarge=1.5+Math.random()/2;
        obj.setTransform(0,0,obj.enLarge,obj.enLarge);
        hit.graphics.beginFill("#000").drawRect(-10-(obj.image.width*(obj.enLarge-1)), -10-(obj.image.height*(obj.enLarge-1)), obj.image.width*obj.enLarge+10 , obj.image.width*obj.enLarge+10);
        obj.hitArea=hit;
        //forgiveHat.setTransform(0,0,0.1,0.1);

        obj.on("click", function (event,data) {
            setShapeInfo(this);
        });
        setShapeInfo(obj);
        container.addChild(obj);
        objs.push(obj)
    }


    scoreLabel = new createjs.Text("您的可爱值：", "bold 30px Arial", "red");
    container.addChild(scoreLabel);
    stage.update();
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    start_time=(new Date()).getTime();
    createjs.Ticker.addEventListener("tick", tick);
}
function tick(event)
{
    if(((new Date()).getTime()-start_time)/1000>30)
    {
        createjs.Ticker.removeAllEventListeners();
        alert("游戏结束！您的不可爱值为："+score+"!");
        window.location.reload();
        return;
    }
    updateObjStatus();
    scoreLabel.text = "您的不可爱值："+score;

    stage.update();

}
function updateObjStatus()
{
    for(var i in objs)
    {
        var shape=objs[i];
        shape.y+=(shape.target_y-shape.source_y)*shape.speed;
        shape.x+=(shape.target_x-shape.source_x)*shape.speed;
        if(shape.y<50)
            shape.visible=false;
        else
            shape.visible=true;
        if((shape.y-shape.source_y)/(shape.target_y-shape.source_y)>1.2)
        {
            score++;
            setShapeInfo(shape);
        }

    }
}
function setShapeInfo(shape)
{
    shape.source_x=Math.floor(Math.random()*3) * width/3;
    shape.x=shape.source_x;
    shape.source_y=-500*Math.random()-100;
    shape.target_y=height;
    shape.y=shape.source_y;
    shape.target_x=Math.random() * (width-shape.getBounds().width/2);
    shape.rotation=Math.random()*360;
    var diff=shape.target_x-shape.source_x;

    shape.speed=Math.random()*0.015;
    if(shape.speed<0.005)
        shape.speed=0.005;
}