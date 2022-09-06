<script>
	export default {
		name: 'AddressFormEdit',
		data() {
			return {
				error: ''
			};
		},
		methods: {
			close() {
				this.$emit('close');
			},
			saveAddress() {
				console.log('Save address code here');
				this.close();
			}
		}
	};
</script>

<template>
	<form class="mt-6 space-y-6">

		<CheckoutAddressFields context="user" />

		<div class="flex flex-col space-y-3 pt-6 border-t border-gray-200 sm:flex-row-reverse sm:justify-between sm:items-center sm:space-y-0">
			<button
				type="submit"
				class="flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
				@click.prevent="saveAddress"
			>
				Save Address
			</button>
			<button
				type="button"
				class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
				@click="close"
			>
				Cancel
			</button>
		</div>

	</form>
</template>
