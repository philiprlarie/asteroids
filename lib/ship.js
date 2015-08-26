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
  Ship.RADIUS = 10;

  Asteroids.Utils.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPos();
    this.vel = [0, 0];
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
    var bulletParams = { 'pos': this.pos, 'vel': [2*this.vel[0], 2*this.vel[1]], 'game': this.game };
    var bullet = new Asteroids.Bullet(bulletParams);
    this.game.add(bullet);
  };

  Ship.prototype.draw = function (ctx) {
    var shipImg = new Image();
    shipImg.src = './lib/Mother2c.png';

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    // what is the size?
    ctx.rotate(this.faceDir - Math.PI/2);
    // then draw the image back and up
    ctx.drawImage(shipImg, -64, -64, 128, 128);
    ctx.restore();
  };

//   ctx.fillStyle = this.color;
//   ctx.beginPath();
//
//   ctx.arc(
//     this.pos[0],
//     this.pos[1],
//     this.radius,
//     0,
//     2 * Math.PI,
//     false
//   );
//
//   ctx.fill();
// };


})();
