class Level1 extends Phaser.Scene{
  constructor(){
    super("Level1");
    this.__gameOver = false;
    this.__paddleSpeed = 200;
    this.__tile = {
      level1 : {
        scale : 0.15,
        y_start : 40,
        y_step : 30,
        y_repeat : 5,
        x_start : 25,
        x_step: 70,
        x_repeat: 4
      }
    }
  }

  preload(){
    this.load.image("ball", "../images/ball.png");
    this.load.image("paddle", "../images/paddle.png");
    this.load.image("tile", "../images/tile.png");
    this.load.image("wall", "../images/wall.png");
  }

  create(){
    // walls
    this.upperWall = this.physics.add.staticImage(glb.config.width/2, 0, "wall").setScale(1, 0.5).refreshBody();
    this.lowerWall = this.physics.add.staticImage(glb.config.width/2, (glb.config.height), "wall").setScale(1, 0.5).refreshBody();

    // create ball
    this.ball = this.physics.add.image(glb.config.width/2, glb.config.height/2, "ball").setScale(0.2).setBounce(1).setCollideWorldBounds(true);
    this.setBallInitialVelocity(this.ball);

    this.physics.add.collider(this.ball, this.upperWall);
    this.physics.add.collider(this.ball, this.lowerWall, this.endGame, null, this);

    // create paddle
    this.paddle = this.physics.add.image(160, 420, "paddle").setScale(0.2).refreshBody().setImmovable(true).setCollideWorldBounds(true);
    this.physics.add.collider(this.ball, this.paddle);

    // create motion keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // create tiles
    this.tiles = this.physics.add.staticGroup();
    this.createTiles();
    this.physics.add.collider(this.ball, this.tiles, this.tileDestroyed, null, this);
  }

  update(){
    this.movePaddle();
  }

  setBallInitialVelocity(ball){
    ball.setVelocityY(200);
    ball.setVelocityX(Phaser.Math.Between(-200, 200));
  }

  endGame(){
    this.__gameOver = true;
    console.log("GameOver");
  }

  movePaddle(){
    if(this.cursors.left.isDown){
      this.paddle.setVelocityX(-this.__paddleSpeed);
    }
    else if(this.cursors.right.isDown){
      this.paddle.setVelocityX(this.__paddleSpeed);
    }else{
      this.paddle.setVelocityX(0);
    }
    
  }

  createTiles(){
    let tile
    let x_pos = this.__tile.level1.x_start;
    for(let i = 1; i <= this.__tile.level1.x_repeat; i++){
      let j = 1;
      let y_pos = this.__tile.level1.y_start;
      for(; j <= this.__tile.level1.y_repeat; j++){
        tile = this.physics.add.staticImage(x_pos , y_pos, "tile").setOrigin(0, 0);
        tile.setScale(this.__tile.level1.scale).refreshBody();
        this.tiles.add(tile);
        y_pos += this.__tile.level1.y_step;
      }
      x_pos += this.__tile.level1.x_step;
    }
    return;
  }

  tileDestroyed(ball, tile){
    tile.disableBody(true, true);
    tile.setTint(0xff00ff);
    if(this.tiles.countActive(true) == 0){
      this.gameWon();
    }
  }

  gameWon(){
    console.log("game won");
  }

}