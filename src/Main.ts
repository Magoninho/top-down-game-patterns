import Game from "./Game.js";

let canvas: HTMLCanvasElement = document.getElementById("game-canvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d");

async function start() {
	let game = new Game(ctx);
	await game.start();
}

start();