(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.round = 1;
    this.gameOver = false;
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids(this.round);
    this.ship = new Asteroids.Ship({
      'pos': [Game.DIM_X/2, Game.DIM_Y/2],
      'game': this
    });
    this.score = [0,0]; // [big asteroids killed, small asteroids killed]
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 700;
  Game.NUM_ASTEROIDS = 5;

  Game.prototype.draw = function (ctx, img) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(img, 0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function (movingObject) {
      movingObject.draw(ctx);
    });
    var score = this.score[0]*1000 + this.score[1]*500;
    $('#score').html('Score: ' + score);
    $('#round').html('Round: ' + this.round);
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.endGame = function() {
    this.gameOver = true;
    $('.game-over-message').html("<div id='game-over'>Game Over</div>");
    $('.game-over-message').append("<div id='replay' class='btn'>Replay</div>");
    $('#replay').on('click', Asteroids.replay);
  };

  Game.prototype.allObjects = function() {
    // note the order. this matters when checking collisions
    return this.asteroids.concat(this.bullets).concat([this.ship]);
  };

  Game.prototype.addAsteroids = function (round) {
    for (var i = 0; i < Game.NUM_ASTEROIDS * round; i++) {
      this.asteroids.push(new Asteroids.Asteroid({ 'game': this }));
    }
  };

  Game.prototype.moveObjects = function () {
    var allObjects = this.allObjects();
    for (var i = 0; i < allObjects.length; i++) {
      allObjects[i].move();
    }
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

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    }
  };

  Game.prototype.remove = function(object) {
    // TODO logic about adding more asteroids when some are taken away
    // TODO make cooler new velocity that takes into account bullet velocity
    // TODO refactor this to grab math stuff into utils

    var idx;

    if (object instanceof Asteroids.Asteroid) {
      idx = this.asteroids.indexOf(object);
      if (idx != -1) {
        this.asteroids.splice(idx, 1);
        if (object.radius === Asteroids.Asteroid.SMALL_RADIUS) {
          this.score[1] += 1;
        } else if (object.radius === Asteroids.Asteroid.BIG_RADIUS) {
          this.score[0] += 1;

          ////////////////////// refactor this
          var leftVel = [1/Math.sqrt(2) * object.vel[0] - 1/Math.sqrt(2) * object.vel[1],
                         1/Math.sqrt(2) * object.vel[0] + 1/Math.sqrt(2) * object.vel[1]];
          var leftParams = {
            'pos': object.pos,
            'game': this,
            'radius': Asteroids.Asteroid.SMALL_RADIUS,
            'vel': leftVel
          };

          var rightVel = [1/Math.sqrt(2) * object.vel[0] + 1/Math.sqrt(2) * object.vel[1],
                               -1/Math.sqrt(2) * object.vel[0] + 1/Math.sqrt(2) * object.vel[1]];
          var rightParams = {
            'pos': object.pos,
            'game': this.game,
            'radius': Asteroids.Asteroid.SMALL_RADIUS,
            'vel': rightVel,
          };


          var leftAsteroid = new Asteroids.Asteroid(leftParams);
          var rightAsteroid = new Asteroids.Asteroid(rightParams);

          this.add(leftAsteroid);
          this.add(rightAsteroid);
          ////////////////////////
        }
      }
    } else if (object instanceof Asteroids.Bullet) {
      idx = this.bullets.indexOf(object);
      if (idx != -1) {
        this.bullets.splice(idx, 1);
      }
    }

    if (this.asteroids.length === 0) {
      this.round += 1;
      this.addAsteroids(this.round);
    }
  };

})();
