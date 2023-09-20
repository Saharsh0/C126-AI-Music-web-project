song = "";
song2 = "";
wristLX = "";
wristLY = "";
wristRX = "";
wristRY = "";
leftWristScore = 0;
song1Status = "";
song2Status = "";
function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSong("music2.mp3")
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
    song1Status = song1.isPlaying()
    if(leftWristScore > 0.2)
    {
        circle(wristLX, wristLY, 20);
        song2.stop();
        if(song1Status == false)
        {
            song1.play();
        }
        else
        {
            document.getElementById("song_name").innerHTML = "song name: Harry Potter Theme Song"
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
    console.log(results);
    leftWristScore = results[0].pose.keypoints[9].score

    wristLX = results[0].pose.leftWrist.x
    wristLY = results[0].pose.leftWrist.y
    wristRX = results[0].pose.rightWrist.x
    wristRY = results[0].pose.rightWrist.y
}
}