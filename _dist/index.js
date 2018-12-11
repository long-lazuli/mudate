(function () {
  var main = null;
  var modules = {
      "require": {
          factory: undefined,
          dependencies: [],
          exports: function (args, callback) { return require(args, callback); },
          resolved: true
      }
  };
  function define(id, dependencies, factory) {
      return main = modules[id] = {
          dependencies: dependencies,
          factory: factory,
          exports: {},
          resolved: false
      };
  }
  function resolve(definition) {
      if (definition.resolved === true)
          return;
      definition.resolved = true;
      var dependencies = definition.dependencies.map(function (id) {
          return (id === "exports")
              ? definition.exports
              : (function () {
                  if(modules[id] !== undefined) {
                    resolve(modules[id]);
                    return modules[id].exports;
                  } else if(id === "mudate") {
                    return window["mudate"];
                  } else {
                    try {
                      return require(id);
                    } catch(e) {
                      throw Error("module '" + id + "' not found.");
                    }
                  }
              })();
      });
      definition.factory.apply(null, dependencies);
  }
  function collect() {
      Object.keys(modules).map(function (key) { return modules[key]; }).forEach(resolve);
      return (main !== null) 
        ? main.exports
        : undefined
  }

  var __extends = (this && this.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
          return extendStatics(d, b);
      }
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  define("index", ["require", "exports"], function (require, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ms = 1;
      exports.ss = 1000;
      exports.mm = exports.ss * 60;
      exports.HH = exports.mm * 60;
      var µDate = /** @class */ (function (_super) {
          __extends(µDate, _super);
          function µDate() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              var _this = this;
              if (args.length > 1 && typeof args.slice(-1)[0] === 'string') {
                  var timeZoneOffset = -1 * µDate.timeZoneOffset(args.pop()) * exports.mm;
                  _this = _super.call(this, (+new (Date.bind.apply(Date, [void 0].concat(args)))()) + timeZoneOffset) || this;
              }
              else {
                  _this = _super.apply(this, args.splice(7)) || this;
              }
              return _this;
          }
          µDate.prototype.timeShift = function (milliseconds) {
              this.setTime(this.getTime() + milliseconds);
              return this;
          };
          µDate.prototype.toLocaleFormat = function (formatStr) {
              formatStr = formatStr.replace(/HH/, this.getHours().toString());
              formatStr = formatStr.replace(/mm/, this.getMinutes().toString());
              formatStr = formatStr.replace(/ss/, this.getSeconds().toString());
              return formatStr;
          };
          µDate.timeZoneOffset = function (timeZoneStr) {
              var localeDate = new Date();
              if (!timeZoneStr)
                  return localeDate.getTimezoneOffset();
              var tzDateString = (localeDate).toLocaleString('en-US', { timeZone: timeZoneStr });
              return Math.round(((+new Date(tzDateString)) - (+localeDate)) / exports.mm);
          };
          µDate.now = function (formatStr) {
              return formatStr ? new µDate().toLocaleFormat(formatStr) : Date.now();
          };
          return µDate;
      }(Date));
      exports.default = µDate;
  });
  
  return collect(); 
})();