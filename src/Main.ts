import Game from "./Game.js";

let canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d");

async function start() {
	document.getElementById("run-game").style.display = "none";
	(document.getElementById("theme") as HTMLAudioElement).play();

	let game = new Game(ctx);
	await game.start();
}

const DEBUG = true;
if (!DEBUG) {
	document.getElementById("run-game").addEventListener("click", start);
} else {
	start();
}