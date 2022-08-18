song = "";
song2 = '';
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;


function preload()
{
    song = loadSound("music1.mp3")
    song2 = loadSound("music2.mp3")
}

function setup()
{
    canvas = createCanvas(700, 700)
    canvas.position(1200, 400)
    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
    song.play();
}

function modelLoaded()
{
    console.log("Model is loaded");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("The left wrist score is " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("The right wrist score is " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x is: " + leftWristX+"and left wrist y is: " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x is: " + rightWristX + "and right wrist y is: " + rightWristY)
    }
}

function draw()
{
    image(video, 0, 0, 700, 700);

    if(scoreLeftWrist > 0.2)
    {

    fill("#ff0000");
    noStroke();
    circle(leftWristX, leftWristY, 20);
    NumberLWY = Number(leftWristY);
    remove_decimals = floor(NumberLWY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }

    if(keyIsDown(32))
    {
        if(song.isPlaying())
        {
            song.stop();
            song2.play();
        }
        else if(song2.isPlaying())
        {
            song2.stop();
            song.play();
        }
    }

    if(scoreRightWrist > 0.2)
    {
        fill("#0000ff");
        noStroke();
        circle(rightWristX, rightWristY, 20);
        
        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <=200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightWristY >200 && rightWristY <=300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5)
        }
        else if(rightWristY > 300 && rightWristY <=400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightWristY > 400 && rightWristY <= 500)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function plays()
{
    if(song.isPlaying() == false)
    {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }
}