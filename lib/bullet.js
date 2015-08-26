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

  // TODO make cooler new velocity that takes into account bullet velocity
  // TODO refactor this to grab math stuff into utils
  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(this);
      if (otherObject.radius === Asteroids.Asteroid.SMALL_RADIUS){
        this.game.remove(otherObject);
      } else {
        var leftVel = [1/Math.sqrt(2) * otherObject.vel[0] - 1/Math.sqrt(2) * otherObject.vel[1],
                       1/Math.sqrt(2) * otherObject.vel[0] + 1/Math.sqrt(2) * otherObject.vel[1]];
        var leftParams = {
          'pos': otherObject.pos,
          'game': this.game,
          'radius': Asteroids.Asteroid.SMALL_RADIUS,
          'vel': leftVel,
          'color': "#FF99FF"
        };

        var rightVel = [1/Math.sqrt(2) * otherObject.vel[0] + 1/Math.sqrt(2) * otherObject.vel[1],
                             -1/Math.sqrt(2) * otherObject.vel[0] + 1/Math.sqrt(2) * otherObject.vel[1]];
        var rightParams = {
          'pos': otherObject.pos,
          'game': this.game,
          'radius': Asteroids.Asteroid.SMALL_RADIUS,
          'vel': rightVel,
          'color': "#FF99FF"
        };


        var leftAsteroid = new Asteroids.Asteroid(leftParams);
        var rightAsteroid = new Asteroids.Asteroid(rightParams);

        this.game.remove(otherObject);
        this.game.add(leftAsteroid);
        this.game.add(rightAsteroid);
      }
    }
  };

  Bullet.prototype.isWrappable = false;


})();
