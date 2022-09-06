/**
 * The main Vuex state for users.
 */
export const state = () => ({
	/**
	 * The users ID (if they are logged in)
	 */
	userId: null,
	/**
	 * Whether or not the user is logged in.
	 */
	isGuest: true,
	/**
	 * The user's email addresses.
	 */
	email: '',
	/**
	 * The user's addresses and other info.
	 */
	addresses: [
		{
			// The ID of an address (addresses are referenced by this ID in store/checkout.js)
			id: 1,
			firstName: 'Frodo',
			lastName: 'Baggins',
			company: 'Fellowship of the Ring',
			address1: '3 Bagshot Row',
			address2: '',
			city: 'Hobbiton Hill',
			region: 'The Shire',
			country: 'UK',
			zipCode: 'SL6',
			phone: '(555) 555-5555',
		},
	],
});

/**
 * Getters. These return properties of the state.
 */
export const getters = {
	/**
	 * Get the users ID.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getUserId(state) {
		return state.userId;
	},
	/**
	 * Get whether or not the user is logged in.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getIsGuest(state) {
		return state.isGuest;
	},
	/**
	 * Get the users email.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getEmail(state) {
		return state.email;
	},
	/**
	 * Get all the addresses for the user.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getAddresses(state) {
		return state.addresses;
	},
};

export const mutations = {
	setUserId(state, payload) {
		state.userId = payload;
	},
	setIsGuest(state, payload) {
		state.isGuest = payload;
	},
	setEmail(state, payload) {
		state.email = payload;
	}
}

export const actions = {
	populateAddresses({ dispatch }, userId) {
		console.log('The User ID is', userId);
	}
}
