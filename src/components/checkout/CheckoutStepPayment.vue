<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex';

	export default {
		name: 'CheckoutStepPayment',
		data() {
			return {
				billingSameAsShipping: true, // The address that will be submitted to the cart
				newAddress: {
					id: '',
					title: 'Billing Address',
					fullName: '',
					organization: '',
					addressLine1: '',
					addressLine2: '',
					locality: '',
					administrativeArea: '',
					countryCode: '',
					postalCode: '',
					phone: '',
				},
				isLoading: false, // Loading state of the component
				isSaving: false, // Saving state of the component
			};
		},
		computed: {
			...mapGetters('cart', [
				'getBillingAddressId',
				'getSourceBillingAddressId',
				'getBillingSameAsShipping',
			]),
			...mapGetters('cart', [
				'getCurrentCart',
			]),
		},
		mounted() {
			// These are for testing purposes so I don't have to keep filling them in.
			this.$refs.nameOnCard.value = 'Chris Clower';
			this.$refs.cardNumber.value = '4242 4242 4242 4242';
			this.$refs.expirationDate.value = '09/25';
			this.$refs.cvv.value = '123';
		},
		methods: {
			...mapMutations('checkout', [
				'setBillingAddressId',
				'setBillingSameAsShipping',
			]),
			...mapActions('checkout', [
				'decrementStep',
				'incrementStep',
			]),
			nextStep() {
				const errors = [];
				const name = this.$refs.nameOnCard.value;
				const number = this.$refs.cardNumber.value;
				const cvv = this.$refs.cvv.value;
				const expiry = this.$refs.expirationDate.value;
				// Remove non-digits and convert the card number to an integer.
				const numericNumber = parseInt(number.replace(/\D+/gi, ''));
				// Remove non-digits and convert the CVC to an integer.
				const numericCvv = parseInt(cvv.replace(/\D+/gi, ''));
				// Remove non-digits and convert the expiration date to an integer.
				const numericExpiry = parseInt(expiry.replace(/\D+/gi, ''));
				// We need a string version of this as well so we can add back the leading "0" on months
				// less than October, and we're going to add back the "/" as well for the payment processor.
				let expiryValue = numericExpiry.toString();

				if (!name) {
					errors.push('Name is required.');
				}

				if (!numericNumber) {
					errors.push('Card number is required.');
				}

				if (numericNumber.toString().length !== 16 || isNaN(numericNumber)) {
					errors.push('Card number is invalid.');
				}

				if (!numericExpiry) {
					errors.push('Card expiration date is required.');
				} else if (isNaN(numericExpiry)) {
					errors.push('Card expiration date is invalid.');
				} else if (expiryValue.length === 3) {
					// Months that start with 0, which gets trimmed when converted to an integer.
					expiryValue = `0${numericExpiry}`;
				}

				if (numericExpiry && expiryValue.length !== 4) {
					errors.push('Card expiration date is invalid.');
				} else if (expiryValue.length === 4) {
					// Convert to MM/DD format
					expiryValue = expiryValue.match(/.{1,2}/g);
					// expiryValue = `${expiryValue[0]}/${expiryValue[1]}`;
				}

				if (!numericCvv) {
					errors.push('Card CVV is required.');
				}

				if (numericCvv.toString().length !== 3 || isNaN(numericCvv)) {
					errors.push('Card CVV is invalid.');
				}

				if (!errors.length) {
					const cart = this.getCurrentCart;

					const response = this.$api.submitStripePayment({
						cartId: cart.id,
						card: {
							name,
							number: numericNumber,
							exp_month: expiryValue[0],
							exp_year: expiryValue[1],
							cvc: numericCvv,
						},
					});

					/*if (response.success === 'true') {
						this.incrementStep();
					}*/
				} else {
					// handle errors
					console.log(errors);
				}
			},
			previousStep() {
				// ... Any code that needs to happen here before
				// stepping back in the process
				this.decrementStep();
			},
		},
	};
</script>

<template>
	<div>
		<section aria-labelledby="payment-heading">
			<div class="space-y-2 sm:flex sm:justify-between sm:items-center sm:space-y-0">
				<h2 id="payment-heading" class="text-xl font-medium text-gray-900 lg:text-2xl">
					Payment details
				</h2>

				<p class="flex justify-start text-sm text-gray-500">
					<svg class="w-4 h-4 text-gray-400 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
					</svg>
					<span>Shopping is always safe and secure.</span>
				</p>
			</div>

			<div class="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
				<div class="col-span-3 sm:col-span-4">
					<label for="name-on-card" class="block text-sm font-medium text-gray-700">
						Name on card
					</label>
					<div class="mt-1">
						<input
							id="name-on-card"
							ref="nameOnCard"
							type="text"
							name="name-on-card"
							autocomplete="cc-name"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
					</div>
				</div>

				<div class="col-span-3 sm:col-span-4">
					<label for="card-number" class="block text-sm font-medium text-gray-700">
						Card number
					</label>
					<div class="mt-1">
						<input
							id="card-number"
							ref="cardNumber"
							type="text"
							name="card-number"
							autocomplete="cc-number"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
					</div>
				</div>

				<div class="col-span-2 sm:col-span-3">
					<label for="expiration-date" class="block text-sm font-medium text-gray-700">
						Expiration date (MM/YY)
					</label>
					<div class="mt-1">
						<input
							id="expiration-date"
							ref="expirationDate"
							type="text"
							name="expiration-date"
							autocomplete="cc-exp"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
					</div>
				</div>

				<div>
					<label for="cvv" class="block text-sm font-medium text-gray-700">CVV</label>
					<div class="mt-1">
						<input
							id="cvv"
							ref="cvv"
							type="text"
							name="cvv"
							autocomplete="csc"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
					</div>
				</div>
			</div>
		</section>

		<section aria-labelledby="billing-heading" class="mt-10">
			<h2 id="billing-heading" class="text-xl font-medium text-gray-900 lg:text-2xl">
				Billing address
			</h2>
			<p class="text-sm text-gray-500">
				Same as your shipping address or include a separate billing address.
			</p>

			<div class="mt-6 flex items-center">
				<input
					id="same-as-shipping"
					v-model="billingSameAsShipping"
					name="same-as-shipping"
					type="checkbox"
					class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
				>
				<div class="ml-2">
					<label for="same-as-shipping" class="text-sm font-medium text-gray-900">
						Same as shipping address
					</label>
				</div>
			</div>

			<div v-if="!billingSameAsShipping">
				<CheckoutAddressFields context="billing" />
			</div>
		</section>

		<div
			class="flex flex-col justify-start items-stretch gap-y-4 pt-8 sm:flex-row-reverse sm:justify-between sm:items-center lg:pt-16"
		>
			<button
				class="flex justify-center items-center px-8 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
				@click.prevent="nextStep"
			>
				<span>Pay {{ getCurrentCart.totalAsCurrency }}</span>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mr-1 ml-3 hidden sm:inline-block" viewBox="0 0 20 20" fill="currentColor">
					<path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
					<path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
				</svg>
			</button>

			<button
				class="flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
				@click.prevent="previousStep"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -ml-1 mr-3 hidden sm:inline-block" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
				</svg>
				<span>Return to Shipping</span>
			</button>
		</div>
	</div>
</template>
