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

		/* NOTE: This code below is commented out for now as it causes a 'unable to verify the first certificate' error
		 * when trying to call Craft's GraphQL endpoint, and needs to be fixed/debugged before we can start bringing
		 * in GQL data from Craft
		*/

		
		const { data: queryData, queryErrors } = await this.$axios.$post('/api', {
			query: print(query),
		});
		commit('setPrimaryNav', queryData);
		
	},
}
