const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');
var ball_diameter = 20;
var bomb_diameter = 10;
var xpoint;
var ypoint;
var zapperwidth = 6;
var numofbombs = 20;
var bombposX = [];
var bombposY = [];
var bombacceleration = [];
var bombvelocity = [];
var time = 0;
var timeperiod = 0;
var score = 0;
var posX;


function setup(rock) {
    createCanvas(640, 480);

    var temp00 = 0, temp01 = -20;
    while (temp01 < height) {
        temp00 += 0.02;
        temp01 += temp00;
        timeperiod++;
    }
    posX = zapperwidth + 0.5 * ball_diameter - 2;
    xpoint = 0.5 * width;
    ypoint = height - 0.5 * ball_diameter + 1;

    intibombpos();
}
function draw() {
    background(0);

    fill(239, 58, 38);
    rect(0, 0, zapperwidth, height);

    scoreUpdate();

    ellipse(xpoint, ypoint, ball_diameter, ball_diameter);
    xpoint -= 3;

    for (var i = 0; i < numofbombs; i++) {
        ellipse(bombposX[i], bombposX[i], bomb_diameter);
    }

    updatebombpos();

    if (mouseIsPressed && (xpoint + 0.5 * ball_diameter) < width) {
        xpoint += 4;
    }

    if (xpoint < posX || bombCollisionTest) {
        gameover();
    }

    time++;


}

function intibombpos() {
    for (var i = 0; i < numofbombs; i++) {
        bombacceleration[i] = random(0.02, 0.03);
        bombvelocity[i] = random(0, 5);
        bombposX[i] = random(zapperwidth + (0.5 * ball_diameter), width);
        bombposY[i] = random(-20, 0.5 * ball_diameter);
    }
}

function updatebombpos() {

    for (var i = 0; i < numofbombs; i++) {
        bombvelocity += bombacceleration[i];
        bombposY[i] += bombvelocity[i];
    }

    if (time > timeperiod) {
        intibombpos();
        time = 0;
    }

}

function bombCollisionTest() {
    var temp = 0.5 * (ball_diameter * bomb_diameter) - 2;
    var distance;

    for (var i = 0; i < numofbombs; i++) {
        distance = dist(xpoint, ypoint, bombposX[i], bombposY[i]);
        if (distance < temp) {
            return true;
        }
    }
    return false

}
function gameover() {
    fill(255)
    text("GAME OVER", 0.5 * width, 0.5 * height);
    noloop();
}


function scoreUpdate() {
    score += 10;
    fill(255);
    text("SCORE:" + int(score / timeperiod), width - 65, 15);



}