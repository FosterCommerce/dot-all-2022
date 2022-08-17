import axios from 'axios';
import { stringify } from 'qs';

/*
import { stringify } from 'qs';
import merge from 'lodash/merge';
*/

const api = ($config, store) => ({
	get: async (uri) => {
		const { data } = await axios.get(`${$config.baseURL}${uri}`);

		return data;
	},
	post: async (uri, postData) => {
		const csrfToken = await store.getters.getCsrfToken;
		const formData = {
			action: uri,
		};

		formData[csrfToken.name] = csrfToken.token;

		if (Array.isArray(postData)) {
			for (const item of postData.entries()) {
				formData.qty = item.qty;
				formData.purchasableId = item.id;
			}
		}

		const { data } = axios.post('',
			formData,
			{
				withCredentials: false,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		).then((response) => {
			console.log(response);
		});

		/*const { data } = await axios.get('', {
			params: {
				CRAFT_CSRF_TOKEN: `${csrfToken.token}`,
				action: 'commerce/cart/load-cart'
			}
		});*/

		console.log(data);
		return data;
	},
});

export default ({ app, $config, store }, inject) => {
	inject('api', api($config, store));
};
