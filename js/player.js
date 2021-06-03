export default class Player {
  constructor(settings) {
    if(!settings.name) throw new Error ("Veuillez assigner un nom");
    if(!settings.image) throw new Error("Veuillez assigner une image");
    this.color = "";
    this.position = { x : null, y : null };
    this.degats = 10;
    this.held = {
      name:"Crocs",
      image: "images/fangs_night.png",
      degats: 15
    };
    this.shield = 0;
    this.life = 100;
    Object.assign(this, settings);
  }
  setPosition(position) {
    this.position = position;
  }
  /*  initAdversaire(adversaire){
        this.adversaire = adversaire;
    } */
}
