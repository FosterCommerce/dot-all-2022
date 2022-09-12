/**
 * The main Vuex state for checkout.
 */
export const state = () => ({
	/**
	 * The steps for the checkout process.
	 */
	steps: [
		{
			label: 'Email',
			handle: 'email'
		},
		{
			label: 'Address',
			handle: 'address'
		},
		{
			label: 'Shipping',
			handle: 'shipping'
		},
		{
			label: 'Payment',
			handle: 'payment'
		},
		{
			label: 'Confirmation',
			handle: 'confirmation'
		}
	],
	/**
	 * The current step in the checkout process.
	 */
	currentStepNumber: 0
});

/**
 * Getters. These return properties of the state.
 */
export const getters = {
	/**
	 * Get all the steps.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getSteps(state) {
		return state.steps;
	},
	/**
	 * Get the current step number that the user is on.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getCurrentStepNumber(state) {
		return state.currentStepNumber;
	},
	/**
	 * Get the step object itself based ont he step number the user is on.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getCurrentStep(state) {
		return state.steps[state.currentStepNumber];
	},
	/**
	 * Get the previous step, if there is one.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getPreviousStep(state) {
		return state.steps[state.currentStepNumber - 1] ?? state.steps[state.currentStepNumber];
	},
	/**
	 * Get the next step, if there is one.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getNextStep(state) {
		return state.steps[state.currentStepNumber + 1] ?? state.steps[state.currentStepNumber];
	},
	/**
	 * Get the total number of steps.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getTotalSteps(state) {
		return state.steps.length;
	},
	/**
	 * Whether or not the current step is the first one.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getIsFirstStep(state) {
		return state.currentStepNumber === 0;
	},
	/**
	 * Whether or not the current step is the last one.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getIsLastStep(state) {
		return state.currentStepNumber === (state.steps.length - 1);
	}
};

/**
 * Mutations. These set/modify properties of the state.
 */
export const mutations = {
	/**
	 * Set the steps.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @property {array} payload - An array fo step objects.
	 */
	setSteps(state, payload) {
		state.steps = payload;
	},
	/**
	 * Set the current step number.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @property {number} payload - The step number to set.
	 */
	setCurrentStepNumber(state, payload) {
		state.currentStepNumber = payload;
	}
};

/**
 * Actions. These run the mutations which set the properties of the state.
 */
export const actions = {
	/**
	 * Initializes the steps and modifies them if a user is already logged in
	 */
	fetchSteps({ commit, getters }, isGuest) {
		if (!isGuest) {
			const steps = [];
			getters.getSteps.forEach((step) => {
				if (step.handle !== 'email') {
					steps.push(step);
				}
			});
			commit('setSteps', steps);
		}
	},
	/**
	 * Decrement the current step number.
	 *
	 * @property {function} commit  - Vuex commit method.
	 * @property {object}   getters - Vuex getters method.
	 */
	decrementStep({ commit, getters }) {
		if (!getters.getIsFirstStep) {
			commit('setCurrentStepNumber', (getters.getCurrentStepNumber - 1));
		}
	},
	/**
	 * Increment the current step number.
	 *
	 * @property {function} commit  - Vuex commit method.
	 * @property {function} dispatch - Vuex dispatch method.
	 * @property {object} getters - Vuex getters object.
	 */
	incrementStep({ commit, getters }) {
		if (!getters.getIsLastStep) {
			commit('setCurrentStepNumber', (getters.getCurrentStepNumber + 1));
		}
	}
};
