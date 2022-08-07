<script>
	export default {
		name: 'CheckoutDiscount',
		props: {
			isMobile: {
				type: Boolean
			}
		},
		computed: {
			device() {
				return this.isMobile ? 'mobile' : 'desktop';
			}
		}
	};
</script>

<template>
	<form :class="{ 'mt-10': isMobile }">
		<label :for="`discount-code-${device}`" class="block text-sm font-medium text-gray-700">Discount code</label>
		<div class="flex space-x-4 mt-1">
			<input
				:id="`discount-code-${device}`"
				type="text"
				:name="`discount-code-${device}`"
				class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
			<button
				type="submit"
				class="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
			>
				Apply
			</button>
		</div>
	</form>
</template>
