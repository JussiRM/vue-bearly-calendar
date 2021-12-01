<template>
	<div class="bearly-calendar-small-container">
		<div class="header">
			<div class="current-date">
				<div class="prev-month-date" :class="transitionClass">
					<span>{{headerDateValue(prevMonth)}}</span>
				</div>
				<div class="curr-month-date" :class="transitionClass">
					<span>{{headerDateValue(modelValue)}}</span>
				</div>
				<div class="next-month-date" :class="transitionClass">
					<span>{{headerDateValue(nextMonth)}}</span>
				</div>
			</div>
			<div class="prev-month-btn button-container">
				<button type="button" @click.prevent="moveMonth(-1)">&lt;</button>
			</div>
			<div class="next-month-btn button-container">
				<button type="button" @click.prevent="moveMonth(1)">&gt;</button>
			</div>
		</div>
		<div class="calendar">
			<div class="month-container prev-month prefetch-month" :class="transitionClass">
				<calendar-small 
					:current-date="prevMonth"
				/>
			</div>
			<div class="month-container current-month" :class="transitionClass">
				<calendar-small 
					:current-date="modelValue"
					@set-date="$emit('set-date', $event)"
				/>
			</div>
			<div class="month-container next-month prefetch-month" :class="transitionClass">
				<calendar-small 
					:current-date="nextMonth"
				/>
			</div>

			<div class="current-month-ghost" style="opacity: 0;">
				<calendar-small 
					:current-date="modelValue"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CalendarSmall from "./CalendarSmall.vue";
import { addMonths } from "date-fns";

export default defineComponent({
	components: {
		CalendarSmall
	},
	emits: [
		"set-date",
		"update:modelValue"
	],
	props: {
		modelValue: {
			type: Date as PropType<Date>,
			default: () => new Date()
		}
	},

	data() { return {
		isTransitionNext: false,
		isTransitionPrev: false
	}},

	computed: {
		prevMonth() : Date {
			return addMonths(this.modelValue, -1);
		},

		nextMonth() : Date {
			return addMonths(this.modelValue, 1);
		},

		transitionClass() : string[] {
			let classes = [];
			if (this.isTransitionNext) {
				classes.push('is-transition-next');
			}
			if (this.isTransitionPrev) {
				classes.push('is-transition-prev');
			}

			return classes;
		}
	},

	methods: {
		moveMonth(amount:number) : void {
			this.isTransitionNext = false;
			this.isTransitionPrev = false;

			if (amount > 0) {
				this.isTransitionNext = true;
			}
			else {
				this.isTransitionPrev = true;
			}

			window.setTimeout(() => {
				this.isTransitionNext = false;
				this.isTransitionPrev = false;

				let newDate = addMonths(this.modelValue, amount);
				this.$emit("update:modelValue", newDate);
			}, 333);
		},

		headerDateValue(dateValue:Date) : string {
			const monthNames = [
				"Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu",
				"Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu",
				"Joulukuu"
			];

			return dateValue.getFullYear() + " " + monthNames[dateValue.getMonth()];
		}
	}
})
</script>


<style lang="scss">
	div.bearly-calendar-small-container {
		$containerPadding: 0.5rem;

		border: 1px solid gray;
		border-radius: 0.25rem;
		padding: $containerPadding;
		overflow: hidden;

		div.header {
			display: grid;
			grid-template-columns: 60% 20% 20%;
			border-bottom: 1px solid gray;
			background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(245,245,245,1) 0%, rgba(224,224,224,1) 100%);

			// Mega tricks 
			margin: -$containerPadding;
			padding: $containerPadding;
			padding-bottom: 0.5rem;
			margin-bottom: 0.5rem;

			div.current-date {
				position: relative;
				overflow: hidden;

				> div {
					// Try to make the title be in similar height as buttons
					padding-top: 0.15rem;
					padding-left: 0.25rem;
					font-weight: bold;

					// Transition next/previous
					&.is-transition-next, &.is-transition-prev {
						transition: all 333ms ease-in-out;
					}
					position: absolute;
					top: 0;
					left: 0;

					&.prev-month-date {
						top: -100%;
						opacity: 0;

						&.is-transition-prev {
							top: 0%;
							opacity: 1;
						}
					}
					&.next-month-date {
						top: 100%;
						opacity: 0;

						&.is-transition-next {
							top: 0;
							opacity: 1;
						}
					}
					&.curr-month-date {
						z-index: 1;
						&.is-transition-prev {
							top: 100%;
						}
						&.is-transition-next {
							top: -100%;
						}
					}
				}
			}

			div.button-container {
				button {
					display: block;
					width: 100%;
				}
			}
		}

		div.calendar {
			position: relative;
			overflow: hidden;

			div.month-container {
				&.is-transition-next, &.is-transition-prev {
					transition: all 333ms ease-in-out;
				}
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;

				&.prev-month {
					left: -100%;

					&.is-transition-prev {
						left: 0;
					}
				}

				&.next-month {
					left: 100%;

					&.is-transition-next {
						left: 0;
					}
				}

				&.current-month {
					z-index: 1;
					&.is-transition-prev {
						left: 100%;
					}
					&.is-transition-next {
						left: -100%;
					}
				}
			}
		}
	}
</style>