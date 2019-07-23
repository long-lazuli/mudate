type MS = number
export const ms: MS = 1;
type SS = number
export const ss: SS = 1000;
type MM = number
export const mm: MM = ss * 60;
type HH = number
export const HH: HH = mm * 60;

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

  timeShift(milliseconds: MS){
    this.setTime( this.getTime() + milliseconds )
    return this
  }

}

(global as any).µDate = µDate;
