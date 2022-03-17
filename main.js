song = "";
song2 = "";
song1_status = ""; 
song2_status = "";
score_leftwrist = 0;
score_rightwrist = 0;
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;


function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("lavender-town-music.mp3");
}

function setup(){
    canvas = createCanvas(555, 444);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 555, 444);
    
    song1_status = song1.isPlaying(); 
    song2_status = song2.isPlaying();
    
    fill("#ff000");
    stroke("#ff000");

    if(score_leftwrist > 0.2){
        circle(leftWrist_x, leftWrist_y, 20);
        song2.stop();

        if(song1_status == false) {
            song.play();
            document.getElementById("song").innerHTML = "Playing - Horror Music";
        }
    }

    if(score_rightwrist > 0.2){
        circle(leftWrist_x, leftWrist_y, 20);
        song.stop();

        if(song2_status == false) {
            song.play();
            document.getElementById("song").innerHTML = "Playing - Lavander Town Music"; 
        }
    }
}

function modalLoaded(){
    console.log("fd");
}

function play(){
    song2.play();
    song2.setVolume(0.5);
    song2.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        score_leftwrist = results[0].pose.keypoints[9].score;
        score_rightwrist = results[0].pose.keypoints[10].score;

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("Left Wrist X: " + leftWrist_x + "Left Wrist Y: " + leftWrist_y);

        rightWrist_x = results[0].pose.leftWrist.x;
        rightWrist_y = results[0].pose.leftWrist.y;
        console.log("Right Wrist X: " + rightWrist_x + "Right Wrist Y: " + rightWrist_y);
    }
}