song="";
LwristX=0;
LwristY=0;
RwristX=0;
RwristY=0;
function preload(){
song=loadSound("music.mp3");
}
function setup(){
canvas=createCanvas(500,500);
canvas.position(400,300);
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelloaded);
poseNet.on('pose',gotposes);
}
function draw(){
image(video, 0,0, 500,500);
fill("#10021f");
stroke("#10021f");
if(scoreLwrist>0.2){
    circle(LwristX,LwristY,20);
    converttonumber=Number(LwristY);
    remove_decimal=floor(converttonumber);
    volume=remove_decimal/500;
    console.log(volume);
    song.setVolume(volume);
    document.getElementById("volume_h3").innerHTML="Volume- "+volume;
}
circle(RwristX,RwristY,20);
}
function play_music(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelloaded(){
    console.log("modelloaded");
}
function gotposes(result){
    if(result.length>0){
        console.log(result);
        LwristX=result[0].pose.leftWrist.x;
        LwristY=result[0].pose.leftWrist.y;
        RwristX=result[0].pose.rightWrist.x;
        RwristY=result[0].pose.rightWrist.y;
        console.log(LwristX+LwristY+RwristX+RwristY);
        scoreLwrist=result[0].pose.keypoints[9].score;
    }
}