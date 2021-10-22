let glb = {
  config : {
    width: 320,
    height: 480,
    type: Phaser.AUTO,
    backgroundColor: 0xD4F1F4,
    physics: {
      default: 'arcade',
      // arcade: {
      //   debug: true
      // }
    },
    scene: [startScreen, Level1, endScreen]
  }
}

window.addEventListener("load", init);

function init(){
  glb.game = new Phaser.Game(glb.config);
}