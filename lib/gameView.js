(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  GameView = Asteroids.GameView = function (game, canvasEl) {
    this.game = game;
    this.ctx = canvasEl.getContext("2d");
  };

  GameView.prototype.start = function () {
    // get a 2d canvas drawing context. The canvas API lets us call
    // a `getContext` method on a canvas DOM element.
    var backgroundImg = new Image();
    backgroundImg.src = './lib/space_pic.jpg';
    var ctx = this.ctx;
    backgroundImg.onload = function () {
      ctx.drawImage(backgroundImg, 0, 0);
    };

    // render at 60 FPS
    keysBeingPressed = {}; // Or you could call it "key"
    onkeydown = onkeyup = function(e) {
      e = e || event; // to deal with IE
      keysBeingPressed[e.keyCode] = e.type == 'keydown';
    };

    window.setInterval((function () {
      this.bindKeyHandlers();
      this.game.step();
      this.game.draw(this.ctx, backgroundImg);
    }).bind(this), 1000 / 60);
  };

  // TODO make this better so pressing two keys at a time doesn't f up
  GameView.prototype.bindKeyHandlers = function () {


    var game = this.game;
    if (keysBeingPressed[87]) { game.ship.thrust(0.05); }
    if (keysBeingPressed[65]) { game.ship.turn(1); }
    if (keysBeingPressed[68]) { game.ship.turn(-1); }
    if (keysBeingPressed[32]) { game.ship.fireBullet(); }


  };

})();
