import { print } from 'graphql';

export const state = () => ({
	primaryNav: [],
	csrfToken: "",
});

export const mutations = {
	setPrimaryNav(state, payload) {
		state.primaryNav = payload;
	},
	setCsrfToken(state, payload) {
		state.csrfToken = payload;
	}
}

export const getters = {
	// Returns the primary navigation link elements from the EntrySettings results
	getPrimaryNav(state) {
		const linkArr = [];
		state.primaryNav.forEach((obj) => {
			const linkObj = {
				target: obj.navLink.target ?? '_self',
				type: obj.navLink.type === 'entry' ? 'internal' : 'external'
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
	getCsrfToken(state) {
		return state.csrfToken;
	},
}

export const actions = {
	/**
	 * Server Init Action. Used to fetch global and layout-level data.
	 * On static generated sites, it runs for every page during generate.
	 * @param {commit, dispatch} VuexContext
	 * @param {*} NuxtContext
	 */
	async nuxtServerInit({ commit }) {
		// Fetch the settings entry to get the sites global navigation
		const query = await import('@/queries/EntrySettings.gql').then((module) => module.default);
		const {data: queryData} = await this.$api.graphqlQuery(query);
		commit('setPrimaryNav', queryData.entry.primaryNavigation);
	},
	/** Gets the session data an saves it into state */
	async fetchSessionData({ commit }) {
		// Get the session data from Craft and set it into state
		const sessionInfo = await this.$api.get('/actions/users/session-info');
		commit('setCsrfToken', sessionInfo.csrfTokenValue);
	}
}
