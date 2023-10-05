// Get canvas and context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Sun parameters
let sunY = canvas.height;
let flareLength = 20;
const sunRadius = 50;
const sunSpeed = 0.5; // Sun speed
const sunTopLimit = 50; // Sun's topmost position

// Clouds data with blobs for each cloud
let clouds = [
  {
    x: 0,
    y: 100,
    blobs: [
      { x: 50, y: 40, radius: 40 },
      { x: 100, y: 50, radius: 50 },
      { x: 150, y: 40, radius: 45 },
    ],
    speed: 1,
  },
  {
    x: canvas.width,
    y: 150,
    blobs: [
      { x: 30, y: 30, radius: 35 },
      { x: 70, y: 45, radius: 45 },
      { x: 120, y: 35, radius: 50 },
    ],
    speed: -1.2,
  },
];

// Cars data
let cars = [
  { x: 0, y: canvas.height - 80, speed: 2 }, // car moving to the right
  { x: canvas.width, y: canvas.height - 50, speed: -3 }, // car moving to the left
];

// People data
let people = [
  { x: 50, y: canvas.height - 20, speed: 1 },
  { x: canvas.width - 50, y: canvas.height - 40, speed: -1.5 },
];

// Function to draw the sky with gradient
function drawSky() {
  const grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grd.addColorStop(0, "#ff9f43");
  grd.addColorStop(1, "#c672d3");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to draw individual clouds using blobs
function drawCloud(cloud) {
  ctx.fillStyle = "white";
  cloud.blobs.forEach((blob) => {
    ctx.beginPath();
    ctx.arc(cloud.x + blob.x, cloud.y + blob.y, blob.radius, 0, 2 * Math.PI);
    ctx.fill();
  });
}

// Function to draw the sun with flares
function drawSun(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#FFD700";
  ctx.fill();

  // Dynamically calculate flare length based on sun's Y position
  let dynamicFlareLength = flareLength;
  if (y <= sunTopLimit + sunRadius) {
    dynamicFlareLength = 50; // The sun flares expand when sun is at the top
  }

  for (let angle = 0; angle < 2 * Math.PI; angle += Math.PI / 12) {
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
    ctx.lineTo(
      x + Math.cos(angle) * (radius + dynamicFlareLength),
      y + Math.sin(angle) * (radius + dynamicFlareLength)
    );
    ctx.strokeStyle = "#FFD700";
    ctx.stroke();
  }
}

// Function to draw the road and markings
function drawRoad() {
  // Main Road
  ctx.fillStyle = "#4B4B4B";
  ctx.fillRect(0, canvas.height - 80, canvas.width, 70);

  // Road Markings
  for (let i = 0; i < canvas.width; i += 60) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(i, canvas.height - 45, 40, 5);
  }
}

// Function to draw the ground/grass
function drawGround() {
  ctx.fillStyle = "#009933";
  ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
}

// Function to draw individual cars
function drawCar(car) {
  // Car Body
  ctx.fillStyle = "blue";
  ctx.fillRect(car.x, car.y, 50, 20);

  // Car Roof
  ctx.beginPath();
  ctx.moveTo(car.x + 10, car.y);
  ctx.lineTo(car.x + 15, car.y - 10);
  ctx.lineTo(car.x + 35, car.y - 10);
  ctx.lineTo(car.x + 40, car.y);
  ctx.closePath();
  ctx.fillStyle = "blue";
  ctx.fill();

  // Windows
  ctx.fillStyle = "gray";
  ctx.fillRect(car.x + 17, car.y - 8, 16, 8);

  // Wheels
  ctx.beginPath();
  ctx.arc(car.x + 15, car.y + 20, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(car.x + 35, car.y + 20, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
}

// Function to draw all cars
function drawCars() {
  cars.forEach((car) => {
    drawCar(car);
    car.x += car.speed;

    // Reset car position when out of canvas bounds
    if (car.speed > 0 && car.x > canvas.width) {
      car.x = -50;
      car.y = canvas.height - 80; // Upper lane
    }
    if (car.speed < 0 && car.x < -50) {
      car.x = canvas.width;
      car.y = canvas.height - 50; // Lower lane
    }
  });
}

// Function to draw people
function drawPeople() {
  people.forEach((person) => {
    // Head
    ctx.beginPath();
    ctx.arc(person.x, person.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    // Body
    ctx.beginPath();
    ctx.moveTo(person.x, person.y + 5);
    ctx.lineTo(person.x, person.y + 15);
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(person.x, person.y + 15);
    ctx.lineTo(person.x - 5, person.y + 25);
    ctx.moveTo(person.x, person.y + 15);
    ctx.lineTo(person.x + 5, person.y + 25);
    ctx.stroke();

    person.x += person.speed;

    // Reset person position when out of canvas bounds
    if (person.x > canvas.width) person.x = -20;
    if (person.x < -20) person.x = canvas.width;
  });
}

// Function to draw mountains
function drawMountains() {
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - 80);
  ctx.lineTo(canvas.width / 6, canvas.height - 150);
  ctx.lineTo((2 * canvas.width) / 6, canvas.height - 80);
  ctx.lineTo((3 * canvas.width) / 6, canvas.height - 130);
  ctx.lineTo((4 * canvas.width) / 6, canvas.height - 90);
  ctx.lineTo((5 * canvas.width) / 6, canvas.height - 140);
  ctx.lineTo(canvas.width, canvas.height - 80);
  ctx.closePath();
  ctx.fillStyle = "#8B4513";
  ctx.fill();
}

// Main drawing function
function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSky();
  drawSun(canvas.width / 2, sunY, sunRadius);
  clouds.forEach((cloud) => {
    drawCloud(cloud);
    cloud.x += cloud.speed;
    if (cloud.x > canvas.width) cloud.x = -200;
    if (cloud.x < -200) cloud.x = canvas.width;
  });
  drawMountains();
  drawRoad();
  drawGround();
  drawCars();
  drawPeople();

  if (sunY > sunTopLimit + sunRadius) {
    sunY -= sunSpeed; // Sun moves up
  }

  requestAnimationFrame(drawScene);
}

// Start the drawing loop
drawScene();
