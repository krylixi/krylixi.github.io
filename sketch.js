var sculpture;
function preload() {
	sculpture = loadModel('images/sculpture.obj' , true);
	img = loadImage('images/hmm.jpeg');
}
function setup() {
	// createCanvas(720, 400, WEBGL);
	createCanvas(window.innerWidth, window.innerHeight, WEBGL);

	// canvas = document.getElementById("mainCanvas");
 //    canvas.width = document.body.clientWidth; //document.width is obsolete
 //    canvas.height = document.body.clientHeight; //document.height is obsolete
 //    canvasW = canvas.width;
 //    canvasH = canvas.height;

    // if( canvas.getContext )
    // {
    //     setup();
    //     setInterval( run , 33 );
    // }

	// ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500);
	ortho(-width / 2, width / 2, height / 2, -height / 2);
}
function draw() {


	// pointLight(128, 128, millis() * 128 / 1000, 0, millis() / 10, -1);

	background(50);
	// pointLight(128, 128, millis() * 128 / 1000, 0, millis() / 10, -1);


	// if (isMobileDevice()) {
	// 	orbitControl();
	// }

	this.translate(0, -height/20);
	this.rotateX(-PI/2);
	this.scale(5,5,5)
	this.rotateZ((this.mouseX - this.width / 2) / (this.width / 2));
	this.rotateX((this.mouseY - this.height / 2 ) / (this.width / 2));


	pointLight(250, 30, 30, sin(millis()/500)*500, sin(millis()/500)*500, sin(millis()/500)*500 + 300);
	pointLight(30, 250, 30, cos(millis()/500 + 300)*500, sin(millis()/500 - 300)*500, sin(millis()/500)*500 + 300);
	pointLight(30, 30, 250, sin(millis()/500 + 700)*500, cos(millis()/500)*500, sin(millis()/500)*500 + 300);
	noStroke();
	// sphere(40);




	// normalMaterial();
	model(sculpture);
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};