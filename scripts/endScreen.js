class endScreen extends Phaser.Scene{
  constructor(){
    super("endScreen");
  }

  init(data){
    this.params = data;
  }

  create(){
    this.endingText = this.params.success ? "Victory" : "Defeat";
    console.log(this.params);

    // game over state
    this.txt_ending = this.add.text(glb.config.width / 2, (glb.config.height / 2) - 100, this.endingText, {fontSize: "48px", fill : "#10ad96"}).setOrigin(0.5);

    // final score text
    this.txt_score = this.add.text(glb.config.width / 2, glb.config.height / 2, this.params.score, {fontSize: "72px", fill : "#10ad96"}).setOrigin(0.5);

    // reset button
    this.btn_reset = this.physics.add.staticImage(glb.config.width / 2, (glb.config.height / 2) + 100, "tile").setScale(0.5).refreshBody().setInteractive();
    this.btn_reset
      .on("pointerdown", () => {this.restartGame();})
      .on("pointerdown", () => {this.buttonHoverOn();})
      .on("pointerdown", () => {this.buttonHoverOff();})

    // reset button text
    this.btn_text = this.add.text(glb.config.width / 2, (glb.config.height / 2) + 100, "RESET", {fontSize: "36px"}).setOrigin(0.5);
  }

  restartGame(){
    this.scene.start('Level1');
  }

  buttonHoverOn(){
    this.btn_reset.setScale(0.55).refreshBody();
  }

  buttonHoverOff(){
    this.btn_reset.setScale(0.5).refreshBody();;
  }

}