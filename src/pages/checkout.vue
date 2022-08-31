<script>
	import { mapGetters } from "vuex";

	export default {
		data() {
			return {
				mobileSummaryOpen: false
			};
		},
		computed: {
			...mapGetters( {getCurrentStep:'checkout/getCurrentStep',
				getIsLastStep:'checkout/getIsLastStep',
				isLoading: 'cart/getLoading',
				cart: 'cart/getCurrentCart',
			}),
			layoutStyle() {
				return !this.getIsLastStep ? 'lg:overflow-hidden lg:flex lg:flex-row-reverse' : '';
			}
		},
		methods: {
			toggleMobileSummary() {
				this.mobileSummaryOpen = !this.mobileSummaryOpen;
			}
		}
	}
</script>

<template>
	<div>
		<CartErrors />

		<main :class="layoutStyle" :style="`${!getIsLastStep ? 'min-height: calc(100% - 85px);' : ''}`">
			<h1 class="sr-only">Checkout</h1>

			<section v-if="!getIsLastStep" aria-labelledby="order-heading" class="px-4 py-6 bg-gray-50 border-b border-gray-200 transition-opacity duration-300 sm:px-6 lg:hidden">
				<div class="max-w-2xl mx-auto">
					<div class="flex items-center justify-between">
						<h2 id="order-heading" class="text-lg font-medium text-gray-900">Your Order</h2>
						<button
							type="button"
							class="font-medium text-indigo-600 hover:text-indigo-500"
							aria-controls="disclosure-1"
							@click="toggleMobileSummary"
						>
							<span v-if="mobileSummaryOpen">Hide full summary</span>
							<span v-else>Show full summary</span>
						</button>
					</div>

					<div v-if="mobileSummaryOpen" id="disclosure-1">
						<CheckoutCart :is-mobile="true" />
						<CheckoutDiscount :is-mobile="true" />
						<CheckoutSummary :is-mobile="true" />
					</div>

					<p class="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
						<span class="text-base">Total</span>
						<span class="text-base">{{cart.totalAsCurrency}}</span>
					</p>
				</div>
			</section>

			<section
				v-if="!getIsLastStep"
				aria-labelledby="summary-heading"
				class="hidden bg-gray-50 w-full max-w-md flex-col transition-opacity duration-300 lg:flex"
			>
				<h2 id="summary-heading" class="sr-only">Order summary</h2>
				<CheckoutCart v-if="!isLoading"/>
				<div v-else class="py-12 flex justify-center items-end">
					<BaseLoader />
				</div>
				<div class="sticky bottom-0 flex-none bg-gray-50 border-t border-gray-200 p-6">
					<CheckoutDiscount />
					<CheckoutSummary />
				</div>
			</section>


			<section v-if="!getIsLastStep" class="flex-auto overflow-y-auto pt-2 px-4 pb-16 transition-opacity duration-300 sm:px-6 sm:pt-8 lg:px-8 lg:pt-0 lg:pb-24">
				<div class="max-w-2xl mx-auto">
					<form class="mt-6 lg:mt-16">
						<CheckoutStepEmail v-if="getCurrentStep.handle === 'email'" />
						<CheckoutStepAddress v-if="getCurrentStep.handle === 'address'" />
						<CheckoutStepShipping v-if="getCurrentStep.handle === 'shipping'" />
						<CheckoutStepPayment v-if="getCurrentStep.handle === 'payment'" />
						<CheckoutNavigation />
					</form>
				</div>
			</section>

			<CheckoutStepConfirm v-if="getIsLastStep" />
		</main>
	</div>
</template>
