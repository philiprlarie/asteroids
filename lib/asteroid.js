(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (asteroidParams) {
    Asteroids.MovingObject.call(this, {
      'pos': asteroidParams.pos || Asteroids.Utils.randomEdgePos(),
      'vel': asteroidParams.vel || Asteroids.Utils.randomVec(1 + 2 * (Asteroids.Utils.normalDist())),
      'radius': asteroidParams.radius || Asteroid.BIG_RADIUS,
      'game': asteroidParams.game,
      'faceDir': Math.PI/2
    });
    this.rotationRate =  0.05 * Asteroids.Utils.normalDist();
  };

  Asteroid.BIG_RADIUS = 30;
  Asteroid.SMALL_RADIUS = 20;

  Asteroids.Utils.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.die();
    } else if (otherObject instanceof Asteroids.Bullet) {
      otherObject.collideWith(this);
    }
  };

  Asteroid.prototype.draw = function (ctx) {
    var asteroidImg = new Image();
    if (this.radius === Asteroid.BIG_RADIUS) {
      asteroidImg.src = './lib/pics/big_rock.png';
    } else {
      asteroidImg.src = './lib/pics/small_rock.png';
    }

    this.faceDir += this.rotationRate;

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.faceDir);

    if (this.radius === Asteroid.BIG_RADIUS) {
      ctx.drawImage(asteroidImg, -30, -30, 60, 60);
    } else {
      ctx.drawImage(asteroidImg, -20, -20, 40, 40);
    }
    ctx.restore();
  };


})();
