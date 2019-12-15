window.onload = () =>{
const skinNames = ['Classic', 'Camo', 'Crystal'];
let fontColors = ['white', 'black', 'black'];
const gameBackrounds= ['classic_background.png', 'camo_game_background.png' , 'crystal_background.jpg'];
const menuBackgrounds = ['classic_menu_background.png', 'menu_camo_background.png' , 'crystal_background.jpg'];	
let paddleSkins =['classic.png',  'camo.jpg', 'gem.jpg'];
const skinBalls = [ 'classic_ball.png' ,'bullet.png', 'gem.png'];	
	
const canvas =  document.createElement('canvas');		
const context = canvas.getContext('2d');	
		canvas.id = 'canvas';
		canvas.style.display	= 'block';	
	    canvas.width = 	document.body.clientWidth; 
    		canvas.height = Math.max( window.innerHeight, document.body.clientHeight) - 16;
 	const resizeText =(num)=>{
	return	String(((num/canvas.width) * canvas.width) + 'px');
	}
let menuTitleFonts = resizeText(70);	
let menuSubFonts = resizeText(40);
let fontSizesEnd = resizeText(60);
let subFontSizesEnd = resizeText(30);
let musicFontSize = resizeText(15);
const mobile = window.matchMedia( "(max-width: 600px)" );
	if (mobile.matches) {
	canvas.width = 	 Math.max( window.innerHeight, document.body.clientHeight);
	canvas.height = document.body.clientWidth - 20; 
	menuTitleFonts = resizeText(75);	
	menuSubFonts = resizeText(25);
	fontSizesEnd = resizeText(35);
	subFontSizesEnd = resizeText(20);
	musicFontSize = resizeText(15);
}	

	document.body.appendChild(canvas);
let slide = 0;	
	
	
const background = {
	create(){
		canvas.style.background = 'url(' + menuBackgrounds[slide] + ')';
		canvas.style.backgroundSize =  '100% 100%';
	},	
};
	background.create();


const fontNames =  ['Lucida Sans Unicode', 'Impact', 'Cursive'];
let scoreValue = 5;
let numberOfBalls = 1;
const styleNames = ['Classic', 'Camo', 'Crystal'];
let musicText = 'Off';

 const getMousePos =(evt) =>{
        let rect = canvas.getBoundingClientRect();
        return {
          x: (evt.clientX - rect.left),
          y: (evt.clientY - rect.top) 
        };
      }  

class MenuText {
	constructor(text, xPos, yPos, fontSize, color){
	this.text = text;
	this.yPos = yPos;
	this.xPos = xPos;
	this.color =  color;
	this.align = 'center';
	this.fontSize= fontSize;
	
	}

write (){
	context.fillStyle = fontColors[slide];
	if(this.color == 'red'){
		context.fillStyle = 'red';
	}
	context.textAlign = this.align;
	context.font = this.fontSize + ' ' + fontNames[slide];
	context.fillText(this.text, this.xPos, this.yPos);
};
}

let title = new MenuText('Speed Paddle' , canvas.width/2, canvas.height/6, fontSizesEnd, fontColors[slide]);	
let difficulty = new MenuText('Difficulty:', canvas.width/5, canvas.height/3.2, subFontSizesEnd, fontColors[slide]);
let paddleSize = new MenuText(' Paddle Size:', canvas.width/5, canvas.height/2.2, subFontSizesEnd, fontColors[slide]);
let scoreLimit = new MenuText('Score Limit:',  canvas.width/5, canvas.height/1.7, subFontSizesEnd, fontColors[slide]);
let scoreNum = new MenuText(scoreValue.toString(),  canvas.width/1.8, canvas.height/1.7, subFontSizesEnd, fontColors[slide]);
let ballNumber =  new MenuText( numberOfBalls,  canvas.width/1.8, canvas.height/1.4, subFontSizesEnd, fontColors[slide]);
let ballCount = new MenuText('Ball Count:',  canvas.width/5, canvas.height/1.4, subFontSizesEnd, fontColors[slide]);
let styleTitle = new MenuText('Style:',  canvas.width/5, canvas.height/1.2, subFontSizesEnd, fontColors[slide]);
let easy = new MenuText(' Easy', canvas.width/2.8, canvas.height/3.2, subFontSizesEnd, 'red');
let medium = new MenuText(' Medium', canvas.width/1.8, canvas.height/3.2, subFontSizesEnd, fontColors[slide]);
let impossible = new MenuText(' Impossible', canvas.width/1.3, canvas.height/3.2, subFontSizesEnd, fontColors[slide]);
let small = new MenuText(' Small', canvas.width/2.8, canvas.height/2.2, subFontSizesEnd, fontColors[slide]);
let average = new MenuText(' Average', canvas.width/1.8, canvas.height/2.2, subFontSizesEnd, 'red');
let giant = new MenuText(' Giant', canvas.width/1.3, canvas.height/2.2, subFontSizesEnd, fontColors[slide]);
let decreaseScore = new MenuText('<',  canvas.width/2.8, canvas.height/1.7, subFontSizesEnd, fontColors[slide]);
let increaseScore = new MenuText('>',  canvas.width/1.3, canvas.height/1.7, subFontSizesEnd, fontColors[slide]);
let lessBall = 	new MenuText('<',  canvas.width/2.8, canvas.height/1.4, subFontSizesEnd, fontColors[slide]);
let moreBall = new MenuText('>',  canvas.width/1.3, canvas.height/1.4, subFontSizesEnd, fontColors[slide]);
let styleBack = new MenuText('<',  canvas.width/2.8, canvas.height/1.25, subFontSizesEnd, fontColors[slide] );
let styleForward = new MenuText('>',  canvas.width/1.3, canvas.height/1.25, subFontSizesEnd, fontColors[slide]);
let music = new MenuText('Music: ' + musicText, canvas.width/1.2, canvas.height/1.1, musicFontSize, fontColors[slide]);
let startGame = new MenuText('Start Game',  canvas.width/1.75, canvas.height/1.07, subFontSizesEnd, fontColors[slide]);
let credit = new MenuText('Created by: Thomas Czernek',  canvas.width/6, canvas.height/1.06, musicFontSize, fontColors[slide]);
let musicCredit = new MenuText('Music Credit: DJ Quads &  LAKEY INSPIRED',  canvas.width/4.9, canvas.height/1.02, musicFontSize, fontColors[slide]);
//array of non-clickable menu items
const textObjects = [title, difficulty, paddleSize, scoreLimit, ballCount , styleTitle, ballNumber, scoreNum, 
easy, medium, impossible, small, average, giant, decreaseScore, increaseScore, lessBall, moreBall,
styleBack, styleForward, music, startGame, credit, musicCredit];
//draw text
const renderText =()=>{
	textObjects.forEach(function(element){
		element.write();
	});
}
renderText();

//draw decorative paddles
const menuPaddles = {
	render(){
		let img = document.createElement('img');	
		img.src = paddleSkins[slide];
		img.addEventListener('load', function(){
				context.drawImage(img, 1, 25, canvas.width/15, canvas.height/1.1);
				context.drawImage(img, canvas.width-(canvas.width/15), 25, canvas.width/15, canvas.height/1.1);
		});	
	},
	skinEx(){
		let ballSkinEx = document.createElement('img');
		ballSkinEx.src = skinBalls[slide];
				ballSkinEx.addEventListener('load', function(){
				context.drawImage(ballSkinEx, canvas.width/1.9, canvas.height/1.3, canvas.width/18, canvas.height/11);
		});	
	},
}
menuPaddles.render();
menuPaddles.skinEx();
//button functions and functions used within them
const write =(a, b, c)=>{
	a.write();
	b.write();
	c.write();
}
let difficultyLevel = 'easy';
const easyFunc =()=>{
	context.clearRect(canvas.width/4, canvas.height/4, canvas.width/1.5, canvas.height/10);
	easy =  new MenuText(' Easy', canvas.width/2.8, canvas.height/3.2, subFontSizesEnd, 'red');
	medium = new MenuText(' Medium', canvas.width/1.8, canvas.height/3.2, subFontSizesEnd, fontColors[slide]);
 	impossible = new MenuText(' Impossible', canvas.width/1.3, canvas.height/3.2, subFontSizesEnd, fontColors[slide]);
	write(easy, medium, impossible);
	difficultyLevel = 'easy';
	difficulty.write();
	
}

const mediumFunc =()=>{
	context.clearRect(canvas.width/4, canvas.height/4, canvas.width/1.5, canvas.height/10);
 	easy = new MenuText(' Easy', canvas.width/2.8, canvas.height/3.2, subFontSizesEnd,  fontColors[slide]);
 	medium = new MenuText(' Medium', canvas.width/1.8, canvas.height/3.2, subFontSizesEnd, 'red');
 	impossible = new MenuText(' Impossible', canvas.width/1.3, canvas.height/3.2, subFontSizesEnd, fontColors[slide]);
	write(easy, medium, impossible);
	difficultyLevel = 'medium';
	difficulty.write();
}

const impossibleFunc =()=>{
	context.clearRect(canvas.width/4, canvas.height/4, canvas.width/1.5, canvas.height/10);
 	easy = new MenuText(' Easy', canvas.width/2.8, canvas.height/3.2, subFontSizesEnd, fontColors[slide]);
 	medium = new MenuText(' Medium', canvas.width/1.8, canvas.height/3.2, subFontSizesEnd, fontColors[slide]);
 	impossible = new MenuText(' Impossible', canvas.width/1.3, canvas.height/3.2, subFontSizesEnd, 'red');
	write(easy, medium, impossible);
	difficultyLevel = 'impossible';
	difficulty.write();
}
let paddleHeight = 'average';
const smallFunc = ()=>{
	context.clearRect(canvas.width/4, canvas.height/2.8, canvas.width/1.5, canvas.height/9);
	 small = new MenuText(' Small', canvas.width/2.8, canvas.height/2.2, subFontSizesEnd, 'red');
 	average = new MenuText(' Average', canvas.width/1.8, canvas.height/2.2, subFontSizesEnd, fontColors[slide]);
 	giant = new MenuText(' Giant', canvas.width/1.3, canvas.height/2.2, subFontSizesEnd, fontColors[slide]);
	write(small, average, giant);
	paddleHeight = 'small';
	paddleSize.write();
}
const averageFunc = ()=>{
	context.clearRect(canvas.width/4, canvas.height/2.8, canvas.width/1.5, canvas.height/9);
 	small = new MenuText(' Small', canvas.width/2.8, canvas.height/2.2, subFontSizesEnd, fontColors[slide]);
 	average = new MenuText(' Average', canvas.width/1.8, canvas.height/2.2, subFontSizesEnd, 'red');
 	giant = new MenuText(' Giant', canvas.width/1.3, canvas.height/2.2, subFontSizesEnd, fontColors[slide]);
	write(small, average, giant);
	paddleHeight = 'average';
	paddleSize.write();
}

const giantFunc = ()=>{
	context.clearRect(canvas.width/4, canvas.height/2.8, canvas.width/1.5, canvas.height/9);
 	small = new MenuText(' Small', canvas.width/2.8, canvas.height/2.2, subFontSizesEnd, fontColors[slide]);
 	average = new MenuText(' Average', canvas.width/1.8, canvas.height/2.2, subFontSizesEnd, fontColors[slide]);
 	giant = new MenuText(' Giant', canvas.width/1.3, canvas.height/2.2, subFontSizesEnd, 'red');
	write(small, average, giant);
	paddleHeight = 'giant';
	paddleSize.write();
}


const decreaseScoreFunc =()=>{
	scoreValue = scoreValue - 5;
	if(scoreValue < 5){
		scoreValue = 100;
	}
		context.clearRect( canvas.width/2, canvas.height/1.9, canvas.width/6, canvas.height/15);
	 	scoreNum = new MenuText(scoreValue.toString(),  canvas.width/1.8, canvas.height/1.7, subFontSizesEnd, fontColors[slide]);
		scoreNum.write();
}
const increaseScoreFunc =()=>{
	scoreValue = scoreValue + 5;
	if(scoreValue > 100){
		scoreValue = 5;
	}
	context.clearRect( canvas.width/2, canvas.height/1.9, canvas.width/6, canvas.height/15);
	scoreNum = new MenuText(scoreValue.toString(),  canvas.width/1.8, canvas.height/1.7, subFontSizesEnd, fontColors[slide]);
	scoreNum.write();
}


const lessBallFunc =()=>{
	--numberOfBalls;
	if(numberOfBalls < 1){
		numberOfBalls = 5;
	}
	context.clearRect( canvas.width/2, canvas.height/1.5, canvas.width/6, canvas.height/15);
	ballNumber = 	new MenuText( numberOfBalls,  canvas.width/1.8, canvas.height/1.4, subFontSizesEnd, fontColors[slide]);
	ballNumber.write();
}

const moreBallFunc =()=>{
	++numberOfBalls;
	if(numberOfBalls > 5){
		numberOfBalls =1;
	}
	context.clearRect( canvas.width/2, canvas.height/1.5, canvas.width/6, canvas.height/15);
	ballNumber = 	 new MenuText( numberOfBalls,  canvas.width/1.8, canvas.height/1.4, subFontSizesEnd, fontColors[slide]);
	ballNumber.write();
}
const styleBackFunc=()=>{
		--slide;
	if(slide <  0){
		slide = styleNames.length-1;
	}
	context.clearRect(0, 0, canvas.width, canvas.height);
	background.create()
	renderMenu();
	menuPaddles.render();
	menuPaddles.skinEx();
}

const styleForwardFunc=()=>{
		++slide;
	if(slide > styleNames.length-1){
		slide = 0;
	}
	context.clearRect(0, 0, canvas.width, canvas.height);
	background.create()
	menuPaddles.render();
	menuPaddles.skinEx();	
	renderMenu();
}

const startGameFunc=()=>{
	pong();
}
//music  creation
const backgroundMusic ={
	on: -1,
	songs: ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3', 'song5.mp3', 'song6.mp3'],
	sound: document.createElement('audio'),
	source: document.createElement('source'),
	textSwitch(){
		if(this.on == -1){
		musicText = 'Off';
		}else if(this.on==1){
		musicText = 'On';
}	
	},
	setupAudio(){
		this.sound.setAttribute('controls', 'mute');
		this.sound.volume = 0.2;
		this.sound.style.display = 'none';
		document.body.appendChild(this.sound);
	},
	randomSong(min, max){
		let number = Math.floor(Math.random() * (max - min) + min);
		return number;
	},
	insertSong(){
		this.source.src = this.songs[backgroundMusic.randomSong(0, this.songs.length)]; 
		this.sound.appendChild(this.source);
	},	
	musicSwitch(){
		this.on = this.on * -1;
		if(this.on == -1){
		context.clearRect(canvas.width/1.4, canvas.height/1.2, canvas.width/5, canvas.height/5);
		music  = new MenuText('Music: Off', canvas.width/1.2, canvas.height/1.1, musicFontSize, fontColors[slide]);
		music.write();
		document.body.removeChild(this.sound);	
		} 
		if(this.on == 1){
		context.clearRect(canvas.width/1.4, canvas.height/1.2, canvas.width/5, canvas.height/5);
		music = new MenuText('Music: On', canvas.width/1.2, canvas.height/1.1, musicFontSize, fontColors[slide]);
		music.write();
		backgroundMusic.setupAudio();
		backgroundMusic.insertSong();	
		this.sound.play();
	}
},
	playNextSong(){
		if(Number(this.sound.currentTime) == this.sound.duration){	
		this.sound.removeChild(this.source);
		this.source.src = this.songs[this.randomSong(0, this.songs.length)];
		this.sound.appendChild(this.source);
		this.sound.load();
	}
	},
}	
backgroundMusic.textSwitch();
const check=()=>{
	backgroundMusic.playNextSong();
}
let t = setInterval(check, 50);

const musicFunc =()=>{
	backgroundMusic.musicSwitch();
}

//clickable buttons
   class Button {
  constructor(xPos, yPos, width, height, color, use) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.color = color;
    this.use = use;
    
  }
}
Button.prototype.draw = function (){
    context.fillStyle = 'rgba(225,225,225,.0)';
    context.fillRect(this.xPos, this.yPos, this.width, this.height);
};   
Button.prototype.area = function (){
    return (this.width * this.height);
};
Button.prototype.sqToTri = function(mousePos) {
    let farX = this.xPos + this.width;
    let farY = this.yPos + this.height;
    
    let upTri = Math.abs(((this.xPos * (mousePos.y - this.yPos)) + (mousePos.x * (this.yPos - this.yPos)) + (farX * (this.yPos - mousePos.y)))/2);
    
    let lowTri = Math.abs(((this.xPos * (mousePos.y - farY)) + (mousePos.x * (farY - farY)) + (farX * (farY - mousePos.y)))/2);
    
    let leftTri =  Math.abs(((this.xPos * (mousePos.y - farY)) + (mousePos.x * (farY - this.yPos)) + (this.xPos * (this.yPos - mousePos.y)))/2);
    
    
    let rightTri =  Math.abs(((farX * (mousePos.y - farY)) + (mousePos.x * (farY - this.yPos)) + (farX * (this.yPos - mousePos.y)))/2);
    
    
    let buttonArea = this.width * this.height;
    
    if(buttonArea >= (rightTri + leftTri + upTri + lowTri)){
        if(this.xPos <= mousePos.x && this.yPos <= mousePos.y){
           
          buttonFunctions[this.use]();
        }
    }

}; 
//difficulty level settings
let easyBut = new Button(canvas.width/3.2, canvas.height/3.6, canvas.width/12, canvas.height/19, 'red', 0);
let medBut = new Button(canvas.width/1.95, canvas.height/3.6, canvas.width/10, canvas.height/19, 'blue', 1);
let impBut = new Button(canvas.width/1.45, canvas.height/3.6, canvas.width/7, canvas.height/19, 'green', 2);
// paddle size settings
let smalBut = new Button(canvas.width/3.2, canvas.height/2.6, canvas.width/12, canvas.height/13, 'red', 3);
let aveBut = new Button(canvas.width/1.95, canvas.height/2.6, canvas.width/10, canvas.height/13, 'red', 4);
let giaBut = new Button(canvas.width/1.40, canvas.height/2.6, canvas.width/10, canvas.height/13, 'red', 5);
// play to score
let scDoBut = new Button(canvas.width/3, canvas.height/1.88, canvas.width/20, canvas.height/13, 'red', 6);
let scUpBut = new Button(canvas.width/1.34, canvas.height/1.85, canvas.width/20, canvas.height/13, 'red', 7);
//ball count settings
let baLesBut = new Button(canvas.width/3, canvas.height/1.5, canvas.width/20, canvas.height/13, 'red', 8);
let balMorBut = new Button(canvas.width/1.34, canvas.height/1.5, canvas.width/20, canvas.height/13, 'red', 9);
//style change obj
let bacStyBut = new Button(canvas.width/3, canvas.height/1.3, canvas.width/20, canvas.height/13, 'red', 10);
let forStyBut = new Button(canvas.width/1.34, canvas.height/1.3, canvas.width/20, canvas.height/13, 'red', 11);
//music and start button
let startBut = new Button(canvas.width/2, canvas.height/1.15, canvas.width/7, canvas.height/13, 'red', 12);
let musicBut = new Button(canvas.width/1.25, canvas.height/1.15, canvas.width/15, canvas.height/13, 'red', 13);
//button array
const buttonArr = [easyBut, medBut, impBut, smalBut, aveBut, giaBut, scDoBut, scUpBut, baLesBut, balMorBut,
	bacStyBut, forStyBut, startBut, musicBut];

