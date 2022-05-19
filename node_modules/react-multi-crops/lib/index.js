'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addid = exports.removeid = undefined;

var _utils = require('./utils');

Object.defineProperty(exports, 'removeid', {
  enumerable: true,
  get: function get() {
    return _utils.removeid;
  }
});
Object.defineProperty(exports, 'addid', {
  enumerable: true,
  get: function get() {
    return _utils.addid;
  }
});

var _MultiCrops = require('./components/MultiCrops');

var _MultiCrops2 = _interopRequireDefault(_MultiCrops);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _MultiCrops2.default;