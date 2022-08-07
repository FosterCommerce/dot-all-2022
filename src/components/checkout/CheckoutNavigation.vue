<script>
	import { mapGetters, mapActions } from "vuex";

	export default {
		name: 'CheckoutNavigation',
		computed: {
			...mapGetters('checkout', [
				'getSteps',
				'getCurrentStepNumber',
				'getCurrentStep',
				'getPreviousStep',
				'getNextStep',
				'getIsFirstStep',
				'getIsLastStep'
			])
		},
		methods: {
			...mapActions('checkout', [
				'decrementStep',
				'incrementStep'
			]),
			previousStep() {
				this.decrementStep();
			},
			nextStep() {
				this.incrementStep();
			}
		}
	}
</script>

<template>
	<div class="flex flex-col justify-start items-stretch gap-y-4 pt-8 sm:flex-row-reverse sm:justify-between sm:items-center lg:pt-16">

		<button
			v-if="!getIsLastStep"
			class="flex justify-center items-center py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
			:class="getCurrentStep.handle === 'payment' ? 'px-8' : 'px-4'"
			@click.prevent="nextStep"
		>
			<span>{{ getCurrentStep.handle === 'payment' ? 'Pay $95.00' : ('Continue to ' + getNextStep.label) }}</span>
			<svg v-if="getCurrentStep.handle === 'payment'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mr-1 ml-3 hidden sm:inline-block" viewBox="0 0 20 20" fill="currentColor">
				<path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
				<path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
			</svg>
			<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mr-1 ml-3 hidden sm:inline-block" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
			</svg>
		</button>

		<nuxt-link
			v-if="getIsFirstStep"
			to="/"
			class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -ml-1 mr-3 hidden sm:inline-block" viewBox="0 0 20 20" fill="currentColor">
				<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
			</svg>
			<span>Continue Shopping</span>
		</nuxt-link>

		<button
			v-if="!getIsFirstStep && !getIsLastStep"
			class="flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
			@click.prevent="previousStep"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -ml-1 mr-3 hidden sm:inline-block" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
			</svg>
			<span>Return to {{ getCurrentStepNumber > 0 ? getPreviousStep.label : 'cart' }}</span>
		</button>

	</div>
</template>
