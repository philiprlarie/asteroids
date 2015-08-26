
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var MovingObject = Asteroids.MovingObject = function (params) {
    this.pos = params.pos;
    this.vel = params.vel;
    this.radius = params.radius;
    this.color = params.color;
    this.game = params.game;
    this.faceDir = params.faceDir;
  };

  // TODO make the drawing more cooler
  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    var tempPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    if (this.game.isOutOfBounds(tempPos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(tempPos);
      } else {
        this.game.remove(this);
      }
    } else {
      this.pos = tempPos;
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    return this.distanceTo(otherObject) < this.radius + otherObject.radius;
  };

  MovingObject.prototype.distanceTo = function (otherObject) {
    var deltaX = otherObject.pos[0] - this.pos[0];
    var deltaY = otherObject.pos[1] - this.pos[1];
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  MovingObject.prototype.collideWith = function (otherObject) {
  };

  MovingObject.prototype.isWrappable = true;

})();
