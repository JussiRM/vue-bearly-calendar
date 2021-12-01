// export default interface CalendarDay {
// 	day: number,
// 	month: number,
// 	year: number
// }

import { getWeek } from "date-fns";
import fiLocale from "date-fns/locale/fi";
import CalendarWeek from "./CalendarWeek";

export default class CalendarDay {
	day: number;
	month: number;
	year: number;
	parent: CalendarWeek;

	constructor (dateObj : Date, parent: CalendarWeek) {
		this.day = dateObj.getDate();
		this.month = dateObj.getMonth();
		this.year = dateObj.getFullYear();
		this.parent = parent;
	}

	public toDate() : Date {
		return new Date(this.year, this.month, this.day);
	}

	public toString() : string {
		return this.toDate().toISOString().substr(0, 10);
	}

	public isSameDate(asDate : Date) : boolean {
		const compareFunc = (d:Date) : string => [d.getFullYear(),d.getMonth(),d.getDate()].join("");
		return compareFunc(this.toDate()) === compareFunc(asDate);
	}

	public isMonth(giveMonth: number) : boolean {
		return this.month == giveMonth;
	}

	public weekNumber() : number {
		return getWeek(this.toDate(), {
			weekStartsOn: 1,
			locale: fiLocale
		});
	}
}