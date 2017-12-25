var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
/*---------------------------------------------------------------------*/
//전역변수
var g = -30; // gravity
var a = 25; // enemyJumper
//이미지 로더
var loader = [false, false, false, false, false];
var backGround = new Image();
backGround.src = "backGround.png";
backGround.onload = function(){
  loader[0] = true;
}
var comboCat = new Image();
comboCat.src = "comboCatBasic.png";
comboCat.onload = function(){
  loader[1] = true;
}
var attackOne = new Image();
attackOne.src = "attack1.png";
attackOne.onload = function(){
  loader[2] = true;
}
var attackTwo = new Image();
attackTwo.src = "attack2.png";
attackTwo.onload = function(){
  loader[3] = true;
}
var attackThree = new Image();
attackThree.src = "attack3.png";
attackThree.onload = function(){
  loader[4] = true;
}


//OBJECTS
var me = {
  hp: 5,
  hit: false,
  miss: false,
  swing: 0,
  attack: function(){
    if(attack) {
      if ((enemy.x > 220) && (me.hit === false)) {
        me.miss = true;
      } else if ((enemy.x <= 220) && (enemy.x >= 130) && (enemy.y > 230) && (me.hit === false)){
        me.hit = true;
        combo.count++;
      }
      attack = false;
      me.swing = 1;
    }
    if(me.swing >= 1){
      if(me.swing < 2){
        ctx.drawImage(comboCat, 0, 0);
      } else if(me.swing < 4){
        ctx.drawImage(attack1, 0, 0);
      } else if(me.swing < 6){
        ctx.drawImage(attack2, 0, 0);
      } else {
        ctx.drawImage(attack3, 0, 0);
      }
      me.swing++;
      if(me.swing === 9){
        me.swing = 0;
      }
    }
  },
  hurt: function(){
  },
  draw: function(){
    if(me.swing === 0){
      ctx.drawImage(comboCat, 0, 0);
    }
  }
};

var combo = {
  count: 0,
  showType:"none",
  showTime:0,
  draw: function(){
    if(enemy.x === 110){
      me.miss = true;
    }
    if(me.miss){
      combo.count = 0;
      combo.showType = "miss";
      me.miss = false;
    }
    if(combo.showType === "miss"){
      ctx.font = "50px Comic Sans MS";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("MISS", canvas.width/2, canvas.height/2)
      combo.showTime++;
      if(combo.showTime === 10) {
        combo.showTime = 0;
        combo.showType = "none"
      }
    }
    if(me.hit){
      combo.showType = "hit";
      me.hit = false;
    }
    if(combo.showType === "hit"){
      ctx.font = "50px Comic Sans MS";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("COMBO " + combo.count + " !!!", canvas.width/2, canvas.height/2)
      combo.showTime++;
      if(combo.showTime === 35) {
        combo.showTime = 0;
        combo.showType = "none"
      }
    }
  }
};

var enemy = {
  type:"Basic",
  hit: false,
  x:710,
  y:300,
  change: function(){
    var n = Math.floor(2 * Math.random())
    switch(n) {
      case 0://space
        enemy.type = "Basic";
        break;
      case 1:
        enemy.type = "Jumper"
    }
  },
  draw: function(){
    switch(enemy.type){
      case "Basic":
        drawBasic();
        break;
      case "Jumper":
        drawJumper();
        break;
    };
  }
};
/*---------------------------------------------------------------------*/
//DRAWING FUNCTIONS
function clear() {
  ctx.drawImage(backGround, 0, 0);
}

function drawBasic() {
  if(me.hit){
    enemy.hit = true;
  }
  ctx.fillStyle = "Blue";
  ctx.beginPath();
  //x, y, r, startAngle, endAngle, counterClockWise
  ctx.arc(enemy.x, enemy.y, 50, 0, Math.PI * 2);
  ctx.fill();
  if(enemy.x > 710 || enemy.x <= -100){
    enemy.hit = false;
    enemy.x = 710;
    enemy.y = 300;
    g = -30;
    enemy.change();
  }
  if(enemy.hit === true){
    enemy.x += 10;
    enemy.y += g;
    g += 5;
  } else {
    enemy.x -= 5;
  }
}

function drawJumper() {
  if(me.hit){
    enemy.hit = true;
  }
  ctx.fillStyle = "Blue";
  ctx.beginPath();
  //x, y, r, startAngle, endAngle, counterClockWise
  ctx.arc(enemy.x, enemy.y, 50, 0, Math.PI * 2);
  ctx.fill();
  if(enemy.x > 710 || enemy.x <= -100){
    enemy.hit = false;
    enemy.x = 710;
    enemy.y = 300;
    g = -30;
    a = 25;
    enemy.change();
  }
  if(enemy.hit === true){
    enemy.x += 10;
    enemy.y += g;
    g += 5;
  } else {
    enemy.x -= 5;
    if (enemy.x < 420){
      enemy.y -= a;
      a -= 1;
    }
  }
}
/*---------------------------------------------------------------------*/
//Key handlers
addEventListener('keydown',keyDownHandler,false);
addEventListener('keyup',keyUpHandler,false);

function keyDownHandler(e) {
  var code = e.keyCode;
  switch(code) {
    case 32://space
      attack = true;
      break;
  }
}

function keyUpHandler(e) {
}

//Keys
var attack = false;
/*---------------------------------------------------------------------*/
//Game running
function game() {
  loadCheck();
  clear();
  me.draw();
  me.attack();
  enemy.draw();
  combo.draw();
  requestAnimationFrame(game);
}
function loadCheck(){
  for(var i = 0; i < loader.length; i++){
    if(loader[i] === false){
    }
  }
  for(var i = 0; i < loader.length;){
    if(loader[i] === true){
      i++;
    }
  }
}

requestAnimationFrame(game);
