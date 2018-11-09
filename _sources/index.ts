export const ms = 1;
export const ss = 1000;
export const mm = ss * 60;
export const HH = mm * 60;

type DateArgs= [any?, any?, any?, any?, any?, any?, any?]
type µDateArgs= [any?, any?, any?, any?, any?, any?, any?, string?]

export default class µDate extends Date {

  constructor(...args: µDateArgs){
    if( args.length > 1 && typeof args.slice(-1)[0] === 'string' ) {
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

  static now = (formatStr?: string) => {
    return formatStr ? new µDate().toLocaleFormat(formatStr) : Date.now()
  }

  timeShift(milliseconds){
    this.setTime( this.getTime() + milliseconds )
    return this
  }

  toLocaleFormat(formatStr){

    formatStr = formatStr.replace( /HH/, this.getHours().toString() )
    formatStr = formatStr.replace( /mm/, this.getMinutes().toString() )
    formatStr = formatStr.replace( /ss/, this.getSeconds().toString() )

    return formatStr
  }

}

