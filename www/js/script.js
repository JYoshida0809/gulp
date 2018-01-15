'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// test
$('.test').animate({ opacity: 0 }, 300);

setTimeout(function () {
  $('.test').animate({ opacity: 1 }, 130);
}, 1500);

var Cat = function () {
  function Cat(name) {
    _classCallCheck(this, Cat);

    this.name = name;
  }

  _createClass(Cat, [{
    key: 'walk',
    value: function walk() {
      console.log(this._name + 'が歩いてます');
    }
  }, {
    key: 'name',
    set: function set(name) {
      this._name = name;
    },
    get: function get() {
      return this._name;
    }
  }]);

  return Cat;
}();

var cat1 = new Cat('タマ');
cat1.walk();