easyBut.func =()=>{
	easyFunc();
}
medBut.func = ()=>{
    mediumFunc();
}
impBut.func =()=>{
	impossibleFunc();
}
smalBut.funct =()=>{
	smallFunc();
}

aveBut.func =()=>{
	averageFunc();
}
giaBut.func =()=>{
	giantFunc();
}
scDoBut.func =()=>{
	decreaseScoreFunc();
}
scUpBut.func =()=>{
	increaseScoreFunc();
}
baLesBut.func=()=>{
	lessBallFunc();
}
balMorBut.func=()=>{
	moreBallFunc();
}
bacStyBut.func=()=>{
	styleBackFunc();
}
forStyBut.func=()=>{
	styleForwardFunc();
}
startBut.func =()=>{
	startGameFunc();
}
musicBut.func =()=>{
	musicFunc();
}

const buttonFunctions = [easyBut.func, medBut.func, impBut.func, smalBut.funct, aveBut.func, giaBut.func, scDoBut.func, 
scUpBut.func, baLesBut.func, balMorBut.func, bacStyBut.func, forStyBut.func, startBut.func, musicBut.func];


buttonArr.forEach(function(element){
	element.draw();
});


    canvas.addEventListener('click', function(evt) {
        let mousePos = getMousePos( evt);
      
	buttonArr.forEach(function(element){
	element.sqToTri(mousePos);
});	
      }, false);
      

