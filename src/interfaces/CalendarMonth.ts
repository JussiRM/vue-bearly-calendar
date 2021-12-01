import CalendarDay from "./CalendarDay";
import CalendarWeek from "./CalendarWeek";

// export default interface CalendarMonth {
// 	year: number,
// 	month: number,
// 	weeks: CalendarWeek[]
// }

export default class CalendarMonth {
	public year: number;
	public month: number;
	public weeks: CalendarWeek[];

	constructor(year:number, month:number)
	{
		this.year = year;
		this.month = month;
		this.weeks = this.generateWeeks();
	}

	generateWeeks(): CalendarWeek[] {
		const weeks = [] as CalendarWeek[];

		// Loop 6 weeks 
		const weekDate = new Date(this.year, this.month, 1);

		for(let w = 0; w < 6; w++) {
			weeks.push(
				this.generateWeek(weekDate)
			);

			weekDate.setDate(weekDate.getDate()+7);
		}

		return weeks;
	}

	/** Generate week from date (can be any date inside that week) */
	generateWeek(weekDateOriginal:Date) : CalendarWeek {
		const weekDate = new Date(weekDateOriginal);
		const dayIndex = this.dayIndexOfDate(weekDate);
		weekDate.setDate(weekDate.getDate() - dayIndex);

		// const week = { days: [], key: weekDate.valueOf() } as CalendarWeek;
		const week = new CalendarWeek(this, weekDate.valueOf());
		for(let d = 0; d < 7; d++) {
			// Get current day object 
			const dayDateObj = new Date(weekDate);
			dayDateObj.setDate(weekDate.getDate()+d);
			const currentDay = new CalendarDay(dayDateObj, week);
			week.days.push(currentDay);
		}
		return week;
	}

	/** Returns index of a date object where monday is 0 and sunday 6 */
	public dayIndexOfDate(tempDate : Date, fixIndexToMonday = true) : 0|1|2|3|4|5|6 {
		// This garbage function returns sunday as 0
		let dayIndex = tempDate.getDay();

		if (fixIndexToMonday) {
			dayIndex--;
			if (dayIndex == -1) {
				dayIndex = 6;
			}
		}

		return dayIndex as 0|1|2|3|4|5|6;
	}

	/** Return index of the first day, where monday is 0 and sunday 6 */
	public indexOfFirstDay() : 0|1|2|3|4|5|6
	{
		const tempDate = new Date(this.year, this.month, 1);
		return this.dayIndexOfDate(tempDate);
	}

	/** Return index of the last day, where monday is 0 and sunday 6 */
	public indexOfLastDay() : 0|1|2|3|4|5|6
	{
		const tempDate = new Date(this.year, this.month + 1, 0);
		return this.dayIndexOfDate(tempDate);
	}
}

