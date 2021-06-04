import Map from "./map";
import Weapon from "./weapon.js";
import Player from "./player.js";
import $ from "jquery";

export default class Game {
  constructor() {
    this.listPlayer = [];
    this.listWeapon = [];
    const player1 = new Player({
      name: "Obscura",
      image: "images/Vampire_blue.png",
      color: "blue",
      position: {
        x: 0,
        y: 0,
      },
    });
    const player2 = new Player({
      name: "Edward",
      image: "images/Vampire_red.png",
      color: "red",
      position: {
        x: 5,
        y: 9,
      },
    });
    this.turnPlayer = 0;
    this.listPlayer.push(player1, player2);
    this.listWeapon.push(new Weapon("Crucifix", "images/Cross_night.png", 45));
    this.listWeapon.push(new Weapon("Arbalète", "images/arbalette.png", 25));
    this.listWeapon.push(new Weapon("Fouet", "images/whip.png", 15));
    this.listWeapon.push(new Weapon("Epée en argent", "images/sword.png", 35));
    this.listWeapon.push(new Weapon("Epée Légendaire", "images/legendary_sword.png", 50));
    this.map = new Map(this.listPlayer, this.listWeapon);
    this.initGame();
  }
  // fonction va contenir un await qui va attendre une Promesse comme valeur de retour
  async gameLoop() {
    while (!this.gameOver) {
      if (!this.map.isPlayerAside(1)) {
        //console.log("not aside");
        let position = this.getCurrentTurnPlayer().position;
        this.map.highlight(position.x, position.y);
        let clickValide = await this.map.handleClick();
        this.map.clearHighlight();
        if (clickValide) {
          this.switchTurnPlayer();
        }
      } else {
        //console.log("aside");
        this.map.printAction();
        await this.map.handleAction();
        this.map.deleteAction();
        this.switchTurnPlayer();
      }
    }
  }
  initGame() {
    this.map.initMap();
    this.map.generatePlayer();
    this.map.generateRock(10);
    this.map.generateWeapon();
    this.map.showMap();
    setTimeout(() => {
      this.gameLoop();
    }, 3000);
  }
  switchTurnPlayer() {
    let areaPlayerInactive = $("#areaPlayer" + parseInt(this.turnPlayer + 1));
    this.turnPlayer = +!this.turnPlayer; // Conversion de type Number(!this.turnPlayer)
    let areaPlayerActive = $("#areaPlayer" + parseInt(this.turnPlayer + 1));
    areaPlayerActive.css("border", "10px solid green");
    areaPlayerInactive.css("border", "none");
    areaPlayerActive.children(".joueurActif").css("display", "block");
    areaPlayerInactive.children(".joueurActif").css("display", "none");
    
  }
  getCurrentTurnPlayer() {
    return this.listPlayer[this.turnPlayer];
  }
  getCurrentOpponentTurnPlayer(){
    return this.listPlayer[(this.turnPlayer + 1) % 2];
  }
}
