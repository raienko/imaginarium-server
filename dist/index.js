"use strict";

var _api = _interopRequireDefault(require("./api"));

var _app = _interopRequireDefault(require("./core/app"));

var _websocket = _interopRequireDefault(require("./core/websocket"));

var _server = _interopRequireDefault(require("./core/server"));

var _database = _interopRequireDefault(require("./core/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_database["default"].connect().then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var PORT;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _api["default"].setupSocketsApi(_websocket["default"]);

          _api["default"].setupRestApi(_app["default"]);

          PORT = process.env.PORT;

          _server["default"].listen(PORT, function () {
            return console.log("Server running on ".concat(PORT));
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})))["catch"](function (err) {
  console.log('Failed to start server: ', err.message);
});