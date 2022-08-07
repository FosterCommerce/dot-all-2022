<script>
	import { mapGetters, mapMutations } from "vuex";

	export default {
		name: 'CheckoutStepPayment',
		computed: {
			...mapGetters('checkout', [
				'getBillingAddressId',
				'getBillingSameAsShipping'
			]),
			billingSameAsShipping: {
				set(value) {
					this.setBillingSameAsShipping(value);
				},
				get() {
					return this.getBillingSameAsShipping;
				}
			}
		},
		methods: {
			...mapMutations('checkout', [
				'setBillingAddressId',
				'setBillingSameAsShipping'
			]),
		}
	};
</script>

<template>
	<div>
		<section aria-labelledby="payment-heading">

			<div class="space-y-2 sm:flex sm:justify-between sm:items-center sm:space-y-0">
				<h2 id="payment-heading" class="text-xl font-medium text-gray-900 lg:text-2xl">Payment details</h2>

				<p class="flex justify-start text-sm text-gray-500">
					<svg class="w-4 h-4 text-gray-400 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
					</svg>
					<span>Shopping is always safe and secure.</span>
				</p>
			</div>

			<div class="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
				<div class="col-span-3 sm:col-span-4">
					<label for="name-on-card" class="block text-sm font-medium text-gray-700">Name on card</label>
					<div class="mt-1">
						<input
							id="name-on-card"
							type="text"
							name="name-on-card"
							autocomplete="cc-name"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
					</div>
				</div>

				<div class="col-span-3 sm:col-span-4">
					<label for="card-number" class="block text-sm font-medium text-gray-700">Card number</label>
					<div class="mt-1">
						<input
							id="card-number"
							type="text"
							name="card-number"
							autocomplete="cc-number"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
					</div>
				</div>

				<div class="col-span-2 sm:col-span-3">
					<label for="expiration-date" class="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
					<div class="mt-1">
						<input
							id="expiration-date"
							type="text"
							name="expiration-date"
							autocomplete="cc-exp"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
					</div>
				</div>

				<div>
					<label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
					<div class="mt-1">
						<input
							id="cvc"
							type="text"
							name="cvc"
							autocomplete="csc"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
					</div>
				</div>
			</div>
		</section>

		<section aria-labelledby="billing-heading" class="mt-10">
			<h2 id="billing-heading" class="text-xl font-medium text-gray-900 lg:text-2xl">Billing address</h2>
			<p class="text-sm text-gray-500">Same as your shipping address or include a separate billing address.</p>

			<div class="mt-6 flex items-center">
				<input
					id="same-as-shipping"
					v-model="billingSameAsShipping"
					name="same-as-shipping"
					type="checkbox"
					class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
				>
				<div class="ml-2">
					<label for="same-as-shipping" class="text-sm font-medium text-gray-900">Same as shipping address</label>
				</div>
			</div>

			<div v-if="!getBillingSameAsShipping">
				<CheckoutAddressFields context="billing" />
			</div>

		</section>

	</div>
</template>
