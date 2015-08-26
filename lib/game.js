(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship(this.getInitialParams());
    // first element is number of big asteroids, second is number of small asteroids
    this.score = [0,0];
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 700;
  Game.NUM_ASTEROIDS = 70;

  Game.prototype.allObjects = function() {
    // note the order. this matters when checking collisions
    return this.asteroids.concat(this.bullets).concat([this.ship]);
  };

  Game.prototype.draw = function (ctx, img) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(img, 0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (movingObject) {
      movingObject.draw(ctx);
    });

    $('.score').html('The score is' + this.score);

  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      var params = this.getInitialParams();
      this.asteroids.push(new Asteroids.Asteroid(params));
    }
  };

  Game.prototype.getInitialParams = function () {
    var params = {};
    params.pos = this.randomPos();
    params.game = this;
    return params;
  };

  Game.prototype.randomPos = function () {
    return [Math.floor(Math.random() * Game.DIM_X), Math.floor(Math.random() * Game.DIM_Y)];
  };

  Game.prototype.moveObjects = function () {
    var allObjects = this.allObjects();
    for (var i = 0; i < allObjects.length; i++) {
      allObjects[i].move();
    }
  };

  Game.prototype.wrap = function (pos) {
    var wrappedPos = [];
    wrappedPos[0] = pos[0] % Game.DIM_X;
    wrappedPos[1] = pos[1] % Game.DIM_Y;
    return [(wrappedPos[0] >= 0) ? wrappedPos[0] : wrappedPos[0] + Game.DIM_X,
            (wrappedPos[1] >= 0) ? wrappedPos[1] : wrappedPos[1] + Game.DIM_Y];
  };

  Game.prototype.checkCollisions = function () {
    var allObjects = this.allObjects(); // ordered asteroids, bullets, ship

    for (var i = 0; i < allObjects.length; i++) {
      for (var j = i+1; j < allObjects.length; j++) {
        if (allObjects[i].isCollidedWith(allObjects[j])) {
          allObjects[i].collideWith(allObjects[j]);
        }
      }
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    }
  };

  Game.prototype.remove = function(object) {
    // TODO logic about adding more asteroids when some are taken away

    var idx;

    if (object instanceof Asteroids.Asteroid) {
      idx = this.asteroids.indexOf(object);
      debugger
      if (idx != -1) {
        this.asteroids.splice(idx, 1);
        if (object.radius === Asteroids.Asteroid.SMALL_RADIUS) {
          // there is a bug here. why does it add more than it should?
          this.score[1] += 1;
        } else if (object.radius === Asteroids.Asteroid.BIG_RADIUS) {
          this.score[0] += 1;
        }
      }
    } else if (object instanceof Asteroids.Bullet) {
      idx = this.bullets.indexOf(object);
      if (idx != -1) {
        this.bullets.splice(idx, 1);
      }
    }
  };


  Game.prototype.isOutOfBounds = function (pos) {
    return pos[0] < 0 || pos[0] > Game.DIM_X || pos[1] < 0 || pos[1] > Game.DIM_Y;
  };

})();
