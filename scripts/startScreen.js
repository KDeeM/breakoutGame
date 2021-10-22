class startScreen extends Phaser.Scene{
  constructor(){
    super("startScreen");
    this.__variables = {
      buttonText : "Start Game"
    }
  }

  preload(){
    this.load.image("ball", "../images/ball.png");
    this.load.image("paddle", "../images/paddle.png");
    this.load.image("tile", "../images/tile.png");
    this.load.image("wall", "../images/wall.png");
  }

  create(){
    this.startButton = this.physics.add.staticImage(glb.config.width / 2, glb.config.height / 2, "wall").setScale(0.5).refreshBody().setInteractive();
    this.startText = this.add.text(glb.config.width / 2, glb.config.height / 2, this.__variables.buttonText, {fontSize: '24px'}).setOrigin(0.5);

    this.startButton
      .on("pointerdown", () => {this.startGame()})
      .on("pointerover", () => {this.buttonHoverOn()})
      .on("pointerout", () => {this.buttonHoverOff()})
  }

  update(){

  }

  startGame(){
    this.scene.start('Level1');
  }

  buttonHoverOn(){
    this.startButton.setScale(0.55).refreshBody();
  }

  buttonHoverOff(){
    this.startButton.setScale(0.5).refreshBody();;
  }
}