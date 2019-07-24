export declare const ms: number;
export declare const ss: number;
export declare const mm: number;
export declare const HH: number;
declare type µDateArgs = [any?, any?, any?, any?, any?, any?, any?, string?];
export declare class µDate extends Date {
    constructor(...args: µDateArgs);
    static timeZoneOffset: (timeZoneStr?: string | undefined) => number;
    timeShift(milliseconds: number): this;
}
export {};
//# sourceMappingURL=µDate.d.ts.map