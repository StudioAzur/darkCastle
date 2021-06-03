import $ from "jquery";
import Tile from "./tile.js";
import Rock from "./rock.js";
import Game from "./game.js";
import Player from "./player.js";

export default class Map {
  constructor(listPlayer, listWeapon) {
    this.listPlayer = listPlayer;
    this.listWeapon = listWeapon;
    this.map = null;
    this.row = 10;
    this.column = 10;
  }
  // MISE EN MEMOIRE D'UN TABLEAU DE 10 * 10 CONTENANT DES OBJETS TILE
  initMap() {
    this.map = Array(10);
    for (let i = 0; i < 10; i++) {
      this.map[i] = new Array(10);
    }
    for (let y = 0; y < this.row; y++) {
      for (let x = 0; x < this.column; x++) {
        this.map[x][y] = new Tile(x, y);
      }
    }
  }

  showMap() {
    $("#castle").empty(); // A enlever
    // GENERATION DES LIGNES
    for (let y = 0; y < this.row; y++) {
      const trElt = document.createElement("tr");
      trElt.id = `row${y}`;
      $("#castle").append(trElt);
      // GENERATION DES COLONNES
      for (let x = 0; x < this.column; x++) {
        /* const cell = document.querySelector(`#${x}-${y}`);
        const cellContent = this.map[x][y].getDisplayContent();
          if(cellContent){
            //On doit afficher quelque chose
            if(cell.innerHTML != cellContent){
              // La case affiché à un contenu différent de celui sensé être affiché.
              cell.innerHTML = cellContent;
            }
            
          }else{
            //La case est sensé être vide
            if(cell.innerHTML){
              // La case affiché contient quelque chose, on supprime ce contenu
              cell.innerHTML = "";
            }
          }
        */
        const tdElt = document.createElement("td");
        tdElt.id = `${x}-${y}`;
        // RECUPERE LA VALEUR COURANTE DE TILE
        const currentTile = this.map[x][y];
        tdElt.innerHTML = currentTile.getDisplayContent();
        $("#row" + y).append(tdElt);
        /* tdElt.textContent = `${x}-${y}`;   */
        // Affichage des caractéristiques des deux personnages
        let areaPlayer1 = $("#areaPlayer1");
        let areaPlayer2 = $("#areaPlayer2");
        let nameJ1 = $("li.item-1-j1");
        let nameJ2 = $("li.item-1-j2");
        nameJ1.text(this.listPlayer[0].name);
        nameJ2.text(this.listPlayer[1].name);
        let weaponJ1 = $("li.item-2-j1");
        let weaponJ2 = $("li.item-2-j2");
        weaponJ1.text(
          this.listPlayer[0].held ? this.listPlayer[0].held.name : "Griffes"
        );
        weaponJ2.text(
          this.listPlayer[1].held ? this.listPlayer[1].held.name : "Griffes"
        );
        let imageWeaponJ1 = $("li.item-3-j1 img");
        let imageWeaponJ2 = $("li.item-3-j2 img");
        imageWeaponJ1.attr(
          "src",
          this.listPlayer[0].held
            ? this.listPlayer[0].held.image
            : "images/fangs_night.png"
        );
        imageWeaponJ2.attr(
          "src",
          this.listPlayer[1].held
            ? this.listPlayer[1].held.image
            : "images/fangs_night.png"
        );
        let degatJ1 = $("li.item-4-j1");
        let degatJ2 = $("li.item-4-j2");
        degatJ1.text(
          this.listPlayer[0].held
            ? this.listPlayer[0].held.degats
            : this.listPlayer[0].degats + " dégats"
        );
        degatJ2.text(
          this.listPlayer[1].held
            ? this.listPlayer[1].held.degats
            : this.listPlayer[1].degats + " dégats"
        );
        let lifeJ1 = $("li.item-5-j1");
        let lifeJ2 = $("li.item-5-j2");
      }
    }
  }
  generateElement(positions, image) {
    // GENERATION GENERIQUE
    positions.forEach((currentTile) => {
      Tile.show(currentTile.x, currentTile.y, image);
    });
  }

  random() {
    let randomRow = Math.floor(Math.random() * this.row);
    let randomColumn = Math.floor(Math.random() * this.column);
    return {
      x: randomRow,
      y: randomColumn,
    };
  }

  generateRandomPosition() {
    let position = this.random();
    let tile = this.map[position.x][position.y];
    while (!tile.isFree()) {
      position = this.random();
      tile = this.map[position.x][position.y];
    }
    return position;
  }

  generateRock(nbRock) {
    for (let i = 0; i < nbRock; i++) {
      let position = this.generateRandomPosition();
      let currentTile = this.map[position.x][position.y];
      currentTile.setRock(new Rock());
      /* currentTile.show(currentTile.getRock().image); */
    }
  }

  generateWeapon() {
    for (let i = 0; i < this.listWeapon.length; i++) {
      let position = this.generateRandomPosition();
      let currentTile = this.map[position.x][position.y];
      currentTile.setWeapon(this.listWeapon[i]);
    }
  }
  generatePlayer() {
    for (let i = 0; i < this.listPlayer.length; i++) {
      let position = this.generateRandomPosition();
      let currentTile = this.map[position.x][position.y];
      currentTile.setPlayer(this.listPlayer[i]);
      this.listPlayer[i].position = position;
    }
  }

