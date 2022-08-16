/*
import { stringify } from 'qs';
import merge from 'lodash/merge';
*/

const api = ($config, $axios) => ({
	get: async (uri) => {
		const { data } = await $axios.get(`${uri}`);

		return data;
	},
	post: () => {
		console.log('heya');
	},
});

export default ({ app, $config, $axios }, inject) => {
	inject('api', api($config, $axios));
};
