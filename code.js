// Car game.
/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 800;

const image = new Image();
const image2 = new Image();
image.src = 'https://www.seekpng.com/png/full/54-545710_car-vehicle-red-racing-game-transport-top-view.png';//"https://as2.ftcdn.net/v2/jpg/02/37/48/67/1000_F_237486799_qMQVdTiq59pXlU1156nfnOkZlKe4BCGr.jpg";
image2.src = 'https://www.seekpng.com/png/full/38-388934_28-collection-of-car-clipart-top-view-top.png';
//ctx.drawImage(image, 50, 50, 50, 50);
var random_position = [300,500,400,300,400,500,300,400,500];
class Car {
  constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height * 0.67;
      this.x2 = random_position[Math.floor(Math.random() * random_position.length)];
      this.y2 = 0;
      this.x3 = random_position[Math.floor(Math.random() * random_position.length)];
      this.y3 = Math.random() * canvas.height;
      this.sizeX = 50;
      this.sizeY = 100;
      this.score = 'Score: ';
      this.scoreNumber = 0;
  }

  draw() {
      this.y2 += 2.5;
      this.y3 += 2.5;
      if (this.y2 > canvas.height) {
          this.y2 = 0;
          this.x2 = random_position[Math.floor(Math.random() * random_position.length)];
          //this.scoreNumber += 1;
      }
      if (this.y3 > canvas.height) {
          this.y3 = 0;
          this.x3 = random_position[Math.floor(Math.random() * random_position.length)];
          //this.scoreNumber += 1;
      }
    //image.onload = function () {
      ctx.drawImage(image2,this.x3,this.y3,this.sizeX,this.sizeY);
    
      ctx.drawImage(image2,this.x2,this.y2,this.sizeX,this.sizeY);

      ctx.drawImage(image, this.x,this.y,this.sizeX,this.sizeY);

      ctx.font = '20px monospace';
      ctx.fillStyle = 'white';
      ctx.fillText(this.score + this.scoreNumber.toString(),50,50,150);
    //};
  }
}

class RoadTracks {
   constructor() {
      this.x = 300;
      this.y = Math.random() * canvas.height;
      this.x3 = 600;
      this.y3 = Math.random() * canvas.height;
      this.x2 = 450;
      this.y2 = Math.random() * canvas.height;
      this.sizeX = 10;
      this.sizeY = 50;
   }
   update() {
      this.y += 2;
      this.y2 += 2;
      this.y3 += 2;
      if (this.y > canvas.height) {
          this.y = 0;
      }
      if (this.y2 > canvas.height) {
          this.y2 = 0;
      }
      if (this.y3 > canvas.height) {
          this.y3 = 0;
      }
   }
   draw() {
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x,this.y,this.sizeX,this.sizeY);

      ctx.fillStyle = 'white';
      ctx.fillRect(this.x2,this.y2,this.sizeX,this.sizeY);

      ctx.fillStyle = 'white';
      ctx.fillRect(this.x3,this.y3,this.sizeX,this.sizeY);
   }
}
const roadArray = [];
for (let i = 0; i < 15; i++) {
    roadArray.push(new RoadTracks());
}

const car = new Car();
window.addEventListener('keydown',function(event){
    if (event.key === 'a') {
        car.x -= 85;
    }
    if (event.key === 'd') {
        car.x += 85;
    }
});

var random_position2 = [530,350];
class Coins {
    constructor() {
        this.x = random_position2[Math.floor(Math.random() * random_position2.length)];
        this.y = Math.random() * canvas.height;
        this.radius = 5;
        this.color = 'rgb(255, 208, 0)';
    }
    update() {
        this.y += 2;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = random_position2[Math.floor(Math.random() * random_position2.length)];
        }
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2 * Math.PI);
        ctx.fill();
    }
}
const coinsArray = [];
for (let i = 0; i < 20; i++) {
    coinsArray.push(new Coins());
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let i = 0; i < roadArray.length; i++) {
      const road = roadArray[i];
      road.update();
      road.draw();
  }
  for (let i = 0; i < coinsArray.length; i++) {
    const coins = coinsArray[i];
    coins.update();
    coins.draw();
    const dx = coins.x - car.x;
    const dy = coins.y - car.y;
    const distance = Math.sqrt(dx**2 + dy**2);
    if (distance < 5) {
        car.scoreNumber += 1;
    }
  }
  car.draw();
  requestAnimationFrame(animate);
}
animate();
