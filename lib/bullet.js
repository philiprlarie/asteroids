(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (bulletParams) {
    Asteroids.MovingObject.call(this, {
      'pos': bulletParams.pos,
      'vel': bulletParams.vel,
      'color': bulletParams.color || Bullet.COLOR,
      'radius': bulletParams.radius || Bullet.RADIUS,
      'game': bulletParams.game
    });
  };

  Bullet.COLOR = "#009933";
  Bullet.RADIUS = 3;

  Asteroids.Utils.inherits(Asteroids.Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };

  Bullet.prototype.isWrappable = false;

})();
