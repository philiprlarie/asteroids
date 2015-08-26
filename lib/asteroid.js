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
      'game': asteroidParams.game,
      'faceDir': Math.PI/2
    });
    var approxGaussian = 0.3 * (Math.random() - Math.random() + Math.random() - Math.random() + Math.random() - Math.random() + Math.random() - Math.random() + Math.random() - Math.random()+ Math.random() - Math.random() + Math.random() - Math.random()+ Math.random() - Math.random());
    this.rotationRate =  -2*3.14/60 * approxGaussian;
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

  Asteroid.prototype.draw = function (ctx) {
    var asteroidImg = new Image();
    if (this.radius === Asteroid.BIG_RADIUS) {
      asteroidImg.src = './lib/big_rock.png';
    } else {
      asteroidImg.src = './lib/small_rock.png';
    }

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    // what is the size?
    this.faceDir += this.rotationRate;
    ctx.rotate(this.faceDir);
    // then draw the image back and up

    if (this.radius === Asteroid.BIG_RADIUS) {
      ctx.drawImage(asteroidImg, -30, -30, 60, 60);
    } else {
      ctx.drawImage(asteroidImg, -20, -20, 40, 40);
    }
    ctx.restore();
  };


})();
