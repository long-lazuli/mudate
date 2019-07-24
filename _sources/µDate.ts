export const ms: number = 1;
export const ss: number = 1000;
export const mm: number = ss * 60;
export const HH: number = mm * 60;

type DateArgs= [any?, any?, any?, any?, any?, any?, any?]
type µDateArgs= [any?, any?, any?, any?, any?, any?, any?, string?]

export class µDate extends Date {

  constructor(...args: µDateArgs){
    if( args.length == 1 ) super( ...args as DateArgs )
    else if( args.length > 1 && typeof args.slice(-1)[0] === 'string' ) {
      const timeZoneOffset = -1 * µDate.timeZoneOffset( args.pop() ) * mm
      super( (+new Date(...args as DateArgs)) + timeZoneOffset )
    }else{
      super( ...args.splice(7) as DateArgs )
    }
  }

  static timeZoneOffset = ( timeZoneStr?: string ) => {
    const localeDate = new Date()
    if( !timeZoneStr ) return localeDate.getTimezoneOffset()

    const tzDateString = (localeDate).toLocaleString('en-US', {timeZone: timeZoneStr} )
    return Math.round( ( (+new Date(tzDateString)) - (+localeDate) ) / mm )
  }

  timeShift(milliseconds: number){
    this.setTime( this.getTime() + milliseconds )
    return this
  }

}

(global as any).µDate = µDate;
