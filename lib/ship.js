(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (shipParams) {
    Asteroids.MovingObject.call(this, {
      'pos': shipParams.pos,
      'vel': [0, 0],
      'color': Ship.COLOR,
      'radius': Ship.RADIUS,
      'game': shipParams.game,
      'faceDir': Math.PI/2
    });
  };

  Ship.COLOR = "#FF0000";
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
    this.faceDir += dir * 2*3.14/60;
  };

  Ship.prototype.fireBullet = function () {
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
  };

  Ship.prototype.draw = function (ctx) {
    var shipImg = new Image();
    shipImg.src = './lib/pics/Mother2c.png';

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    // what is the size?
    ctx.rotate(this.faceDir - Math.PI/2);
    // then draw the image back and up
    ctx.drawImage(shipImg, -25, -25, 50, 50);
    ctx.restore();
  };

})();
