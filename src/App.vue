<template>
	<p>Small calendar</p>
	<div style="max-width: 400px;">
		<small-calendar-container  
			v-model="d1"
			@set-date="setDate"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SmallCalendarContainer from "./components/SmallCalendarContainer.vue";

export default defineComponent({
	name: "App",
	components: {
		SmallCalendarContainer,
	},
	
	data() { return {
		d1: new Date() //new Date("2021-11-22") as Date
	}},

	methods: {
		setDate(newDate : Date) {
			this.d1 = newDate;
		}
	}
});
</script>

<style lang="scss">
html, body {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	background-color: darken(#fff, 5%);
}

#app {
	font-family: Arial, Helvetica, sans-serif;
	width: 100%;
	max-width: 1024px;
	margin: 20px auto;
	padding: 15px;
	background-color: #fff;
}
</style>
