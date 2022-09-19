<script>
	import { mapGetters, mapActions } from 'vuex';
	import { loadStripe } from '@stripe/stripe-js';

	export default {
		name: 'CheckoutStepPayment',
		data() {
			return {
				stripe: {},
				card: {},
				billingSameAsShipping: false,
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
				paypalForm: null,
				paypalLoaded: false,
				paymentGateway: 'stripe',
				isSaving: false, // Saving state of the component
				cardError: null,
			};
		},
		computed: {
			...mapGetters('cart', [
				'getBillingAddress',
				'getBillingSameAsShipping',
				'getCurrentCart',
				'getCartErrors'
			]),
			...mapGetters('checkout', [
				'getGateways'
			]),
		},
		watch: {
			billingSameAsShipping() {
				this.saveBillingSameAsShipping(this.billingSameAsShipping);
			},
			paymentGateway() {
				if (this.paymentGateway === 'paypal' && !this.paypalLoaded) {
					const cart = this.getCurrentCart;
					// TODO: Pull from .env
					const clientId = 'AZ9iM136g7kn-klPmPM0Q3A301JZsJ5GrVoHO54IUI7hSSCme-RIIUb5JqCh3i6yo8wSBPVzAypgN-jF';

					this.loadScriptAsync(`https://www.paypal.com/sdk/js?client-id${clientId}=&currency=${cart.currency}&intent=capture`, () => {
						const paypal = typeof window.paypal !== "undefined" ? window.paypal : null;

						if (paypal) {
							const paypalButtonsComponent = paypal.Buttons({
								fundingSource: paypal.FUNDING.PAYPAL,

								style: {
									shape: 'rect',
									height: 40,
								},

								// set up the transaction
								createOrder: (data, actions) => {
									const createOrderPayload = {
										purchase_units: [
											{
												amount: {
													value: cart.total,
												},
											},
										],
									};

									return actions.order.create(createOrderPayload);
								},

								// finalize the transaction
								onApprove: (data, actions) => {
									const captureOrderHandler = (details) => {
										const status = details.status;
										const transactionId = details.id;
										const unit = details.purchase_units[0];
										const capture = unit.payments.captures[0];
										const amount = capture.amount.value;
										const currency = capture.amount.currency_code;
										const paymentStatus = capture.status;

										console.log(status, transactionId, amount, currency, paymentStatus);
									};

									return actions.order.capture().then(captureOrderHandler);
								},

								// handle unrecoverable errors
								onError: (err) => {
									console.error(
										'An error prevented the buyer from checking out with PayPal',
										err
									);
								},
							});

							if (paypalButtonsComponent.isEligible()) {
								paypalButtonsComponent
									.render('#paypal-button-container')
									.catch((err) => {
										console.error('PayPal Buttons failed to render', err);
									});
							} else {
								console.log('The funding source is ineligible');
							}

							this.paypalLoaded = true;
						}
					});
				}
			},
		},
		async mounted() {
			this.billingSameAsShipping = this.getBillingSameAsShipping;
			// TODO: pull from .env
			this.stripe = await loadStripe('pk_test_51IRhFCAvkPHIPB19Zv5OPWHz6a7iiiMHwRzMLni9yZSdnIegXpkuPhptWfVrkbne3QAdlNV0O0Mp9VVBpKy1YlQ400xhc1s7D4');
			const elements = this.stripe.elements();
			this.card = elements.create('card');
			this.card.mount('#card-element');

			this.card.on('change', () => {
				this.cardError = null;
			});

			this.paypalForm = await this.$api.get('/actions/fc/payments/get-paypal-form-html');
		},
		methods: {
			...mapActions('cart', [
				'saveBillingSameAsShipping',
				'saveBillingAddress'
			]),
			...mapActions('checkout', [
				'decrementStep',
				'incrementStep',
			]),
			async saveBilling() {
				if (this.billingSameAsShipping) {
					await this.saveBillingSameAsShipping(true);
				} else {
					await this.saveBillingAddress(this.newAddress);
				}
			},
			async processStripePayment() {
				const paymentData = {
					billing_details: {
						email: this.getCurrentCart.customer.email,
					}
				};

				await this.saveBilling();

				if (this.getCartErrors.length === 0) {
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
									console.log('Order Done', response);
									this.incrementStep();
								}
							}
						});
				}
			},
			nextStep() {
				if (this.paymentGateway === 'stripe') {
					this.processStripePayment();
				} else if (this.paymentGateway === 'paypal') {
					// PayPal payment code here?
				} else {
					// Manual payment code here?
				}

				// this.incrementStep();
			},
			previousStep() {
				// ... Any code that needs to happen here before
				// stepping back in the process
				this.decrementStep();
			},
			loadScriptAsync(url, callback) {
				const script = document.createElement('script');

				script.setAttribute('src', url);
				script.onload = callback;
				document.head.insertBefore(script, document.head.firstElementChild);
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

			<div class="text-sm text-gray-500">Select a payment method</div>

			<div class="mt-6">
				<div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
					<div v-for="gateway in getGateways" :key="gateway.handle" class="flex items-center">
						<input
							:id="`gateway_${gateway.handle}`"
							v-model="paymentGateway"
							name="gateway"
							type="radio"
							:value="gateway.handle"
							class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<label :for="`gateway_${gateway.handle}`" class="ml-3 block text-sm font-medium text-gray-700">{{ gateway.name }}</label>
					</div>
				</div>
			</div>

			<div class="mt-6">

				<div v-show="paymentGateway === 'stripe'">
					<div class="flex flex-col justify-center items-stretch w-full h-10 px-4 border border-gray-300 rounded-md">
						<div id="card-element" />
					</div>
          <div v-if="cardError" class="text-red-500 text-sm mt-2">{{ cardError }}</div>
				</div>

				<div v-show="paymentGateway === 'paypal'">
					<div class="w-full px-4 py-2 border border-gray-300 rounded-md">
						<div v-html="paypalForm"></div>
					</div>
				</div>

				<div v-show="paymentGateway === 'manual'">
					<div class="w-full px-4 py-2 border border-gray-300 rounded-md">
						<div>Manual Payment Info Here</div>
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
        <CheckoutAddressFields v-model="newAddress" context="billing" :use-full-name="true" />
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
