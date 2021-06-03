import $ from "jquery";
import Game from "./game.js";

//Je génère mes joueurs
// Ensuite je génère mes armes en fonction de la pos des joueurs
// Ensuite je génère mes obstacles en fonction de mes joueurs + mes armes

$(function () {
  window.Game = new Game();
  

  /* const vampire = map.generateRandomPosition(2, 'vampire');
  map.generateElement(vampire, "images/vampire.jpg");
  const toto = map.generateRandomPosition(1, 'toto');
  map.generateElement(toto, "images/toto.jpg");
  const wall = [].concat(...map.map)
    .filter(item => item.image === "wall")
    .map(item => item.position);
  map.generateElement(wall, "images/wall.png"); */

});
