<script>
	export default {
		name: 'ProductColorPicker',
		props: {
			colors: {
				type: Array,
				required: false,
				default: () => []
			},
			current: {
				type: String,
				required: false,
				default: null
			}
		},
		data() {
			return {
				selected: this.current ?? this.colors[0],
			}
		},
		computed: {
			colorOptions() {
				const colorArr = [];
				this.colors.forEach((color) => {
					colorArr.push({
						label: color.charAt(0).toUpperCase() + color.slice(1),
						value: color,
					});
				});
				return colorArr;
			}
		},
		methods: {
			updateSelected(color){
				this.selected = color
				this.$emit('color-updated', {
					type: 'color',
					value: color
				});
			},
		}
	}
</script>

<template>
	<div>
		<h2 class="text-sm font-medium text-gray-900">Color</h2>
		<fieldset class="mt-3">
			<legend class="sr-only">Choose a color</legend>
			<div class="flex items-center space-x-3">
				<!--
					Active and Checked: "ring ring-offset-1"
					Not Active and Checked: "ring-2"
				-->
				<label
					v-for="(option, index) in colorOptions"
					:key="index"
					:for="`color-choice-${index}`"
					:class="selected === option.value ? 'ring ring-offset-1' : ''"
					class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-900"
					@click="updateSelected(option.value)"
				>
					<input
						:id="`color-choice-${index}`"
						type="radio"
						name="color-choice"
						value="Black"
						class="sr-only"
						:aria-labelledby="`color-choice-${index}-label`"
					/>
					<span :id="`color-choice-${index}-label`" class="sr-only"> {{ option.label }} </span>
					<span aria-hidden="true" :class="`bg-${ option.value === 'black' ? 'gray-900' : (option.value + '-600') }`" class="h-8 w-8 border border-black border-opacity-10 rounded-full"></span>
				</label>

				<!--<label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
					<input type="radio" name="color-choice" value="Heather Grey" class="sr-only" aria-labelledby="color-choice-1-label">
					<span id="color-choice-1-label" class="sr-only"> Heather Grey </span>
					<span aria-hidden="true" class="h-8 w-8 bg-gray-400 border border-black border-opacity-10 rounded-full"></span>
				</label> -->
			</div>
		</fieldset>
	</div>
</template>
