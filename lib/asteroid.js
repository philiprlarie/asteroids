(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }



  var Asteroid = Asteroids.Asteroid = function (asteroidParams) {
    Asteroids.MovingObject.call(this, {
      'pos': asteroidParams.pos,
      'vel': asteroidParams.vel || Asteroids.Utils.randomVec(Math.floor(1 + Math.random() * 4)),
      'color': asteroidParams.color || Asteroid.COLOR,
      'radius': asteroidParams.radius || Asteroid.BIG_RADIUS,
      'game': asteroidParams.game
    });
  };

  Asteroid.COLOR = "#666699";
  Asteroid.BIG_RADIUS = 30;
  Asteroid.SMALL_RADIUS = 20;

  Asteroids.Utils.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Bullet) {
      otherObject.collideWith(this);
    }
  };


})();
