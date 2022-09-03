/**
 * The main Vuex state for users.
 */
export const state = () => ({
	/**
	 * Whether or not the user is logged in.
	 */
	isLoggedIn: false,
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
	 * Get whether or not the user is logged in.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getIsLoggedIn(state) {
		return state.isLoggedIn;
	},
	/**
	 * Get all the addresses for the user.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getAddresses(state) {
		return state.addresses;
	},
	populateAddresses() {

	}
};
