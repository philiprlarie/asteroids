if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

Asteroids.Utils = {};

Asteroids.Utils.inherits = function(ChildClass, ParentClass) {
  var Surrogate = function() {};
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
  ChildClass.prototype.constructor = ChildClass;
};

Asteroids.Utils.randomVec = function(length) {
  var direction = Math.random() * 2 * Math.PI;
  return [length * Math.cos(direction), length * Math.sin(direction)];
};
