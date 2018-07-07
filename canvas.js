const canvas = document.getElementById('myCanvas');


var maxRadius = 150;
var minRadius = (Math.random() * 15);

var colorArray = [
	'#ffaa33',
	'#99ffaa',
	'#00ff00',
	'#4411aa',
	'#ff1100'
];

const c = canvas.getContext('2d');

var gradient=c.createLinearGradient(0, 0, innerWidth, innerHeight);
gradient.addColorStop(0, 'rgb(' + ((Math.random() * 256)) + ',' + ((Math.random() * 256)) + ',' + ((Math.random() * 256)) + ')');
gradient.addColorStop(0.25, 'rgb(' + ((Math.random() * 256)) + ',' + ((Math.random() * 256)) + ',' + ((Math.random() * 256)) + ')');
gradient.addColorStop(0.5, 'rgb(' + ((Math.random() * 256)) + ',' + ((Math.random() * 256)) + ',' + ((Math.random() * 256)) + ')');
gradient.addColorStop(0.75, 'rgb(' + ((Math.random() * 256)) + ',' + ((Math.random() * 256)) + ',' + ((Math.random() * 256)) + ')');
gradient.addColorStop(1, 'rgb(' + ((Math.random() * 256)) + ',' + ((Math.random() * 256)) + ',' + ((Math.random() * 256)) + ')');

var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
})

window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;

	console.log(mouse);
})

function Circle (x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = gradient;
		c.stroke();
		c.lineWidth = 6;
		c.fillStyle = 'black';
		c.fill();
	}

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx; //bounce off the walls (width)
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;  //bounce off the walls (height)
		}

		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < maxRadius) {
				this.radius += 5;
				c.lineWidth = 20;
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 5;
		}

		this.draw();
	}
}



var circleArray = [];

function init() {
	circleArray = [];

	for (var i = 0; i < 200; i++) {
		var radius = Math.floor(Math.random() * 50);
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5) * 3;
		var dy = (Math.random() - 0.5) * 3;
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}	
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

init();

animate();