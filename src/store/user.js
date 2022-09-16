import User from '@/queries/User.gql';
import Addresses from '@/queries/Addresses.gql';

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
	addresses: [],
});

/**
 * Getters. These return properties of the state.
 */
export const getters = {
	/**
	 * Get the users ID.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @returns {number} - The current user ID.
	 */
	getUserId(state) {
		return state.userId;
	},
	/**
	 * Get whether or not the user is logged in.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @returns {boolean} - Whether or not the user is logged in.
	 */
	getIsGuest(state) {
		return state.isGuest;
	},
	/**
	 * Get the users email.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @returns {string} - The curren user's email.
	 */
	getEmail(state) {
		return state.email;
	},
	/**
	 * Get all the addresses for the user.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @returns {array} - List of addresses for the current user.
	 */
	getAddresses(state) {
		return state.addresses;
	},
};

/**
 * Mutations. These manipulate properties of the state.
 */
export const mutations = {
	/**
	 * Set the user ID in the state.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @returns {void}
	 */
	setUserId(state, payload) {
		state.userId = payload;
	},
	/**
	 * Set whether the user is logged in or not.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @returns {void}
	 */
	setIsGuest(state, payload) {
		state.isGuest = payload;
	},
	/**
	 * Set the email for the current user.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @returns {void}
	 */
	setEmail(state, payload) {
		state.email = payload;
	},
	/**
	 * Set the addresses for the current user.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @returns {void}
	 */
	setAddresses(state, payload) {
		state.addresses = payload;
	}
}

/**
 * Actions. These run mutations.
 */
export const actions = {
	/**
	 * Get a user by email address.
	 *
	 * @param {function} commit - Vuex commit method.
	 * @param {string}   email  - Email address for the user.
	 *
	 * @returns {void}
	 */
	async fetchUser({ commit }, email) {
		const { data } = await this.$api.graphqlQuery(
			User,
			{
				email
			}
		);

		commit('setUserId', data.user.id);
		commit('setEmail', data.user.email);
		commit('setAddresses', data.user.addresses);
	},
	/**
	 * Uses GraphQL to fetch the logged in users addresses from Craft and places them in state.
	 *
	 * @param {function} commit  - Vuex commit method.
	 * @param {function} getters - Vuex getter method.
	 *
	 * @returns {void}
	 */
	async fetchAddresses({ commit, getters }) {
		const { data } = await this.$api.graphqlQuery(
			Addresses,
			{
				ownerId: getters.getUserId
			}
		);
		commit('setAddresses', data.addresses);
	},
}
