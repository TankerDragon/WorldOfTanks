//
class InputHandler {
  constructor() {
    this.shoot = false;
    this.keys = [];
    this.tempDirection = { x: 0, y: 0 };
    this.direction = { x: 0, y: 0, normalized: { x: 0, y: 0 } };
    this.mouse = { x: 0, y: 0 };
    this.tempMouse = { x: 0, y: 0 };
    window.addEventListener("keydown", (e) => {
      if ((e.key == "a" || e.key == "d" || e.key == "w" || e.key == "s") && this.keys.indexOf(e.key) == -1) {
        this.keys.push(e.key);
      }
      //   console.log(e.key, this.keys);
    });
    window.addEventListener("keyup", (e) => {
      if (e.key == "a" || e.key == "d" || e.key == "w" || e.key == "s") {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
      //   console.log(e.key, this.keys);
    });
    window.onmousemove = (e) => {
      this.tempMouse.x = e.clientX;
      this.tempMouse.y = e.clientY;
    };
    window.onmousedown = (e) => {
      this.shoot = true;
    };
    window.onmouseup = (e) => {
      this.shoot = false;
    };
  }
  update(focus) {
    this.mouse.x = this.tempMouse.x - focus.x;
    this.mouse.y = this.tempMouse.y - focus.y;

    var left = this.keys.includes("a");
    var right = this.keys.includes("d");
    var up = this.keys.includes("w");
    var down = this.keys.includes("s");

    this.tempDirection.x = left && right ? 0 : left ? -1 : right ? 1 : 0;
    this.tempDirection.y = up && down ? 0 : up ? -1 : down ? 1 : 0;

    // this.direction2.x = left && right ? 0 : left ? -1 : right ? 1 : 0;
    // this.direction2.y = up && down ? 0 : up ? -1 : down ? 1 : 0;

    if (this.direction.x != 0 && this.direction.y != 0) {
      this.direction.normalized.x = this.direction.x * Math.SQRT1_2;
      this.direction.normalized.y = this.direction.y * Math.SQRT1_2;
    } else {
      this.direction.normalized.x = this.direction.x;
      this.direction.normalized.y = this.direction.y;
    }
    // console.log(this.direction.normalized);
  }
}

///
class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.speed = 500;
    this.alpha = 0;
    this.velocity = { x: 0, y: 0 };
    this.reloadTime = 400;
    this.isReloaded = false;
    //
    setInterval(() => {
      this.isReloaded = true;
    }, this.reloadTime);
  }

  update(input) {
    var dy = input.mouse.y - this.y;
    var dx = input.mouse.x - this.x;

    if (input.mouse.x < this.x) {
      this.alpha = Math.atan(dy / dx) + Math.PI;
    } else {
      this.alpha = Math.atan(dy / dx);
    }
    this.velocity.x = this.speed * input.direction.normalized.x;
    this.velocity.y = this.speed * input.direction.normalized.y;

    this.x += Math.round(this.velocity.x * (1 / FPS));
    this.y += Math.round(this.velocity.y * (1 / FPS));
  }
  draw(context, focus) {
    ctx.strokeStyle = "#0362fc";
    ctx.lineWidth = 5;

    context.beginPath();
    context.arc(this.x + focus.x, this.y + focus.y, 50, 0, 2 * Math.PI);
    context.moveTo(this.x + focus.x, this.y + focus.y);
    context.lineTo(Math.cos(this.alpha) * 50 + this.x + focus.x, Math.sin(this.alpha) * 50 + this.y + focus.y);
    context.stroke();
  }
}
///
class Enemy {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.speed = 500;
    this.alpha = 0;
    this.velocity = { x: 0, y: 0 };
    this.username = "";
    this.direction = { x: 0, y: 0 };
  }

  update() {
    this.velocity.x = this.speed * this.direction.x;
    this.velocity.y = this.speed * this.direction.y;

    this.x += Math.round(this.velocity.x * (1 / FPS));
    this.y += Math.round(this.velocity.y * (1 / FPS));
  }
  draw(context, focus) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;

    context.beginPath();
    context.arc(this.x + focus.x, this.y + focus.y, 50, 0, 2 * Math.PI);
    context.moveTo(this.x + focus.x, this.y + focus.y);
    context.lineTo(Math.cos(this.alpha) * 50 + this.x + focus.x, Math.sin(this.alpha) * 50 + this.y + focus.y);
    context.stroke();
  }
}
///
class Bullet {
  constructor(x, y, mx, my) {
    // this.target = { x: input.mouse.x, y: input.mouse.y };
    this.is_active = true;
    this.x = x;
    this.y = y;
    this.speed = 1500;
    let dx = mx - x,
      dy = my - y;
    let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    this.velocity = { x: this.speed * (dx / distance), y: this.speed * (dy / distance) };
  }
  update() {
    this.x += this.velocity.x * (1 / FPS);
    this.y += this.velocity.y * (1 / FPS);
  }
  draw(context, focus) {
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 3;

    context.beginPath();
    context.arc(this.x + focus.x, this.y + focus.y, 5, 0, 2 * Math.PI);
    context.stroke();
  }
}
////
class TileMap {
  constructor() {
    this.w = 500;
    this.h = 500;
    //
  }
  draw(ctx, focus) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.rect(focus.x, focus.y, this.w, this.h);
    ctx.stroke();
  }
}
///
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player();
    this.enemies = [new Enemy()];
    this.input = new InputHandler();
    this.bullets = [];
    this.tileMap = new TileMap();
    this.focus = { x: 500, y: 0 };
  }
  update() {
    this.input.update(this.focus);
    this.player.update(this.input);
    this.enemies[0].update();

    if (this.player.x < 0) {
      this.player.x = 0;
    } else if (this.player.x > this.tileMap.w) {
      this.player.x = this.tileMap.w;
    }
    if (this.player.y < 0) {
      this.player.y = 0;
    } else if (this.player.y > this.tileMap.h) {
      this.player.y = this.tileMap.h;
    }

    if (this.input.shoot && this.player.isReloaded) {
      this.player.isReloaded = false;
      this.bullets.push(new Bullet(this.player.x, this.player.y, this.input.mouse.x, this.input.mouse.y));
    }
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();
    }
    //console.log(this.bullets);
    //focusing center of window (focusing players coordinates)
    this.focus.x = this.width / 2 - this.player.x;
    this.focus.y = this.height / 2 - this.player.y;
    //<<
  }
  updateData(data) {
    this.player.x = data.coodX;
    this.player.y = data.coodY;
    this.input.direction.x = data.h;
    this.input.direction.y = data.v;

    this.enemies[0].x = data.enemies[0].coodX;
    this.enemies[0].y = data.enemies[0].coodY;
    this.enemies[0].direction.x = data.enemies[0].h;
    this.enemies[0].direction.y = data.enemies[0].v;
  }
  draw(context) {
    this.tileMap.draw(context, this.focus);
    this.player.draw(context, this.focus);
    this.enemies[0].draw(context, this.focus);
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(context, this.focus);
    }
  }
}

