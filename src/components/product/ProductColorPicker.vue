<script>
	export default {
		name: 'ProductColorPicker'
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
				<label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-900 ring ring-offset-1">
					<input type="radio" name="color-choice" value="Black" class="sr-only" aria-labelledby="color-choice-0-label">
					<span id="color-choice-0-label" class="sr-only"> Black </span>
					<span aria-hidden="true" class="h-8 w-8 bg-gray-900 border border-black border-opacity-10 rounded-full"></span>
				</label>

				<label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
					<input type="radio" name="color-choice" value="Heather Grey" class="sr-only" aria-labelledby="color-choice-1-label">
					<span id="color-choice-1-label" class="sr-only"> Heather Grey </span>
					<span aria-hidden="true" class="h-8 w-8 bg-gray-400 border border-black border-opacity-10 rounded-full"></span>
				</label>
			</div>
		</fieldset>
	</div>
</template>
