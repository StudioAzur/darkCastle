export default class Tile {
  constructor(x, y) {
    this.position = { x, y };
    this.content = "images/Rock_tile_night.png";
    this.rock = null;
    this.weapon = null;
    this.player = null;
  }
  setContent(content) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }

  getRock() {
    return this.rock;
  }

  getDisplayContent() {
    const element = document.getElementById(
      `${this.position.x}-${this.position.y}`
    );
    let content = `${this.position.x}-${this.position.y}`;
    content = `<div class="container">
    <img src="${this.content}" alt="" class="floor">
</div>`;
    if (this.rock != null) {
      content = `<div class="container">
      <img src="${this.content}" alt="" class="floor">
      <img src="${this.rock.image}" alt="" class="rock">
  </div>`;
    }
    if (this.weapon != null) {
      content = `<div class="container">
      <img src="${this.content}" alt="" class="floor">
      <img src="${this.weapon.image}" alt="" class="weapon">
  </div>`;
    }
    if (this.player != null) {
      content = `<div class="container">
      <img src="${this.content}" alt="" class="floor">
      <img src="${this.player.image}" alt="" class="vampire">
  </div>`;
    }
    return content;
  }
  highBlue() {
    const element = document.getElementById(
      `${this.position.x}-${this.position.y}`
    );
    element.classList.add("move");
  }
  // showWay
  addWall() {}

  isFree() {
    if (this.rock != null) {
      return false;
    }
    if (this.player != null) {
      return false;
    }
    return true;
  }

  isPositionedAt(position) {
    //let currentPosition =  `${this.position.x}-${this.position.y}`;
    console.log(position);
    console.log(this.position);
    if (position.x == this.position.x && position.y == this.position.y) {
      console.log("position trouvé");
      return true;
    }
    console.log("position PAS trouvé");
    return false;
  }

  setRock(rock) {
    this.rock = rock;
  }

  setWeapon(weapon) {
    this.weapon = weapon;
  }

  getWeapon() {
    return this.weapon;
  }

  setPlayer(player) {
    this.player = player;
    //this.player.position = {...this.position}; // spread opérateur ES6
  }
}