const FPS = 60; // Frames per second
const RPS = 10; // Request per second
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const game = new Game(canvas.width, canvas.height);

function animate() {
  game.update();
  game.draw(ctx);
}
setInterval(animate, Math.round(1000 / FPS));

//
serverInterval = setInterval(server, Math.round(1000 / RPS));

function getCSRF() {
  arr = document.getElementById("csrf").innerHTML.split("value");
  arr = arr[1].split('"');
  return arr[1];
}

function server() {
  fetch("/update/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRF(),
    },
    body: JSON.stringify({
      h: game.input.tempDirection.x,
      v: game.input.tempDirection.y,
    }),
  })
    .catch((data) => {
      stopServerInterval();
      console.log("!!!ERROR!!!: ", data);
      // window.alert("ERROR occured!");
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("json data: ", data);
      game.updateData(data);
    });
}
function stopServerInterval() {
  clearInterval(serverInterval);
}

function get() {
  fetch("/gameAPI/")
    .then((res) => res.json())
    .then((data) => {
      console.log("json data: ", data.status);
      game.tileMap.w = data.map.w;
      game.tileMap.h = data.map.h;
    });
}
get();
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// function loop() {
//     // Drawing Background
//     ctx.fillStyle = 'red';
//     ctx.arc(95,50,40,0,2*Math.PI);
//     // Drawing Cells
//     for (let i = 0; i < cell_num; i++) {
//         ctx.fillStyle = cells[i].col;
//         ctx.beginPath();
//         ctx.arc(cells[i].x, cells[i].y, cells[i].r, 0, Math.PI * 2);
//         ctx.fill();

//         cells[i].x += cells[i].xv/FPS;
//         cells[i].y += cells[i].yv/FPS;

//         if (cells[i].x < 0 || cells[i].x > canvas.width) {
//             cells[i].xv = -cells[i].xv;
//         }
//         if (cells[i].y < 0 || cells[i].y > canvas.height) {
//             cells[i].yv = -cells[i].yv;
//         }
//     }

//     //Drawing Viruses
//     for (let i = 0; i < virus_num; i++) {
//         ctx.fillStyle = viruses[i].col;
//         ctx.beginPath();
//         ctx.arc(viruses[i].x, viruses[i].y, viruses[i].r, 0, Math.PI * 2);
//         ctx.fill();

//         viruses[i].x += viruses[i].xv/FPS;
//         viruses[i].y += viruses[i].yv/FPS;

//         if (viruses[i].x < 0 || viruses[i].x > canvas.width) {
//             viruses[i].xv = -viruses[i].xv;
//         }
//         if (viruses[i].y < 0 || viruses[i].y > canvas.height) {
//             viruses[i].yv = -viruses[i].yv;
//         }

//         if(viruses[i].linked_to == null) {
//             for (let j = 0; j < cell_num; j++) {
//                 if(Math.sqrt(Math.pow((cells[j].x - viruses[i].x),2) + Math.pow((cells[j].y - viruses[i].y),2)) < virus_eye) {
//                     choices.push(j);
//                 }
//             }
//             if(choices != []) {
//                 viruses[i].linked_to = choices[Math.floor(choices.length * Math.random())]; //Math.floor(Math.random() * 10)
//                 console.log(choices[Math.floor(choices.length * Math.random())]);
//             }
//             choices = [];
//             //arr[i].update(arr[j].x, arr[j].y);
//         }
//         if(viruses[i].linked_to != null) {
//             if(Math.sqrt(Math.pow((cells[viruses[i].linked_to].x - viruses[i].x),2) + Math.pow((cells[viruses[i].linked_to].y - viruses[i].y),2)) < virus_eye) {
//                 viruses[i].update();
//             } else {
//                 viruses[i].linked_to = null;
//             }

//         }
//     }
// }

// setInterval(loop, Math.round(1000 / FPS));

// ctx.strokeStyle = '#ff0000';
// ctx.lineWidth = 5;
// drawPlayer(500,100);