  highlightRight(x, y) {
    this.availableTilesRight = [];
    for (let j = 1; j <= 3; j++) {
      if (x + j <= 9 && x >= 0) {
        let nextTile = this.map[x + j][y];
        if (!nextTile) return;
        if (nextTile.isFree()) {
          this.availableTilesRight.push(nextTile);
          nextTile.highBlue();
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }

  highlightLeft(x, y) {
    this.availableTilesLeft = [];
    for (let j = 1; j <= 3; j++) {
      if (x - j <= 9 && x >= 0 && x - j >= 0) {
        //console.log(this.map, x , j , y);
        let nextTile = this.map[x - j][y];
        if (!nextTile) return;
        if (nextTile.isFree()) {
          this.availableTilesLeft.push(nextTile);
          nextTile.highBlue();
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }

  highlightDown(x, y) {
    this.availableTilesDown = [];
    for (let j = 1; j <= 3; j++) {
      if (y + j <= 9 && y >= 0) {
        let nextTile = this.map[x][y + j];
        if (!nextTile) return;
        if (nextTile.isFree()) {
          this.availableTilesDown.push(nextTile);
          nextTile.highBlue();
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }

  highlightUp(x, y) {
    this.availableTilesUp = [];
    for (let j = 1; j <= 3; j++) {
      if (y >= 0 && y - j >= 0) {
        let nextTile = this.map[x][y - j];
        if (!nextTile) return; // On bloque le code si pas de nextTile
        if (nextTile.isFree()) {
          this.availableTilesUp.push(nextTile);
          nextTile.highBlue();
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }

  highlight(x, y) {
    this.highlightUp(x, y);
    this.highlightDown(x, y);
    this.highlightRight(x, y);
    this.highlightLeft(x, y);
  }

  movePlayer(player, position) {
    if (this.map[position.x][position.y].getWeapon()) {
      console.log("found Weapon");
      const item = this.map[position.x][position.y].getWeapon();
      const playerItem = player.held;
      player.held = item; // nouvelle arme
      this.map[position.x][position.y].setWeapon(playerItem);
    }
    this.map[player.position.x][player.position.y].setPlayer(null);

    player.setPosition(position);
    this.map[position.x][position.y].setPlayer(player);
  }

  tryToMove(position) {
    console.log(
      this.availableTilesDown,
      this.availableTilesLeft,
      this.availableTilesRight,
      this.availableTilesUp
    );
    let positionAvailable = this.availableTilesLeft.concat(
      this.availableTilesDown,
      this.availableTilesUp,
      this.availableTilesRight
    );
    for (let i = 0; i < positionAvailable.length; i++) {
      let currentTile = positionAvailable[i];
      if (currentTile.isPositionedAt(position)) {
        this.movePlayer(window.Game.getCurrentTurnPlayer(), position);
        console.log("il faut déplacer le joueur à la postion " + position);
        return true;
      }
    }
    return false;
  }

  handleClick() {
    return new Promise((resolve, reject) => {
      $("td").on(
        "click",
        (e) => {
          console.log(e.target.textContent);
          const splitPosition = e.target.id.split("-");
          console.log(e.target);
          const x = Number(splitPosition[0]);
          const y = Number(splitPosition[1]);
          let position = { x, y };
          let clicOk = this.tryToMove(position);
          this.showMap();
          resolve(clicOk);
        } /* .bind(this) */
      );
    });
  }

  clearHighlight() {
    $("td").off("click");
  }
  playerAside(range) {
    // renommer
    const player1 = this.listPlayer[0].position;
    const player2 = this.listPlayer[1].position;
    if (Math.abs(player1.x - player2.x) > range) return false;
    if (Math.abs(player1.y - player2.y) > range) return false;
    return true;
  }

  printAction() {
    // Afficher les deux boutons attaque et défense
    let arena = $("#buttonArea");
    let attack = document.createElement("input");
    let shield = document.createElement("input");
    attack.setAttribute("id", "attack");
    attack.setAttribute("type", "button");
    attack.setAttribute("value", "Attaque");
    attack.setAttribute("class", "available");
    shield.setAttribute("id", "shield");
    shield.setAttribute("type", "button");
    shield.setAttribute("value", "Défense");
    shield.setAttribute("class", "available");
    arena.append(attack, shield);
  }

  handleAction() {
    // Verifier si le joueur à cliqué
    return new Promise((resolve, reject) => {
      this.handleAttack(resolve);
      this.handleShield(resolve);
    });
  }

  handleAttack(resolve) {
    $("#attack").on("click", (e) => {
      let player = window.Game.getCurrentTurnPlayer();
      let opponent = window.Game.getCurrentOpponentTurnPlayer();
      let degats = 0;
      degats = player.held.degats;
      let lifeRest = 0;
      if(opponent.shield == 1){
        lifeRest = opponent.life -= degats / 2;
        opponent.shield = 0;
      }
      else{
        lifeRest = opponent.life -= degats;
      }
      if(player.name ==  "Obscura"){
        $("#healthJ2").val(lifeRest);
      }else{
        $("#healthJ1").val(lifeRest);
      }
      console.log()
      if(lifeRest <= 0){
        this.gameOver();
      }
      resolve();
    });
  }

  handleShield(resolve) {
    $("#shield").on("click", (e) => {
      let player = window.Game.getCurrentTurnPlayer();
      let degats = 0; 
      player.shield = 1
      resolve();
    });
  }

  deleteAction() {
    // supprimer les boutons pour le joueur suivant
    $(".available").remove();
  }
  gameOver(){
    let activePlayer = window.Game.getCurrentTurnPlayer();
    alert(activePlayer.name +  " gagne la partie");
    location.reload();
  }
}
