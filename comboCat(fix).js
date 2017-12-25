//comboCat(fix)
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//
var g = -30;
var a = 25;
var b = 10;
//----------------------------------------------------------
function reset(){
  g = -30;
  a = 25;
  b = 10;
  attack = false;
  me.y = 0;
  me.hp = 5;
  me.hit = false;
  me.miss = false;
  me.hurt = false;
  me.hurtCount = 0;
  me.swing = 0;
  enemy.type = "Basic";
  enemy.hit = false;
  enemy.x = 710;
  enemy.y = 390;
  combo.count = 0;
  combo.showType = "none";
  combo.showTime = 0;
}
//Image load
var backGround = new Image();
backGround.src = "backGround.png";

var comboCat = [];
comboCat[0] = new Image();
comboCat[1] = new Image();
comboCat[2] = new Image();
comboCat[3] = new Image();
comboCat[4] = new Image();

comboCat[0].src = "comboCatBasic.png";
comboCat[1].src = "attack1.png";
comboCat[2].src = "attack2.png";
comboCat[3].src = "attack3.png";
comboCat[4].src = "hurt.png";
//----------------------------------------------------------
//key event handlers
addEventListener('keydown',keyDownHandler,false);
addEventListener('keyup',keyUpHandler,false);

function keyDownHandler(e) {
  var code = e.keyCode;
  switch(code) {
    case 32://space
      if(gameStart){
        attack = true;
      }
      gameStart = true;
      break;
  }
}

function keyUpHandler(e) {
}

var btn = document.getElementById("space");
btn.onclick = function() {
  if(gameStart){
    attack = true;
  }
  gameStart = true;
}

//Keys
var attack = false;
var gameStart = false;
//----------------------------------------------------------
//objects
var me = {
  y: 0,
  hp: 5,
  hit: false,
  miss: false,
  hurt: false,
  hurtCount: 0,
  swing: 0,
  attack: function(){
    if(attack) {
      if ((enemy.x > 250) && (me.hit === false)) {
        me.miss = true;
      } else if ((enemy.x <= 250) && (enemy.x >= 170) && (enemy.y > 280) && (me.hit === false)){
        me.hit = true;
        combo.count++;
      }
      attack = false;
      me.swing = 1;
    }
    if((me.swing >= 1) && (me.hurt === false)){
      if(me.swing === 1){
        ctx.drawImage(comboCat[0], 0, 0);
      } else if(me.swing === 2){
        ctx.drawImage(comboCat[1], 0, 0);
      } else if(me.swing === 3){
        ctx.drawImage(comboCat[2], 0, 0);
      } else if(me.swing === 4){
        ctx.drawImage(comboCat[3], 0, 0);
      } else if(me.swing === 5){
        ctx.drawImage(comboCat[3], 0, 0);
      } else if(me.swing === 6){
        ctx.drawImage(comboCat[2], 0, 0);
      } else if(me.swing === 7){
        ctx.drawImage(comboCat[1], 0, 0);
      } else {
        ctx.drawImage(comboCat[0], 0, 0);
      }
      me.swing++;
      if(me.swing === 8){
        me.swing = 0;
      }
    }
  },
  draw: function(){
    if(enemy.x === 170){
      me.hurt = true;
      me.hp --;
    }
    if(me.hurtCount === 35){
      me.hurt = false;
      me.y = 0;
      b = 10;
      me.hurtCount = 0;
    }
    if(me.hurt === true){
      ctx.drawImage(comboCat[4], 0, me.y);
      me.y -= b;
      b -= 2 / 3
      me.hurtCount ++;
    }
    if((me.swing === 0) && (me.hurt === false)){
      ctx.drawImage(comboCat[0], 0, 0);
    }
  }
};

var enemy = {
  type:"Basic",
  hit: false,
  x:710,
  y:390,
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
    enemy.y = 390;
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
    enemy.y = 390;
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
    if ((enemy.x < 470) && (a !== -26)){
      enemy.y -= a;
      a -= 1;
    }
  }
}

var combo = {
  count: 0,
  showType:"none",
  showTime:0,
  draw: function(){
    if(enemy.x === 170){
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
//-------------------------------------------------
function clear() {
  ctx.drawImage(backGround, 0, 0);
}
//-------------------------------------------------
function game() {
  clear();
  ctx.font = "50px Comic Sans MS";
  ctx.fillStyle = "Red";
  ctx.textAlign = "center";
  ctx.fillText("-PRESS SPACE TO START-", canvas.width/2, canvas.height/2)

  if(gameStart){
    if (me.hp === 0){
      reset();
    }
    clear();
    me.draw();
    me.attack();
    enemy.draw();
    combo.draw();
  }
  if(me.hp === 0){
    gameStart = false;
    clear();
    ctx.font = "50px Comic Sans MS";
    ctx.fillStyle = "Red";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER... replay?", canvas.width/2, canvas.height/2)
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("-PRESS SPACE TO RESTART-", canvas.width/2, canvas.height/3 * 2)
  }
}

setInterval(game,10);
