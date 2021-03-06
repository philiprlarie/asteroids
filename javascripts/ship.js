(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (shipParams) {
    Asteroids.MovingObject.call(this, {
      'pos': shipParams.pos,
      'vel': [0, 0],
      'radius': Ship.RADIUS,
      'game': shipParams.game,
      'faceDir': -Math.PI/2,
    });
    this.reloading = false; // no firing while reloading is true
  };

  Ship.RADIUS = 20;

  Asteroids.Utils.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.prototype.die = function () {
    this.game.endGame();
  };

  Ship.prototype.thrust = function (impulseMag) {
    var impulse = [
      impulseMag * Math.cos(this.faceDir),
      impulseMag * Math.sin(this.faceDir)
    ];
    this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
  };

  Ship.prototype.turn = function (dir) {
    this.faceDir += 0.5 * dir * 2*3.14/60;
  };

  Ship.prototype.fireBullet = function () {
    if (this.reloading) {
      return 'reloading';
    } else {
      var bulletParams = {
        'pos': this.pos,
        'vel': [
          10 * Math.cos(this.faceDir),
          10 * Math.sin(this.faceDir)
        ],
          'game': this.game
        };
      var bullet = new Asteroids.Bullet(bulletParams);
      this.game.add(bullet);

      this.reloading = true;
      window.setTimeout(function () {
        this.reloading = false;
      }.bind(this), 200);
    }
  };

  Ship.prototype.draw = function (ctx) {
    var shipImg = new Image();
    shipImg.src = './images/Mother2c.png';

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.faceDir - Math.PI/2);
    ctx.drawImage(shipImg, -25, -25, 50, 50);
    ctx.restore();
  };

})();