function renderMenu(){
	renderText();
	
	buttonArr.forEach(function(element){
		element.draw();
});
	
}

//Game play
const pong = () => {		
	context.clearRect(0, 0, canvas.width, canvas.height);
	const gameBackground = {
		render(){
			canvas.style.background = 'url('+ gameBackrounds[slide] + ')';
			canvas.style.backgroundSize =  '100% 100%';
		}
	}
	if(paddleHeight == 'small'){
		paddleHeight = canvas.width/17;
	}else if(paddleHeight == 'average'){
		paddleHeight = canvas.width/8;
	}else if(paddleHeight == 'giant'){
		paddleHeight = canvas.width/5;
	}
		const getScore = (userScore) => {
	let userScoreString = userScore.toString();
	let convertToScore = eval(userScoreString.replace(/,/g, "+"));
	if(convertToScore == undefined){
		return 0;
	}else{
	return convertToScore;
		}
}
	let humanScore = [];
	let cpuScore = [];	
		const scoreboard = {	
	scoreboardColor:  fontColors[slide],
	scoreboardFontSize: canvas.width/15, 
	scoreboardFontStyle:    fontNames[slide],
	scoreboardHumanPos: canvas.width/4, 
	 scoreboardCpuPos: canvas.width/1.5,
		drawScoreboard(event){
	const scoreboardYPos =	this.scoreboardFontSize;
	context.fillStyle = this.scoreboardColor;
	context.font = this.scoreboardFontSize.toString() + 'px  ' +  this.scoreboardFontStyle;
	context.fillText(getScore(humanScore),  this.scoreboardHumanPos, scoreboardYPos+40);		
	context.fillText(getScore(cpuScore),  this.scoreboardCpuPos, scoreboardYPos+40);			
	},
};
		let playerYPos = [];
	const playerYposMobile = (event) =>{
		event.preventDefault();
		let rect = canvas.getBoundingClientRect();	
		playerYPos[0] = (event.changedTouches[0].pageY) - (paddleHeight/2);
}
	const playerYposDesk = (event) =>{
			let rectMobile = canvas.getBoundingClientRect();	
		playerYPos[0] =  Math.round(event.clientY - rectMobile.top) - (paddleHeight/2);
}
		let playerXPos = canvas.width/20;
		canvas.addEventListener('touchmove', playerYposMobile);
		canvas.addEventListener('mousemove', playerYposDesk);	
	
	const playerPaddle = { 
		playerWidth: 25,
		drawPlayer(event){
		let img = document.createElement('img');
		img.src = paddleSkins[slide];
		context.drawImage(img, playerXPos, playerYPos[0], this.playerWidth, paddleHeight);
	}
};
	playerPaddle.drawPlayer();
	
	let ballObjectYPos = [];
	let ballObjectXPos = [];
		const getBallCoordinates = () =>{
			for(let i = 0; i < ballObjects.length; i++){
				ballObjectYPos[i] = ballObjects[i].yPos;
				ballObjectXPos[i] = ballObjects[i].xPos;
		}
}
		let getClosestBall = () => {
	for(let n = 0; n < numberOfBalls; n++){
		  	 closestXBall = ballObjectXPos.filter((value) => value >=  ballObjectXPos[n]);
	if(closestXBall.length == 1){
			return closestXBall[0];
		}
	}
}
		let closestBallIndex = () => {
	return ballObjectXPos.indexOf(getClosestBall());
}
	let computerYPos = canvas.height/2;
	let computerXPos =	canvas.width * 0.94;
		const computerPaddle = {
	computerWidth: 25,
	drawComputer(){
		const img = document.createElement('img');
		img.src =  paddleSkins[slide];
		context.drawImage(img, computerXPos, computerYPos, this.computerWidth, paddleHeight);
	},
	movePaddleUp(){
	if ((computerYPos  + (paddleHeight/2)) < ballObjectYPos[closestBallIndex()] && getClosestBall() > canvas.width/2) {
	if(difficultyLevel == 'easy'){
		computerYPos = computerYPos + 1;
	}else if(difficultyLevel == 'medium'){
		computerYPos = computerYPos + 2;
	}else if(difficultyLevel == 'impossible'){
		computerYPos = computerYPos + 3;	
			}
		}
	},
	movePaddleDown() {
		if ((computerYPos + (paddleHeight/2)) > ballObjectYPos[closestBallIndex()]  && getClosestBall() > canvas.width/2) {
		if(difficultyLevel == 'easy'){
			computerYPos = computerYPos - 1;
		}else if(difficultyLevel == 'medium'){
			computerYPos = computerYPos - 2;
		}else if(difficultyLevel == 'impossible'){
			computerYPos = computerYPos - 3;	
			}
		}
	}
};
		let changeScreen = () => {		
clearInterval(t);
context.clearRect(0, 0, canvas.width, canvas.height);	
renderMenu();
menuPaddles.render();
menuPaddles.skinEx();
canvas.style.background = 'url('+ menuBackgrounds[slide] +')';
canvas.style.backgroundSize =  '100% 100%';
canvas.removeEventListener('mousedown', changeScreen);
	}
		const endGameScreen = {
	textColor: fontColors[slide],
	headFont: fontSizesEnd +' '  + fontNames[slide],
	subFont: subFontSizesEnd +' '+ fontNames[slide],
	stopBalls(){
	if(cpuScore.length == scoreValue || humanScore.length == scoreValue){
		for(let i =0; i < ballObjects.length; i++){
		ballObjects[i].ballMotionX = 0;
		ballObjects[i].ballMotionY = 0;
		}
	}
},
	drawScreenBackground(){
	if(cpuScore.length == scoreValue || humanScore.length == scoreValue ){
		context.clearRect(0, 0, canvas.width, canvas.height);
		canvas.style.background = 'url(' + menuBackgrounds[slide] + ')';
	  	canvas.style.backgroundSize =  '100% 100%';
	}
},
	humanScreenText(){
	if(humanScore.length == scoreValue ){
		context.fillStyle = this.textColor;
		context.font = this.headFont;	
		context.fillText('Congratulations, you win!', canvas.width/2, canvas.height/2);
		context.font = this.subFont;
		context.fillText('Click to continue', canvas.width/2.5, canvas.height/1.5);
	} 
},
	cpuScreenText(){
	if(cpuScore.length == scoreValue){
		context.fillStyle = this.textColor;
		context.font = this.headFont;		
		context.fillText('AI has prevailed, you lose.', canvas.width/2, canvas.height/2);
		context.font = this.subFont;
		context.fillText('Click to continue', canvas.width/2, canvas.height/1.5);	
	}
},
	returnMenu(){
	if(cpuScore.length == scoreValue || humanScore.length == scoreValue){	
		ballObjects = []; 
		canvas.addEventListener('mousedown', changeScreen);			
	}
}
};	
	class Balls {
		constructor(xPos, yPos, radius, xVelocity, yVelocity){
			this.xPos = xPos;
			this.yPos = yPos;
			this.radius = radius;
			this.xVelocity = xVelocity;
			this.yVelocity = yVelocity;
			this.direction = -1;
			this.speedBoost = 1.2;
			this.imgX = this.xPos - this.radius;
			this.imgY = this.yPos - this.radius;
	}
}
const img = document.createElement('img');
img.src=skinBalls[slide];
Balls.prototype.render = function () {
scoreboard.drawScoreboard();
playerPaddle.drawPlayer();
computerPaddle.drawComputer();
  context.save();
  context.beginPath();
  context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2);
  context.clip();
  context.drawImage(img, this.imgX, this.imgY, this.radius * 2, this.radius * 2);
};
Balls.prototype.motion = function(){
	this.xPos = this.xPos + this.xVelocity;
	this.yPos = this.yPos + this.yVelocity;
	this.imgX = this.imgX + this.xVelocity;
	this.imgY = this.imgY + this.yVelocity;
	};
