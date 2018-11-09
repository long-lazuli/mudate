(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ms = 1;
exports.ss = 1000;
exports.mm = exports.ss * 60;
exports.HH = exports.mm * 60;
class µDate extends Date {
    constructor(...args) {
        if (args.length > 1 && typeof args.slice(-1)[0] === 'string') {
            const timeZoneOffset = -1 * µDate.timeZoneOffset(args.pop()) * exports.mm;
            super((+new Date(...args)) + timeZoneOffset);
        }
        else {
            super(...args.splice(7));
        }
    }
    timeShift(milliseconds) {
        this.setTime(this.getTime() + milliseconds);
        return this;
    }
    toLocaleFormat(formatStr) {
        formatStr = formatStr.replace(/HH/, this.getHours().toString());
        formatStr = formatStr.replace(/mm/, this.getMinutes().toString());
        formatStr = formatStr.replace(/ss/, this.getSeconds().toString());
        return formatStr;
    }
}
µDate.timeZoneOffset = (timeZoneStr) => {
    const localeDate = new Date();
    if (!timeZoneStr)
        return localeDate.getTimezoneOffset();
    const tzDateString = (localeDate).toLocaleString('en-US', { timeZone: timeZoneStr });
    return Math.round(((+new Date(tzDateString)) - (+localeDate)) / exports.mm);
};
µDate.now = (formatStr) => {
    return formatStr ? new µDate().toLocaleFormat(formatStr) : Date.now();
};
exports.default = µDate;

},{}]},{},[1]);
