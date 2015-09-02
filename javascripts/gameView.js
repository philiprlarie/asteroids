(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  GameView = Asteroids.GameView = function (game, canvasEl) {
    this.game = game;
    this.ctx = canvasEl.getContext("2d");
    this.pause = false;
  };

  GameView.prototype.start = function () {
    var backgroundImg = new Image();
    backgroundImg.src = './images/space_pic.jpg';
    var ctx = this.ctx;
    backgroundImg.onload = function () {
      ctx.drawImage(backgroundImg, 0, 0);
    };

    keysBeingPressed = {};
    var gameView = this;
    onkeydown = onkeyup = function(e) {
      e = e || event;
      keysBeingPressed[e.keyCode] = e.type == 'keydown';

      // pause functionality
      if (e.keyCode == 27 && e.type == 'keydown') {
        if (gameView.pause) {
          gameView.pause = false;
          $('.pause-message').html("");
        } else {
          gameView.pause = true;
          $('.pause-message').html("<div id='pause'>Paused</div>");
        }
      }
    };

    // render at 60 FPS
    window.setInterval((function () {
      this.bindKeyHandlers();
      if (!this.pause && !this.game.gameOver) {
        this.game.step();
        this.game.draw(this.ctx, backgroundImg);
      }
    }).bind(this), 1000 / 60);
  };

  GameView.prototype.bindKeyHandlers = function () {
    if (!this.pause) {
      var game = this.game;
      if (keysBeingPressed[87]) { game.ship.thrust(0.05); }
      if (keysBeingPressed[65]) { game.ship.turn(-1); }
      if (keysBeingPressed[68]) { game.ship.turn(1); }
      if (keysBeingPressed[13]) { game.ship.fireBullet(); }
    }
  };
})();
