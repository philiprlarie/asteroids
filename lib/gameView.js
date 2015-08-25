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
    var img = new Image();
    var ctx = this.ctx;
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = './lib/space_pic.jpg';

    this.bindKeyHandlers();
    // render at 60 FPS
    window.setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx, img);
    }).bind(this), 1000 / 60);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var game = this.game;
    key('a', function() { game.ship.power([-1, 0]); });
    key('d', function() { game.ship.power([1, 0]); });
    key('w', function() { game.ship.power([0, -1]); });
    key('s', function() { game.ship.power([0, 1]); });
    key('space', function() { game.ship.fireBullet(); });


  };

})();
