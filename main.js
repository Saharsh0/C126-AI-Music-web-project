song1 = "";
song2 = "";
wristLX = "";
wristLY = "";
wristRX = "";
wristRY = "";
leftWristScore = 0;
rightWristScore = 0;
song1Status = "";
song2Status = "";
function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("FF0000");
    song1Status = song1.isPlaying;
    console.log(song1Status)
    if(leftWristScore > 0.001)
    {
        circle(wristLX, wristLY, 20);
        if(song1Status == false)
        {
            song2.stop();
            song1.play();
            document.getElementById("song_name").innerHTML = "song name: Harry Potter Theme Song";
        }

    }

    song2Status = song2.isPlaying
    console.log(song2Status)
    if(rightWristScore > 0.001)
    {
        circle(wristRX, wristRY, 20);
        if(song2Status == false)
        {
            song1.stop();
            song2.play();
            document.getElementById("song_name").innerHTML = "song name: Peter Pan Song"
        }
    }
}

function modelLoaded()
{
    console.log("posenet is initialed");
}

function gotPoses(results)
{
    if(results.length > 0)
{
    leftWristScore = results[0].pose.keypoints[9].score
    rightWristScore = results[0].pose.keypoints[10].score

    wristLX = results[0].pose.leftWrist.x
    wristLY = results[0].pose.leftWrist.y
    wristRX = results[0].pose.rightWrist.x
    wristRY = results[0].pose.rightWrist.y
}
}