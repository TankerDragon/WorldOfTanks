//
class InputHandler {
  constructor() {
    this.keys = [];
    this.mouse = { x: 0, y: 0 };
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
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    };
  }
}
///
class Player {
  constructor(game) {
    this.x = 100;
    this.y = 100;
    this.speed = 100;
    this.alpha = 0;
    this.game = game;
  }

  update(input) {
    var dy = input.mouse.y - this.y;
    var dx = input.mouse.x - this.x;
    console.log(dx, dy);
    if (input.mouse.x < this.x) {
      this.alpha = Math.atan(dy / dx) + Math.PI;
    } else {
      this.alpha = Math.atan(dy / dx);
    }
    if (input.keys.includes("a")) this.x--;
    else if (input.keys.includes("d")) this.x++;
    if (input.keys.includes("w")) this.y--;
    else if (input.keys.includes("s")) this.y++;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, 50, 0, 2 * Math.PI);
    context.moveTo(this.x, this.y);
    context.lineTo(Math.cos(this.alpha) * 50 + this.x, Math.sin(this.alpha) * 50 + this.y);
    context.stroke();
  }
}
///
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new InputHandler();
  }
  update() {
    this.player.update(this.input);
  }
  draw(context) {
    this.player.draw(context);
  }
}

const FPS = 60;
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

ctx.strokeStyle = "#ff0000";
ctx.lineWidth = 5;
const game = new Game(canvas.width, canvas.height);

function animate() {
  game.update();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.draw(ctx);
}
setInterval(animate, Math.round(1000 / FPS));
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
