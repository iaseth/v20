"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBalls = getBalls;
exports.setNextPrev = setNextPrev;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getBalls(overs) {
  var _overs$split = overs.split("."),
      _overs$split2 = _slicedToArray(_overs$split, 2),
      ov = _overs$split2[0],
      _overs$split2$ = _overs$split2[1],
      b = _overs$split2$ === void 0 ? 0 : _overs$split2$;

  return 6 * parseInt(ov) + parseInt(b);
}

function setNextPrev(arr) {
  arr.forEach(function (current, index) {
    if (index === 0) current.prev = null;

    if (index + 1 < arr.length) {
      var next = arr[index + 1];
      current.next = next;
      next.prev = current;
    } else {
      current.next = null;
    }
  });
}