Balls.prototype.restore = function(){
	context.restore();
}
Balls.prototype.reset = function () {
		if(this.xPos + this.radius >= canvas.width || this.xPos - this.radius <= 0){
			this.xPos = canvas.width/2;
			this.imgX = canvas.width/2 - this.radius;
			this.xVelocity = this.xVelocity * this.direction;	
	}		
};
Balls.prototype.humanScore = function (){
		if(this.xPos + this.radius >= canvas.width){
			humanScore.push(1);
	}
};
Balls.prototype.computerScore = function () {
	if(this.xPos - this.radius <= 0){
		cpuScore.push(1);	
	}
};
	const randomNum = (min, max)=>{
		let number = Math.floor(Math.random() * (max - min) + min);
		if(number === 0){
			number = 1;
		}
		return number;
	}
	let ballObjects = [];	
	let ball = { 
			xPos: [],
			determineXPos(){
				let j = 9;
				for(let i = 0; i < numberOfBalls; i++){
					let x = canvas.width * ( j/10);
					xPos.push(x);
					--j;
				}
			},
			createBallObjects(){
				for(let i = 0; i < numberOfBalls; i++){
					let radius = randomNum(canvas.width/50, canvas.width/30);
					let velocityX = randomNum(-3, 3);
					let velocityY = randomNum(-2, 2);
					let yPos = randomNum(0 + radius, canvas.height - radius);
					let object = new Balls(canvas.width/2, yPos, radius, velocityX, velocityY);				
			if(ballObjects.length == numberOfBalls){
							return;
				}
					ballObjects.push(object);
			}
		}
	}	
	const reduceSpeed =()=>{
		ballObjects.forEach(function(circle){
			while(circle.xVelocity > 3){
				circle.xVelocity = 2;
			}
			while(circle.xVelocity  < -3){
				circle.xVelocity = -2;
			}
		});
	}
	const collision = ()=>{
		ballObjects.forEach(function(circle, index){
			 if(circle.xPos <= playerXPos + 25 + circle.radius){
				 if(circle.yPos >= playerYPos[0] && circle.yPos <= playerYPos[0] + paddleHeight/4){
				 	 circle.xPos = circle.xPos + 3;
					 circle.xVelocity = circle.xVelocity * 1.2;
					 bounceBall(circle, Math.PI);
				 } else if(circle.yPos > playerYPos[0] + paddleHeight/4 && circle.yPos <= playerYPos[0] + paddleHeight * (3/4)){
					circle.xPos = circle.xPos + 3;
					 bounceBall(circle, Math.PI);
			} else if(circle.yPos > playerYPos[0] + paddleHeight * 3/4 && circle.yPos <= playerYPos[0] + paddleHeight * 1.2){
					 circle.xPos = circle.xPos + 3;
					 circle.xVelocity = circle.xVelocity * 1.2;
					 bounceBall(circle, Math.PI);
			}
		}
			if(circle.xPos >= computerXPos - circle.radius && circle.yPos >= computerYPos && circle.yPos <= computerYPos + paddleHeight * 1.2){
				circle.xPos = circle.xPos - 3;
				circle.imgX = circle.imgX - 3;
				bounceBall(circle, 0);
		}
			if(circle.yPos - circle.radius < 0){
				bounceBall(circle, Math.PI/2);
				circle.yPos = circle.radius;
				ballObjects.forEach(function(circle){
				circle.imgX = 	circle.xPos - circle.radius;
				circle.imgY = circle.yPos - circle.radius;
				ballObjects.forEach(function(circle){
				circle.imgX = 	circle.xPos - circle.radius;
				circle.imgY = circle.yPos - circle.radius;	
		});
		});	
			} else if(circle.yPos + circle.radius > canvas.height){
				bounceBall(circle, -Math.PI / 2);
				circle.yPos = canvas.height - circle.radius
				ballObjects.forEach(function(circle){
				circle.imgX = 	circle.xPos - circle.radius;
				circle.imgY = circle.yPos - circle.radius;	
				ballObjects.forEach(function(circle){
				circle.imgX = 	circle.xPos - circle.radius;
				circle.imgY = circle.yPos - circle.radius;	
				});
		});
			}
		ballObjects.forEach(function(other_circle, other_index){
			if(index == other_index){
				return;
			}
			let intersection = circle.radius + other_circle.radius - ballToBallDistance(circle, other_circle);
			if(intersection > 0){
				let angle = ballToBallAngle(circle, other_circle);
				let normal = calcNormalFromAngle(angle);
				bounceBall(circle, angle);
				bounceBall(other_circle, angle + Math.PI);
				
				circle.xPos -= normal[0] * intersection/2;
				circle.yPos -= normal[1] * intersection/2;
				
				other_circle.xPos += normal[0] * intersection/2;
				other_circle.yPos += normal[1] * intersection/2;
				ballObjects.forEach(function(circle){
				circle.imgX = 	circle.xPos - circle.radius;
				circle.imgY = circle.yPos - circle.radius;	
		});
			}
		});
		});
	}
	const bounceBall =(ball, angle)=>{
		let normal = calcNormalFromAngle(angle);
		let velocity = [ball.xVelocity, ball.yVelocity];
		let ul = dotproduct(velocity, normal) / dotproduct(normal, normal);
		let u = [
			normal[0] * ul,
			normal[1] * ul
			];
		let w = [
			velocity[0] - u[0],
			velocity[1] - u[1]
			];
		let new_velocity = [
			w[0] - u[0],
			w[1] - u[1]
			];
		ball.xVelocity = new_velocity[0];
		ball.yVelocity = new_velocity[1];
		
		ballObjects.forEach(function(circle){
		circle.imgX = 	circle.xPos - circle.radius;
		circle.imgY = circle.yPos - circle.radius;	
		});
	}
	const dotproduct = (a, b)=> {
	return a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n)
}

