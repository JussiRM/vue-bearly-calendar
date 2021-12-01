import CalendarDay from "./CalendarDay";
import CalendarMonth from "./CalendarMonth";

// export default interface CalendarWeek {
// 	key: number,
// 	days: CalendarDay[],
// 	parent: CalendarMonth
// }

export default class CalendarWeek {
	key: number;
	days: CalendarDay[];
	parent: CalendarMonth;

	constructor(parent : CalendarMonth, key : number) {
		this.parent = parent;
		this.days = [];
		this.key = key;
	}
}