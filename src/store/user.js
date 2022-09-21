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
	 * Username (saved from login attempts)
	 */
	username: 'admin',
	/**
	 * Password (saved from login attempts)
	 */
	password: 'password',
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

	getUsername(state) {
		return state.username;
	},

	getPassword(state) {
		return state.password;
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
	setUsername(state, payload) {
		state.username = payload;
	},
	setPassword(state, payload) {
		state.password = payload;
	},
	setEmail(state, payload) {
		state.email = payload;
	},
	setAddresses(state, payload) {
		state.addresses = payload;
	}
}

export const actions = {
	/**
	 * Gets the session data, user data and saves it into state.
	 * Initializes the steps in the checkout process based on if the user is logged in or not
	 *
	 * @param {function} commit - Vuex commit method.
	 * @param {function} dispatch - Vuex dispatch method
	 * @param {function} getters - Vuex getter method
	 */
	async fetchSessionData({ getters, commit, dispatch }) {
		// If we have a username and password, lets use it to send along with the session request
		let config = {};
		if (getters.getUsername && getters.getPassword) {
			config = {
				auth: {
					username: getters.getUsername,
					password: getters.getPassword
				},
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}

		// Get the session data from Craft and set it into state
		const sessionInfo = await this.$api.get('/actions/users/session-info', config);

		console.log("Session Info Fetched", sessionInfo);

		// Set the CSRF token and isGuest values. Also set the checkout steps (for logged in users)
		commit('setCsrfToken', sessionInfo.csrfTokenValue, { root: true });
		commit('setIsGuest', sessionInfo.isGuest);
		dispatch('checkout/fetchSteps', sessionInfo.isGuest, { root: true });

		if (!sessionInfo.isGuest) {
			// If the user is not a guest, let's fetch their data
			await dispatch('fetchUser', sessionInfo.email);
		} else {
			// They are a guest, so let's just reset the username and password to null
			commit('setUsername', null);
			commit('setPassword', null);
		}
	},

	/**
	 * Uses GraphQL to fetch the a users data from Craft and places it into state
	 *
	 * @param {function} commit - Vuex commit method.
	 * @param {string} email - a users email address
	 */
	async fetchUser({ commit }, email) {
		if (email) {
			const { data } = await this.$api.graphqlQuery(
				User,
				{
					email
				}
			);
			commit('setUserId', data.user.id);
			commit('setEmail', data.user.email);
			commit('setAddresses', data.user.addresses);
		}
	},

	/**
	 * Uses GraphQL to fetch the logged in users addresses from Craft and places them in state
	 *
	 * @param {function} commit - Vuex commit method.
	 * @param {function} getters - Vuex getter method
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
