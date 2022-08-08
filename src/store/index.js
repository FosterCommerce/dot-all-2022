import { print } from 'graphql';

export const state = () => ({
	primaryNav: [],
	csrfToken: {}
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
	getPrimaryNav(state) {
		return state.primaryNav;
	}
}

export const actions = {
	/**
	 * Server Init Action. Used to fetch global and layout-level data.
	 * On static generated sites, it runs for every page during generate.
	 * @param {commit, dispatch} VuexContext
	 * @param {*} NuxtContext
	 */
	async nuxtServerInit({ commit, dispatch }) {
		const query = await import('@/queries/EntrySettings.gql').then((module) => module.default);

		
		/* NOTE the Craft Base URL must be http and not https 
			Otherwise you will get errors along the lines of 
			"unable to verify the first certificate" in local dev
		*/
		
		const { data: queryData, queryErrors } = await this.$axios.$post('/api', {
			query: print(query),
		});
		commit('setPrimaryNav', queryData);
		
		
	},
}
