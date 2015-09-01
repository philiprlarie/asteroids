(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (asteroidParams) {
    var speed = Asteroids.Utils.normalDist();
    if (Math.abs(speed) < 1) {
      speed = 1;
    }

    Asteroids.MovingObject.call(this, {
      'pos': asteroidParams.pos || Asteroids.Utils.randomEdgePos(),
      'vel': asteroidParams.vel || Asteroids.Utils.randomVec(speed),
      'radius': asteroidParams.radius || Asteroid.BIG_RADIUS,
      'game': asteroidParams.game,
      'faceDir': Math.PI/2
    });
    this.rotationRate =  0.05 * Asteroids.Utils.normalDist();
  };

  Asteroid.BIG_RADIUS = 60;
  Asteroid.SMALL_RADIUS = 40;

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
      asteroidImg.src = './images/big_rock.png';
    } else {
      asteroidImg.src = './images/small_rock.png';
    }

    this.faceDir += this.rotationRate;

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.faceDir);

    if (this.radius === Asteroid.BIG_RADIUS) {
      ctx.drawImage(asteroidImg, -60, -60, 120, 120);
    } else {
      ctx.drawImage(asteroidImg, -40, -40, 80, 80);
    }
    ctx.restore();
  };


})();
