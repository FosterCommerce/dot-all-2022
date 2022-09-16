/**
 * The main Vuex state.
 */
export const state = () => ({
	primaryNav: [],
	csrfToken: "",
});

/**
 * Getters. These return properties of the state.
 */
export const getters = {
	/**
	 * Returns the primary navigation link elements from the EntrySettings results.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @returns {Array} - The nav links.
	 */
	getPrimaryNav(state) {
		const linkArr = [];

		state.primaryNav.forEach((obj) => {
			const linkObj = {
				target: obj.navLink.target ?? '_self',
				type: obj.navLink.type === 'entry' ? 'internal' : 'external',
			}

			if(obj.navLink.type === 'entry' && obj.navLink.element) {
				linkObj.label = obj.navLink.customText ?? obj.navLink.element.title;
				linkObj.url = '/' + obj.navLink.element.uri;
			} else {
				linkObj.label = obj.navLink.customText;
				linkObj.url = obj.navLink.url;
			}

			linkArr.push(linkObj);
		});

		return linkArr;
	},
	/**
	 * Get the Craft CSRF token from the state.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @returns {string} - The Craft CSRF token.
	 */
	getCsrfToken(state) {
		return state.csrfToken;
	},
};

/**
 * Mutations. These set/modify properties of the state.
 */
export const mutations = {
	/**
	 * Set the primary nav for the site.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @property {object} payload - The primary nav array.
	 *
	 * @returns {void}
	 */
	setPrimaryNav(state, payload) {
		state.primaryNav = payload;
	},
	/**
	 * Set the Craft CSRF token.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 *
	 * @property {string} payload - The CSRF token from Craft.
	 *
	 * @returns {void}
	 */
	setCsrfToken(state, payload) {
		state.csrfToken = payload;
	},
};

/**
 * Actions. These run the mutations which set the properties of the state.
 */
export const actions = {
	/**
	 * Server Init Action. Used to fetch global and layout-level data.
	 * On static generated sites, it runs for every page during generate.
	 *
	 * @param {function} commit - Vuex commit method.
	 *
	 * @returns {void}
	 */
	async nuxtServerInit({ commit }) {
		// Fetch the settings entry to get the sites global navigation
		const query = await import('@/queries/EntrySettings.gql').then((module) => module.default);
		const { data: queryData } = await this.$api.graphqlQuery(query);

		commit('setPrimaryNav', queryData.entry.primaryNavigation);
	},

	/**
	 * Gets the session data, user data and saves it into state.
	 * Initializes the steps in the checkout process based on if the user is logged in or not
	 *
	 * @param {function} commit - Vuex commit method.
	 * @param {function} dispatch - Vuex dispatch method
	 *
	 * @returns {void}
	 */
	async fetchSessionData({ commit, dispatch }) {
		// Get the session data from Craft and set it into state
		const sessionInfo = await this.$api.get('/actions/users/session-info');
		commit('setCsrfToken', sessionInfo.csrfTokenValue);
		commit('user/setIsGuest', sessionInfo.isGuest);
		if (!sessionInfo.isGuest) {
			commit('user/setUserId', sessionInfo.userId);
			commit('user/setEmail', sessionInfo.email);
		}
		dispatch('checkout/initializeSteps', sessionInfo.isGuest);
	},
};
