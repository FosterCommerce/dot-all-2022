<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex';
	import { loadStripe } from '@stripe/stripe-js';

	export default {
		name: 'CheckoutStepPayment',
		data() {
			return {
				stripe: {},
				card: {},
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
				cardError: null,
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
		async mounted() {
			// These are for testing purposes so I don't have to keep filling them in.
			this.stripe = await loadStripe('pk_test_51IRhFCAvkPHIPB19Zv5OPWHz6a7iiiMHwRzMLni9yZSdnIegXpkuPhptWfVrkbne3QAdlNV0O0Mp9VVBpKy1YlQ400xhc1s7D4');
			const elements = this.stripe.elements();
			/*const style = {
				base: {
					color: '#32325d',
					fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
					fontSmoothing: 'antialiased',
					fontSize: '16px',
					'::placeholder': {
						color: '#aab7c4'
					}
				},
				invalid: {
					color: '#fa755a',
					iconColor: '#fa755a'
				}
			};*/

			this.card = elements.create('card', /*{ style }*/);
			this.card.mount('#card-element');
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
				const paymentData = {
					billing_details: {
						email: this.getCurrentCart.customer.email,
					}
				};

				this.stripe.createPaymentMethod('card', this.card, paymentData)
					.then(async (result) => {
						if (result.error) {
							// Show the user any errors
							this.cardError = result.error.message;
						} else {
							const response = await this.$api.submitStripePayment({
								'paymentForm[stripe][paymentMethodId]': result.paymentMethod.id
							});

							if (response.message) {
								this.cardError = response.message;
							} else {
								// TODO Handle success
							}
						}
					});

				// this.incrementStep();
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

			<div
				id="card-element"
				class="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4"
			></div>
			<div v-if="cardError">{{ cardError }}</div>
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
