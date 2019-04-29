'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _dotenvConfig = require('./configs/dotenv-config');

var _dotenvConfig2 = _interopRequireDefault(_dotenvConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    (0, _dotenvConfig2.default)();
    this.express = (0, _express2.default)();
    this.database();
    this.middlewares();
  }

  _createClass(App, [{
    key: 'database',
    value: function database() {
      try {
        var urlMongo = process.env.DATABASE_CONNECTION;
        _mongoose2.default.connect(urlMongo, {
          useNewUrlParser: true,
          useCreateIndex: true
        });
      } catch (error) {
        console.log('🔥🔥🔥🔥 ', error);
      }
    }
  }, {
    key: 'routes',
    value: function routes() {}
  }, {
    key: 'middlewares',
    value: function middlewares() {
      this.express.use(_express2.default.json());
      this.express.use((0, _cors2.default)());
    }
  }]);

  return App;
}();

exports.default = new App().express;