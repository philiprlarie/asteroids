(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (shipParams) {
    Asteroids.MovingObject.call(this, {
      'pos': shipParams['pos'],
      'vel': [0, 0],
      'color': Ship.COLOR,
      'radius': Ship.RADIUS,
      'game': shipParams['game']
    });
  };

  Ship.COLOR = "#FF0000";
  Ship.RADIUS = 10;

  Asteroids.Utils.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPos();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
  };

  Ship.prototype.fireBullet = function () {
    var bulletParams = { 'pos': this.pos, 'vel': [2*this.vel[0], 2*this.vel[1]], 'game': this.game };
    var bullet = new Asteroids.Bullet(bulletParams);
    this.game.add(bullet);
  };


})();
