import axios from 'axios';

/*
import { stringify } from 'qs';
import merge from 'lodash/merge';
*/

const api = ($config) => ({
	get: async (uri) => {
		const { data } = await axios.get(`${$config.baseURL}${uri}`);

		return data;
	},
	post: () => {
		console.log('heya');
	},
});

export default ({ app, $config }, inject) => {
	inject('api', api($config));
};
