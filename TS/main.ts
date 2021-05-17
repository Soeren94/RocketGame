let KEY_SPACE: boolean = false; //32
let KEY_UP: boolean = false; //38
let KEY_DOWN: boolean = false; //40
let rocketSpeed: number = 15;
let ufoSpeed: number = 5;
let shotSpeed: number = 30;
let spornUfosSpeed: number = 3000;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;
let backgroundImages: HTMLImageElement = new Image();

type ufo = {
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  img: HTMLImageElement;
};

type shot = {
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  img: HTMLImageElement;
};

type rocket = {
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  img: HTMLImageElement;
};

let createUfosInterval: NodeJS.Timeout;

let rocket = {
  x: 100,
  y: 400,
  width: 175,
  height: 94,
  src: 'pics/rocket.png',
  img: new Image(),
};

let ufos: ufo[] = [];
let shots: shot[] = [];

document.onkeydown = function (e) {
  if (e.key == 'v') {
    //Leertaste
    KEY_SPACE = true;
    createShot();
  }

  if (e.key == 'w') {
    //Nach obenv
    KEY_UP = true;
  }

  if (e.key == 's') {
    //Nach unten
    KEY_DOWN = true;
  }
};

document.onkeyup = function (e) {
  if (e.key == 'v') {
    KEY_SPACE = false;
  }

  if (e.key == 'w') {
    KEY_UP = false;
  }

  if (e.key == 's') {
    KEY_DOWN = false;
  }
};

onload = () => {
  let htmlCanvas = document.createElement('canvas');
  htmlCanvas.id = 'canvas';
  htmlCanvas.width = 1920;
  htmlCanvas.height = 1080;
  let htmlBody = document.querySelector('body');
  htmlBody?.appendChild(htmlCanvas);

  canvas = <HTMLCanvasElement>document.getElementById('canvas');

  ctx = canvas.getContext('2d');
  loadImages();
  setInterval(update, 1000 / 25);
  createUfosInterval = setInterval(createUfos, spornUfosSpeed);
  setInterval(checkForCollision, 1000 / 25);
  setInterval(checkForHit, 1000 / 25);
  setInterval(changeSpeed, 1000);
  draw();
  //calculate
};

function checkForCollision() {
  ufos.forEach(function (ufo) {
    if (
      rocket.x + rocket.width > ufo.x &&
      rocket.y + rocket.height > ufo.y &&
      rocket.x < ufo.x &&
      rocket.y < ufo.y
    ) {
      console.log('Kontakt!!!!');
      rocket.img.src = 'pics/boom.png';
      ufos = ufos.filter((u) => u != ufo);
      clearInterval(createUfosInterval);
    } else if (
      rocket.x + rocket.width > ufo.x &&
      rocket.y + rocket.height > ufo.y + ufo.height &&
      rocket.x < ufo.x &&
      rocket.y < ufo.y + ufo.height
    ) {
      console.log('Kontakt!!!!');
      rocket.img.src = 'pics/boom.png';
      ufos = ufos.filter((u) => u != ufo);
      clearInterval(createUfosInterval);
    }
  });
}

function checkForHit() {
  shots.forEach(function (shot) {
    ufos.forEach(function (ufo) {
      if (
        ufo.x + ufo.width > shot.x &&
        ufo.y + ufo.height > shot.y &&
        ufo.x < shot.x &&
        ufo.y < shot.y
      ) {
        console.log('HIT!!!!');
        ufos = ufos.filter((u) => u != ufo);
        shots = shots.filter((u) => u != shot);
      }
    });
  });
}

function createUfos() {
  let ufo = {
    x: 1980,
    y: getRandomBetween(20, 700),
    width: 155,
    height: 69,
    src: 'pics/ufo.png',
    img: new Image(),
  };
  ufo.img.src = ufo.src; //Ufobild wird hier geladen
  ufos.push(ufo);
}

function createShot() {
  let shot = {
    x: rocket.x + rocket.width,
    y: rocket.y + rocket.height / 2,
    width: 35,
    height: 8,
    src: 'pics/shot.png',
    img: new Image(),
  };
  shot.img.src = shot.src;
  shots.push(shot);
}

function update() {
  if (KEY_UP) {
    rocket.y -= rocketSpeed;
  }

  if (KEY_DOWN) {
    rocket.y += rocketSpeed;
  }

  ufos.forEach(function (ufo) {
    ufo.x -= ufoSpeed;
  });

  shots.forEach(function (shot) {
    shot.x += shotSpeed;
  });
}

function loadImages() {
  backgroundImages.src = 'pics/Background.jpg';
  rocket.img = new Image();
  rocket.img.src = rocket.src;
}

function draw() {
  ctx?.drawImage(backgroundImages, 0, 0);
  ctx?.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);
  ufos.forEach(function (ufo) {
    ctx?.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
  });
  shots.forEach(function (shot) {
    ctx?.drawImage(shot.img, shot.x, shot.y, shot.width, shot.height);
  });
  requestAnimationFrame(draw);
}

function changeSpeed() {
  ufoSpeed += 1;
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/*https://www.youtube.com/watch?v=eWLDAAMsD-c

min 1:10:28*/
