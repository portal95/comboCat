var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
/*---------------------------------------------------------------------*/
//전역변수
var g = -30;
var a = 25;

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
      ctx.strokeStyle = "Red"
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(100, 300, 80, Math.PI * (-1 / 3), Math.PI * (-1 / 3 + me.swing * 1 / 16));
      ctx.stroke();
      me.swing++;
      if(me.swing === 9){
        me.swing = 0;
      }
    }
  },
  hurt: function(){
  },
  draw: function(){
    ctx.fillStyle = "Green";
    ctx.beginPath();
    //x, y, r, startAngle, endAngle, counterClockWise
    ctx.arc(100, 300, 50, 0, Math.PI * 2);
    ctx.fill();
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
  ctx.fillStyle = "White";
  ctx.fillRect(0, 0, 640, 480);
  ctx.strokeStyle = "Black";
  ctx.strokeRect(0, 0, 640, 480);
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
    if (enemy.x < 400){
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
  clear();
  me.draw();
  me.attack();
  enemy.draw();
  combo.draw();
}

setInterval(game,10);