const ballToBallDistance =(ball1, ball2)=> {
	return Math.sqrt((Math.pow(ball2.xPos - ball1.xPos, 2) + Math.pow(ball2.yPos - ball1.yPos, 2)));
}

const ballToBallAngle =(ball1, ball2)=> {
	return Math.atan2(ball2.yPos - ball1.yPos, ball2.xPos - ball1.xPos)
}
const calcNormalFromAngle =(angle)=> {
	return [
		Math.cos(angle),
		Math.sin(angle)
	];
}
let animateBalls = () =>{
	context.clearRect(0, 0, canvas.width, canvas.height);
	ballObjects.forEach(function(ball){
		ball.render();
		ball.motion();
		ball.restore();
		ball.humanScore();
		ball.computerScore();
		ball.reset();
	});
	}
		const createBackground =()=>{
	gameBackground.render();
}
		const createScoreboard =()=>{
	scoreboard.drawScoreboard();
}
		const createComputerPaddle =()=>{
	computerPaddle.movePaddleUp();
	computerPaddle.movePaddleDown();
}
		const createBalls =()=>{
	animateBalls();
	getBallCoordinates();
	ball.createBallObjects();
	collision();
	reduceSpeed();
}
		const createEndGame =()=>{
	endGameScreen.stopBalls();
	endGameScreen.drawScreenBackground();
	endGameScreen.humanScreenText();
	endGameScreen.cpuScreenText();
	endGameScreen.returnMenu();
}
		const animatePong =  () => {
	createBackground();
	createScoreboard();
	 createComputerPaddle();
	createBalls();
	createEndGame();		
}

	let speed = 200;
	let t = setInterval(animatePong, 600/speed);		
}


}
/*
► Music Credit: DJ Quads
Track Name: "EDIT TRACK NAME"
Music by: Dj Quads @ https://soundcloud.com/aka-dj-quads
Official YouTube Channel HERE: https://www.youtube.com/channel/UCusFqutyfTWRqGhC8kHA5uw 
SoundCloud HERE: https://soundcloud.com/aka-dj-quads
Twitter HERE: https://twitter.com/DjQuads
Spotify HERE: https://open.spotify.com/artist/2VZrdImbvB03VWApYtBRr3
Instagram HERE: https://www.instagram.com/djquads
► Music Credit: LAKEY INSPIRED
Track Name: "EDIT TRACK NAME"
Music By: LAKEY INSPIRED @ https://soundcloud.com/lakeyinspired
Official "LAKEY INSPIRED" YouTube Channel HERE: 
https://www.youtube.com/channel/UCOmy8wuTpC95lefU5d1dt2Q
License for commercial use: Creative Commons Attribution 3.0 Unported "Share Alike" (CC BY-SA 3.0) 
Full License HERE - https://creativecommons.org/licenses/by-sa/3.0/legalcode
Music promoted by NCM @ https://www.youtubetomp3musicdownload.com/
► Music Credit: LAKEY INSPIRED
Track Name: "EDIT TRACK NAME"
Music By: LAKEY INSPIRED @ https://soundcloud.com/lakeyinspired
Official "LAKEY INSPIRED" YouTube Channel HERE: 
https://www.youtube.com/channel/UCOmy8wuTpC95lefU5d1dt2Q
License for commercial use: Creative Commons Attribution 3.0 Unported "Share Alike" (CC BY-SA 3.0) 
Full License HERE - https://creativecommons.org/licenses/by-sa/3.0/legalcode
Music promoted by NCM @ https://www.youtubetomp3musicdownload.com/
► Music Credit: LAKEY INSPIRED
Track Name: "EDIT TRACK NAME"
Music By: LAKEY INSPIRED @ https://soundcloud.com/lakeyinspired
Official "LAKEY INSPIRED" YouTube Channel HERE: 
https://www.youtube.com/channel/UCOmy8wuTpC95lefU5d1dt2Q
License for commercial use: Creative Commons Attribution 3.0 Unported "Share Alike" (CC BY-SA 3.0) 
Full License HERE - https://creativecommons.org/licenses/by-sa/3.0/legalcode
Music promoted by NCM @ https://www.youtubetomp3musicdownload.com/
► Music Credit: LAKEY INSPIRED
Track Name: "EDIT TRACK NAME"
Music By: LAKEY INSPIRED @ https://soundcloud.com/lakeyinspired
Official "LAKEY INSPIRED" YouTube Channel HERE: 
https://www.youtube.com/channel/UCOmy8wuTpC95lefU5d1dt2Q
License for commercial use: Creative Commons Attribution 3.0 Unported "Share Alike" (CC BY-SA 3.0) 
Full License HERE - https://creativecommons.org/licenses/by-sa/3.0/legalcode
Music promoted by NCM @ https://www.youtubetomp3musicdownload.com/
*/