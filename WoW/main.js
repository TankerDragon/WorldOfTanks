//
class InputHandler {
  constructor() {
    this.wheel = 0;
    this.shoot = false;
    this.keys = [];
    this.direction = { x: 0, y: 0, normalized: { x: 0, y: 0 } };
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
    window.onmousedown = (e) => {
      this.shoot = true;
    };
    window.onmouseup = (e) => {
      this.shoot = false;
    };
    window.onwheel = (e) => {
      this.wheel = -e.deltaY;
      // console.log(e.deltaY);
    } 
  }
  update() {
    var left = this.keys.includes("a");
    var right = this.keys.includes("d");
    var up = this.keys.includes("w");
    var down = this.keys.includes("s");

    this.direction.x = left && right ? 0 : left ? -1 : right ? 1 : 0;
    this.direction.y = up && down ? 0 : up ? -1 : down ? 1 : 0;

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
class TileMap {
  constructor (hA) {
    this.hexA = hA;
    this.is_zoomed = true;
    this.image = {
      file: document.getElementById("tileMap"),
      w: 128,
      h: 128
  };
     
  } // length of one side of hexagon
  zoomChange(a) {
    this.hexA += a;
    if (this.hexA < 10) {
      this.hexA = 10;
    } else {
      this.is_zoomed = true;
    }
  }
  draw(context, WinWidth, WinHeight) {
    if(this.is_zoomed) {
      context.strokeStyle = "#fff5d4";
      context.lineWidth = this.hexA/20;
      var is_even = true;
      for(let h = 0; h <= WinHeight; h+= this.hexA * (Math.sqrt(3)/2)) {
        for(let w = 0; w <= WinWidth; w += 3*this.hexA) {
          context.beginPath();
          if(is_even) {
            // context.arc(w, h, 5, 0, 2 * Math.PI);
            // drawImage(image, sx, sy, sw, sh, tx, ty, tw, th)

            context.drawImage(this.image.file, 0, 0, this.image.w, this.image.h, w-this.hexA, h - this.hexA * (Math.sqrt(3)/2), 2*this.hexA, 2*this.hexA * (Math.sqrt(3)/2));
            context.ellipse(w, h, 10, 5, 0, 0, 2 * Math.PI);



          } else {
            // context.arc(w + this.hexA/2, h, 5, 0, 2 * Math.PI);
            context.drawImage(this.image.file, 0, 0, this.image.w, this.image.h, w-this.hexA + (3*this.hexA)/2, h - this.hexA * (Math.sqrt(3)/2), 2*this.hexA, 2*this.hexA * (Math.sqrt(3)/2));
            context.ellipse(w + 3*this.hexA/2, h, 10, 5, 0, 0, 2 * Math.PI);
            // context.drawImage(this.image, 0, 0, 128, 128, w, h, 2*this.hexA, 2*this.hexA);


          }
          console.log(h);
          context.stroke();
        }
        is_even = is_even ? false : true;
      }
    }
    this.is_zoomed = false;
  }
}
//
class Tank {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  update() {

  }
  draw(context) {
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = "yellow";
    context.ellipse(500, 500, 20, 10, 0, 0, 2 * Math.PI);
    context.stroke();

  }
}
///
class Player {
  constructor(game) {
    this.x = Math.round(Math.random() * window.innerWidth);
    this.y = Math.round(Math.random() * window.innerHeight);
    this.width = 100;
    this.height = 200;
    this.speed = 0;
    this.maxSpeed = 300;
    this.alpha = 0;
    this.angularSpeed = 1;
    this.acceleration = 500;
    this.alphaTower = 0;
    this.velocity = { x: 0, y: 0 };
    this.reloadTime = 3000;
    this.isReloaded = false;
    //
    setInterval(() => {
      this.isReloaded = true;
    }, this.reloadTime);
  }

  update(input) {
    // var dy = input.mouse.y - this.y;
    // var dx = input.mouse.x - this.x;

    // if (input.mouse.x < this.x) {
    //   this.alpha = Math.atan(dy / dx) + Math.PI;
    // } else {
    //   this.alpha = Math.atan(dy / dx);
    // }
    if (input.direction.y == -1) {
      this.speed += this.acceleration * (1 / FPS);
    } else {
      this.speed -= this.acceleration * (1 / FPS);
    }
    if (this.speed < 0) this.speed = 0;
    if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;

    this.velocity.x = this.speed * Math.cos(this.alpha);
    this.velocity.y = this.speed * Math.sin(this.alpha);
    // this.velocity.y = this.speed * input.direction.normalized.y;

    this.x += Math.round(this.velocity.x * (1 / FPS));
    this.y += Math.round(this.velocity.y * (1 / FPS));

    this.alpha += this.angularSpeed * input.direction.x * (1 / FPS);
    //
    //
  }
  draw(context) {
    context.strokeStyle = "#0362fc";
    context.lineWidth = 5;

    var a = Math.sqrt(Math.pow(this.width / 2, 2) + Math.pow(this.height / 2, 2));
    var alp = Math.asin(this.width / 2 / a);
    context.beginPath();
    // drawing body of the tank
    context.moveTo(Math.cos(this.alpha + alp) * a + this.x, Math.sin(this.alpha + alp) * a + this.y); // front right point
    context.lineTo(Math.cos(this.alpha + Math.PI - alp) * a + this.x, Math.sin(this.alpha + Math.PI - alp) * a + this.y); // back  right point
    context.lineTo(Math.cos(this.alpha + Math.PI + alp) * a + this.x, Math.sin(this.alpha + Math.PI + alp) * a + this.y); // back  left point
    context.lineTo(Math.cos(this.alpha - alp) * a + this.x, Math.sin(this.alpha - alp) * a + this.y); // front left point
    context.lineTo(Math.cos(this.alpha + alp) * a + this.x, Math.sin(this.alpha + alp) * a + this.y); // back to front right point
    context.stroke();

    // drawing tower of the tank
    context.beginPath();
    context.arc(this.x, this.y, 40, 0, 2 * Math.PI);

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
    this.velocity = {
      x: this.speed * (dx / distance),
      y: this.speed * (dy / distance),
    };
  }
  update() {
    this.x += this.velocity.x * (1 / FPS);
    this.y += this.velocity.y * (1 / FPS);
  }
  draw(context) {
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 3;

    context.beginPath();
    context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    context.stroke();
  }
}
///.
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tileMap = new TileMap(50);
    this.tank = new Tank(1,1);
    // this.player = new Player(this);
    this.input = new InputHandler();
    // this.bullets = [];
  }
  update() {
    if(this.input.wheel != 0) {
      this.tileMap.zoomChange(this.input.wheel/100);
      this.input.wheel = 0;
    }
  }
  draw(context) {
    this.tileMap.draw(context, window.innerWidth, window.innerHeight);
    
    this.tank.draw(context,1,1);
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
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.draw(ctx);
}
setInterval(animate, Math.round(1000 / FPS));
// animate();


//
// serverInterval = setInterval(server, Math.round(1000 / RPS));

// function getCSRF() {
//   arr = document.getElementById("csrf").innerHTML.split("value");
//   arr = arr[1].split('"');
//   return arr[1];
// }

// function server() {
//   fetch("/update/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-CSRFToken": getCSRF(),
//     },
//     body: JSON.stringify({
//       h: game.input.tempDirection.x,
//       v: game.input.tempDirection.y,
//     }),
//   })
//     .catch((data) => {
//       stopServerInterval();
//       console.log("!!!ERROR!!!: ", data);
//       // window.alert("ERROR occured!");
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("json data: ", data);
//       game.updateData(data);
//     });
// }
// function stopServerInterval() {
//   clearInterval(serverInterval);
// }
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
