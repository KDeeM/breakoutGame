class Level1 extends Phaser.Scene{
  constructor(){
    super("Level1");
    this.__pregameTime = 3;
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
    };
    this._vars_ = {};
  }

  create(){
    // walls
    this.upperWall = this.physics.add.staticImage(glb.config.width/2, 0, "wall").setScale(1, 0.5).refreshBody();
    this.lowerWall = this.physics.add.staticImage(glb.config.width/2, (glb.config.height), "wall").setScale(1, 0.5).refreshBody();

    // create ball
    this.ball = this.physics.add.image(glb.config.width/2, glb.config.height/2, "ball").setScale(0.2).setBounce(1).setCollideWorldBounds(true);

    this.physics.add.collider(this.ball, this.upperWall);
    this.physics.add.collider(this.ball, this.lowerWall, this.failedGame, null, this);

    // create paddle
    this.paddle = this.physics.add.image(160, 420, "paddle").setScale(0.2).refreshBody().setImmovable(true).setCollideWorldBounds(true);
    this.physics.add.collider(this.ball, this.paddle);

    // create motion keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // create tiles
    this._vars_.tileValue = 10;
    this.tiles = this.physics.add.staticGroup();
    this.createTiles();
    this.physics.add.collider(this.ball, this.tiles, this.tileDestroyed, null, this);

    // score
    this._vars_.score = 0
    this.txt_score = this.add.text(10, 8, "Score: 0");

    // countdown timer
    this._vars_.countdownText = 3
    this.txt_countdown = this.add.text(glb.config.width/2, glb.config.height/2, this._vars_.countdownText, {fontSize: "48px", fill: "#ff0000"}).setOrigin(0.5);
    this.countdown(this._vars_.countdownText).then(
      () => {
        this.txt_countdown.setAlpha(0);
        this.setBallInitialVelocity(this.ball);
      }
    );
  }

  update(){
    this.movePaddle();
  }

  setBallInitialVelocity(ball){
    ball.setVelocityY(200);
    ball.setVelocityX(Phaser.Math.Between(-200, 200));
  }

  countdown(time){
    return new Promise(
      (res, rej) => {
        if(time <= 0){
          res("done");
        }else{
          this.updatText(time, this.txt_countdown);
          timer(1).then(
            () => {
              this.countdown(time - 1).then(
                () => {
                  res("done");
                }
              )
            }
          )
        }
      }
    )
  }

  updatText(text, textObject){
    textObject.setText(text);
  }

  failedGame(){
    this.endGame();
  }

  endGame(win = false){
    this.physics.pause();
    let data = {
      score: this._vars_.score,
      success: win
    };
    this.scene.start('endScreen', data);
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
    this._vars_.score += this._vars_.tileValue;
    this.updateScore();
    if(this.tiles.countActive(true) == 0){
      this.endGame(true);
    }
  }

  updateScore(){
    this.updatText("Score: " + this._vars_.score, this.txt_score);
    return;
  }
}