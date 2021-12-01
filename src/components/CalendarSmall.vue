<template>
	<div class="bearly-calendar-small">
		<div class="calendar-container">
			<template v-for="(week, weekIndex) in myMonth.weeks" :key="week.key">
				<div class="weeknumber small-calendar-day">{{ week.days[0].weekNumber() }}</div>
				<template v-for="(day, dayIndex) in week.days" :key="week.key + day.day">
					<small-calendar-day 
						:tabindex="(weekIndex*7) + dayIndex"
						:ref="day.toString()"
						:day="day"
						:is-disabled="!day.isMonth(currentDate.getMonth())"
						:is-active="day.isSameDate(currentDate)"
						@clicked="onDayClick"
						@keydown.prevent="onKeyPress($event, day)"
					/>
				</template>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import CalendarDay from '@/interfaces/CalendarDay';
import CalendarMonth from '@/interfaces/CalendarMonth';
import { defineComponent, PropType } from 'vue'
import SmallCalendarDay from "./SmallCalendarDay.vue";

export default defineComponent({
	components: {
		SmallCalendarDay
	},

	emits: [
		"set-date"
	],

	props: {
		currentDate: {
			type: Date as PropType<Date>,
			default: () => new Date()
		}
	},

	data() { return {
		
	}},

	methods: {
		onDayClick(day:CalendarDay) : void {
			this.$emit('set-date', day.toDate());
		},

		onKeyPress(ev:KeyboardEvent, day:CalendarDay) {
			const key = ev.key;

			// Handles different inputs 
			const arrowFunc = (amount:number) => {
				const newDate = day.toDate();
				newDate.setDate(newDate.getDate() + amount);
				this.$emit('set-date', newDate);
				this.$nextTick(() => {
					let focusComponent = this.$refs[newDate.toISOString().substr(0,10)] as any;
					console.log(focusComponent);
					let focusElem = focusComponent.$el;
					console.log(focusElem);
					focusElem.focus();
				});
			}

			if (key == "ArrowRight") {
				arrowFunc(1);
			}
			else if (key == "ArrowLeft") {
				arrowFunc(-1);
			}
			else if (key == "ArrowUp") {
				arrowFunc(-7);
			}
			else if (key == "ArrowDown") {
				arrowFunc(7);
			}
		}
	},

	computed: {
		myMonth() : CalendarMonth {
			const currYear = this.currentDate.getFullYear();
			const currMonth = this.currentDate.getMonth();
			const month = new CalendarMonth(currYear, currMonth);

			return month;
		}
	}
})
</script>

<style lang="scss">
	div.bearly-calendar-small {
		div.calendar-container {
			display: grid;
			grid-template-columns: repeat(8, auto);

			div.small-calendar-day {
				cursor: pointer;
				background-color: #fff;
				padding: 0.5rem 0.25rem;
				margin: 0.1rem;
				text-align: center;
				border: 1px solid transparent;
				border-radius: 0.5rem;
				user-select: none;
				transition: 
					background-color 200ms ease-out,
					border 100ms ease-in-out;

				&:hover {
					border: 1px solid darken(#fff, 30%);
					background-color: darken(#fff, 8%);
				}

				&:focus {
					outline: cornflowerblue solid 3px;
				}

				&.weeknumber {
					cursor: auto;
					text-align: left;
					border-color: transparent !important;
				}

				&.disabled {
					opacity: 0.5;
				}

				&.active {
					font-weight: bold;
					background-color: lighten(#000, 20%);
					color: #fff;
					box-shadow: inset 0px 0px 4px 2px rgba(255,255,255, 0.33);
				}
			}
		}
	}
</style>