import { print } from 'graphql';

export const state = () => ({
	primaryNav: [],
	csrfToken: {},
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
	async nuxtServerInit({ commit, dispatch }) {
		// Fetch the settings entry to get the sites global navigation
		const query = await import('@/queries/EntrySettings.gql').then((module) => module.default);
		const { data: queryData, queryErrors } = await this.$axios.$post('/api', {
			query: print(query),
		});
		commit('setPrimaryNav', queryData);
	},
	/**
	 *
	 * Imports a GQL file to be used for a fetch request, then
	 * querying the GraphQL API with the relevant query string.
	 * Utilizes graphql/language/printer to convert from AST to a string for Craft.
	 * @param {dispatch, commit, state} param0
	 * @param {name, variables, params}
	 * @returns
	 */
	async queryAPI({ commit }, { name, variables, params }) {
		const query = await import(`@/queries/${name}.gql`).then((module) => module.default);
		return await this.$axios.$post(
			'/api',
			{
				query: print(query),
				variables,
			},
			{
				params,
			}
		);
	},
	setCsrfToken({ commit }, csrfData) {
		commit('setCsrfToken', csrfData);
	},
}
