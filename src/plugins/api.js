import https from 'https';
import axios from 'axios';
import { stringify } from 'qs';
import { print } from 'graphql';

const api = ($config, store) => ({
	get: async (uri, action) => {
		const csrfToken = await store.getters.getCsrfToken;
		const params = {};
		let url = $config.baseURL;


		if (!action) {
			url += uri;
		} else {
			params.action = action;
			params.CRAFT_CSRF_TOKEN = csrfToken;
		}

		const { data } = await axios.get(
			url,
			params,
			{
				withCredentials: true,
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/x-www-form-urlencoded',
					Accept: 'application/json',
					'X-CSRF-Token': csrfToken,
				},
				httpsAgent: new https.Agent({
					rejectUnauthorized: false
				})
			}
		);

		return data;
	},
	post: async (uri, postData, vars) => {
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
				data.purchasableId = postData.id;
				data.qty = postData.qty;
			}

			query = stringify(data);
		} else { // GraphQL
			postURL += '/api';
			headers['Content-Type'] = 'application/json';
			query = { query: print(postData) };

			if (vars) {
				query.variables = vars;
			}
		}

		const response = await axios.post(postURL,
			query,
			{
				withCredentials: true,
				headers,
				httpsAgent: new https.Agent({
					rejectUnauthorized: false
				})
			},
		);

		return response?.data;
	},
});

export default ({ app, $config, store }, inject) => {
	inject('api', api($config, store));
};
