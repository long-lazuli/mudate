declare type MS = number;
export declare const ms: MS;
declare type SS = number;
export declare const ss: SS;
declare type MM = number;
export declare const mm: MM;
declare type HH = number;
export declare const HH: HH;
declare type µDateArgs = [any?, any?, any?, any?, any?, any?, any?, string?];
export declare class µDate extends Date {
    constructor(...args: µDateArgs);
    static timeZoneOffset: (timeZoneStr?: string | undefined) => number;
    timeShift(milliseconds: MS): this;
}
export {};
//# sourceMappingURL=µDate.d.ts.map