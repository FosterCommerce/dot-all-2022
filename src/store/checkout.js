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
	/**
	 * The current step in the checkout process.
	 */
	currentStepNumber: 0,
	/**
	 * The email address
	 */
	email: '',
	/**
	 * The shipping address ID to use.
	 */
	shippingAddressId: 1,
	/**
	 * Whether billing and shipping addresses are the same.
	 */
	billingSameAsShipping: true,
	/**
	 * The billing address ID to use.
	 */
	billingAddressId: 1,
	/**
	 * The shipping method ID to use.
	 */
	shippingMethodId: 1,
	/**
	 * The options for shipping (carriers, speeds, etc).
	 */
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
	/**
	 * Errors, if any.
	 */
	checkoutErrors: [],
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
	},
	/**
	 * Get the email to use.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getEmail(state) {
		return state.email;
	},
	/**
	 * Get the shipping address ID to use.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getShippingAddressId(state) {
		return state.shippingAddressId;
	},
	/**
	 * Whether or not the billing address is the same as the shipping address.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getBillingSameAsShipping(state) {
		return state.billingSameAsShipping;
	},
	/**
	 * Get the billing address ID to use.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getBillingAddressId(state) {
		return state.billingAddressId;
	},
	/**
	 * Get the shipping method ID to use.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getShippingMethodId(state) {
		return state.shippingMethodId;
	},
	/**
	 * Get the available shipping methods.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getShippingMethodOptions(state) {
		return state.shippingMethodOptions;
	},
	/**
	 * Get Cart errors.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getCheckoutErrors(state) {
		return state.checkoutErrors;
	},
};

/**
 * Mutations. These set/modify properties of the state.
 */
export const mutations = {
	/**
	 * Set the current step number.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @property {number} payload - The step number to set.
	 */
	setCurrentStepNumber(state, payload) {
		state.currentStepNumber = payload;
	},
	/**
	 * Set the shipping method ID.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @property {string} payload - The email address to use.
	 */
	setEmail(state, payload) {
		state.email = payload;
	},
	/**
	 * Set the shipping method ID.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @property {number} payload - The ID of the shipping address to use.
	 */
	setShippingAddressId(state, payload) {
		state.shippingAddressId = payload;
	},
	/**
	 * Set whether or not the billing and shipping addresses are the same.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @property {boolean} payload - Whether or not the billing and shipping addresses are the same.
	 */
	setBillingSameAsShipping(state, payload) {
		state.billingSameAsShipping = payload;
	},
	/**
	 * Set the billing address ID to use.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @property {number} payload - The billing address ID to use.
	 */
	setBillingAddressId(state, payload) {
		state.shippingAddressId = payload;
	},
	/**
	 * Set the shipping method ID to use.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @property {number} payload - The shipping method ID to use.
	 */
	setShippingMethodId(state, payload) {
		state.shippingMethodId = payload;
	},

	/**
	 * Set the cart error.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @property {object} payload - Array of errors to set in the cart.
	 */
	setCheckoutErrors(state, payload) {
		state.checkoutErrors = payload;
	},
};

/**
 * Actions. These run the mutations which set the properties of the state.
 */
export const actions = {
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
	},

	async saveEmail({ commit, dispatch }, email) {
		try {
			const { cart } = await this.$api.postAction('/fc/cart/update-cart', { email });
			const errorNotices = handleNotices({ commit, dispatch }, cart.notices);

			if (errorNotices.length < 1) {
				console.log(cart);
				commit('cart/setCurrentCart', cart, { root:true });
				commit('setEmail', cart.email);
			}
		} catch (error) {
			handleError(commit, error);
		}
	}
};

/**
 * Sets cart notices and errors.
 *
 * @property {function} dispatch - Vuex dispatch method.
 * @property {function} commit   - Vuex commit method.
 * @property {object}   notices  - Array of notices for the cart.
 */
const handleNotices = ({ commit, dispatch }, notices) => {
	let errors = [];

	notices.forEach(notice => {
		errors = [...errors, notice.message];
	});

	commit('setCheckoutErrors', errors);

	// Remove the errors after 6 seconds.
	setTimeout(() => {
		commit('setCheckoutErrors', []);
	}, 6000);

	return errors;
};

/**
 * Handles errors that come back from the API.
 *
 * @property {function} commit - Vuex commit method.
 * @property {object}   error  - The error object from the server.
 */
const handleError = (commit, error) => {
	let errors = [];

	if (error.response.status === 400) {
		const cartErrors = Object.values(error.response.data.errors);

		cartErrors.forEach(parentErrors => {
			parentErrors.forEach(error => {
				errors = [...errors, error];
			});
		});

		commit('setCheckoutErrors', errors);

		// Remove the errors after 6 seconds.
		setTimeout(() => {
			commit('setCheckoutErrors', []);
		}, 6000);
	} else {
		commit('setCheckoutErrors', [
			"Your request could not be completed at the moment. Please try again.",
		]);

		// Remove the errors after 6 seconds.
		setTimeout(() => {
			commit('setCheckoutErrors', []);
		}, 6000);
	}

	return {
		success: false,
		error,
	};
};
