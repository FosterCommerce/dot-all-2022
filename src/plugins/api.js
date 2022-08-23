import axios from 'axios';
import { stringify } from 'qs';
import { print } from 'graphql';
// import merge from 'lodash/merge';

const api = ($config, store) => ({
	get: async (uri) => {
		const { data } = await axios.get(`${$config.baseURL}${uri}`);

		return data;
	},
	post: async (uri, postData) => {
		const data = {};
		const headers = {
			'X-Requested-With': 'XMLHttpRequest',
			Accept: 'application/json',
		};
		let postURL = $config.baseURL;
		let query;

		if (uri !== '/api') { // not GraphQL
			const csrfToken = await store.getters.getCsrfToken;
			const csrfTokeName = 'CRAFT_CSRF_TOKEN';

			data[csrfTokeName] = csrfToken;

			headers['Content-Type'] = 'application/x-www-form-urlencoded';
			headers['X-CSRF-Token'] = csrfToken;
			data.action = uri;

			if (Object.values(postData).length > 0) {
				data.purchasableId = postData.id
				data.qty = postData.qty
			}

			query = stringify(data);
		} else { // GraphQL
			headers['Content-Type'] = 'application/json';
			postURL += uri;
			query = { query: print(postData) };
		}

		await axios.post(postURL,
			query,
			{
				withCredentials: true,
				headers,
			}
		).then((response) => {
			console.log('form response: ', response);
		});
	},
});

export default ({ app, $config, store }, inject) => {
	inject('api', api($config, store));
};
