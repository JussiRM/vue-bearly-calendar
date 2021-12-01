<template>
	<div class="small-calendar-day"
		:class="myClasses"
		@click.prevent="$emit('clicked', day)"
	>
		<span>{{day.day}}</span>
	</div>
</template>

<script lang="ts">
import CalendarDay from '@/interfaces/CalendarDay'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
	name: "SmallCalendarDay",
	emits: [
		"clicked"
	],
	props: {
		day: {
			type: Object as PropType<CalendarDay>,
			required: true
		},
		isDisabled: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		isActive: {
			type: Boolean as PropType<boolean>,
			default: false
		}
	},

	computed: {
		myClasses() : string[] {
			const classes = [] as string[];

			if (this.isDisabled) {
				classes.push("disabled");
			}

			if (this.isActive) {
				classes.push("active");
			}

			return classes;
		}
	}
})
</script>

<style lang="scss">

</style>