export const ms = 1;
export const ss = 1000;
export const mm = ss * 60;
export const HH = mm * 60;
export class µDate extends Date {
    constructor(...args) {
        if (args.length == 1)
            super(...args);
        else if (args.length > 1 && typeof args.slice(-1)[0] === 'string') {
            const timeZoneOffset = -1 * µDate.timeZoneOffset(args.pop()) * mm;
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
}
µDate.timeZoneOffset = (timeZoneStr) => {
    const localeDate = new Date();
    if (!timeZoneStr)
        return localeDate.getTimezoneOffset();
    const tzDateString = (localeDate).toLocaleString('en-US', { timeZone: timeZoneStr });
    return Math.round(((+new Date(tzDateString)) - (+localeDate)) / mm);
};
global.µDate = µDate;
//# sourceMappingURL=µDate.js.map