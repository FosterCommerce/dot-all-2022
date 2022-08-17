import axios from 'axios';

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
			for (const [idx, item] of postData.entries()) {
				formData[`purchasables[${idx}][id]`] = item.id;
				formData[`purchasables[${idx}][qty]`] = item.qty;
			}
		}

		/*const { data } = await axios.post($config.baseURL, formData, {
			headers: {
				'X-CSRF-Token': csrfToken.token,
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
				HTTP_X_REQUESTED_WITH: 'XMLHttpRequest',
			}
		});*/

		const { data } = await axios.get(`${$config.baseURL}`, {
			params: {
				CRAFT_CSRF_TOKEN: `${csrfToken.token}`,
				action: 'commerce/cart/load-cart'
			},
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		console.log(data);
		return data;
	},
});

export default ({ app, $config, store }, inject) => {
	inject('api', api($config, store));
};
