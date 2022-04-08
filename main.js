    scoreRightWrist = 0;
    scoreLeftWrist = 0;
    song = "";
    rightWristx = 0;
    leftWristx = 0
    rightWristy = 0;
    leftWristy = 0

    function preload() {
        song = loadSound("music.mp3");
    }

    function setup() {
        canvas = createCanvas(500, 400);
        canvas.center();
        video = createCapture(VIDEO);
        video.hide();

        poseNet = ml5.poseNet(video, modelLoaded);
        poseNet.on("pose", gotPoses);
    }

    function modelLoaded() {
        console.log("ModelLoaded!");
    }

    function gotPoses(results) {
        if (results.length > 0) {
            console.log(results);

            rightWristx = results[0].pose.rightWrist.x;
            rightWristy = results[0].pose.rightWrist.y;
            console.log("rightwristx = " + rightWristx + "rightwristy = " + rightWristy);

            leftWristx = results[0].pose.leftWrist.x;
            leftWristy = results[0].pose.leftWrist.y;
            console.log("leftwristx = " + leftWristx + "leftwristy = " + leftWristy);

            scoreLeftWrist = results[0].pose.keypoints[9].score;
            scoreRightWrist = results[0].pose.keypoints[10].score;
        }
    }

    function draw() {
        image(video, 0, 0, 600, 500);
        fill("red");
        stroke("red");

        if (scoreLeftWrist > 0.03) {
            circle(leftWristx, leftWristy, 20);
            inNumberLeftWristy = Number(leftWristy);
            remove_decimals = floor(inNumberLeftWristy);
            console.log(inNumberLeftWristy + "," + remove_decimals);
            volume = remove_decimals / 500;
            song.setVolume(volume);
            document.getElementById("volume").innerHTML = "Volume" + volume;

        }

        if (scoreRightWrist > 0.03) {
            circle(rightWristx, rightWristy, 20);

            if (rightWristy > 0 && rightWristy <= 100) {
                document.getElementById("speed").innerHTML = "Speed = 0.5x";
                song.rate(0.5);
            } else if (rightWristy > 100 && rightWristy <= 200) {
                document.getElementById("speed").innerHTML = "Speed = 1x";
                song.rate(1);
            } else if (rightWristy > 200 && rightWristy <= 300) {
                document.getElementById("speed").innerHTML = "Speed = 1.5x";
                song.rate(1.5);
            } else if (rightWristy > 300 && rightWristy <= 400) {
                document.getElementById("speed").innerHTML = "Speed = 2x";
                song.rate(2);
            } else if (rightWristy > 400 && rightWristy <= 500) {
                document.getElementById("speed").innerHTML = "Speed = 2.5x";
                song.rate(2.5);
            }
        }



    }

    function play() {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }