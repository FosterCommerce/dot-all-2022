export const state = () => ({
	steps: [
		{
			label: 'Email',
			handle: 'email',
			completed: false,
			errors: []
		},
		{
			label: 'Address',
			handle: 'address',
			completed: false,
			errors: []
		},
		{
			label: 'Shipping',
			handle: 'shipping',
			completed: false,
			errors: []
		},
		{
			label: 'Payment',
			handle: 'payment',
			completed: false,
			errors: []
		},
		{
			label: 'Confirmation',
			handle: 'confirmation',
			completed: false,
			errors: []
		}
	],
	currentStepNumber: 0,
	shippingAddressId: 1,
	billingSameAsShipping: true,
	billingAddressId: 1,
	shippingMethodId: 1,
	shippingMethodOptions: [
		{
			id: 1,
			name: 'USPS',
			description: '6-7 business days',
			price: 'Free'
		},
		{
			id: 2,
			name: 'FedEx',
			description: '1-2 business days',
			price: '$5.00'
		}
	],
	cart: [],
	modals: {
		login: false,
		addressEdit: false,
		addressDelete: false
	}
});

export const getters = {
	getSteps(state) {
		return state.steps;
	},
	getCurrentStepNumber(state) {
		return state.currentStepNumber;
	},
	getCurrentStep(state) {
		return state.steps[state.currentStepNumber];
	},
	getPreviousStep(state) {
		return state.steps[state.currentStepNumber - 1] ?? state.steps[state.currentStepNumber];
	},
	getNextStep(state) {
		return state.steps[state.currentStepNumber + 1] ?? state.steps[state.currentStepNumber];
	},
	getTotalSteps(state) {
		return state.steps.length;
	},
	getIsFirstStep(state) {
		return state.currentStepNumber === 0;
	},
	getIsLastStep(state) {
		return state.currentStepNumber === (state.steps.length - 1);
	},
	getShippingAddressId(state) {
		return state.shippingAddressId;
	},
	getBillingSameAsShipping(state) {
		return state.billingSameAsShipping;
	},
	getBillingAddressId(state) {
		return state.billingAddressId;
	},
	getShippingMethodId(state) {
		return state.shippingMethodId;
	},
	getShippingMethodOptions(state) {
		return state.shippingMethodOptions;
	},
	getModals(state) {
		return state.modals;
	},
	getCart(state){
		return state.cart
	}
}

export const mutations = {
	setCurrentStepNumber(state, payload) {
		state.currentStepNumber = payload;
	},
	setShippingAddressId(state, payload) {
		state.shippingAddressId = payload;
	},
	setBillingSameAsShipping(state, payload) {
		state.billingSameAsShipping = payload;
	},
	setBillingAddressId(state, payload) {
		state.shippingAddressId = payload;
	},
	setShippingMethodId(state, payload) {
		state.shippingMethodId = payload;
	},
	setModal(state, { context, payload }) {
		state.modals[context] = payload;
	},
}

export const actions = {
	decrementStep({ commit, getters }) {
		if (!getters.getIsFirstStep) {
			commit('setCurrentStepNumber', (getters.getCurrentStepNumber - 1));
		}
	},
	incrementStep({ commit, getters }) {
		console.log('Clicked next', getters.getCurrentStepNumber + 1);
		if (!getters.getIsLastStep) {
			commit('setCurrentStepNumber', (getters.getCurrentStepNumber + 1));
		}
	},
}
