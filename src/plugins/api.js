import https from 'https';
import axios from 'axios';
import { stringify } from 'qs';
import { print } from 'graphql';

const api = ($config, store) => {
	/**
	 * Utility to add default request config to requests, such as adding commonly used headers.
	 *
	 * @param {*} requestConfig custom request config to be merged with the default config.
	 * @returns merged request config.
	 */
	const withDefaultConfig = (requestConfig = {}) => {
		return {
			...requestConfig,
			withCredentials: true,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: 'application/json',
				...requestConfig.headers,
			},
			httpsAgent: new https.Agent({
				rejectUnauthorized: false,
			}),
		};
	}

	const get = async (action, config = {}) => {
		const { data } = await axios.get(`/api${action}`, withDefaultConfig({ config }));

		return data;
	}

	const postAction = async (action, postData, config = {}) => {
		let url;
		let useConfig;
		let data;

		if (action && !postData.query) { // Non-GQL
			url = '/api';
			useConfig = withDefaultConfig(config);
			data = {
				action,
				CRAFT_CSRF_TOKEN: await store.getters.getCsrfToken,
				...postData,
			};
		} else { // GQL
			url = `${$config.baseURL}/api`;
			useConfig = {
				withCredentials: true,
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json',
				Accept: 'application/json',
			};
			data = {
				query: print(postData.query)
			};

			if (postData.vars) {
				data.variables = postData.vars;
			}
		}

		const response = await axios.post(url,
			stringify(data),
			useConfig,
		);

		return response.data;
	}

	return {
		get,
		postAction,
		fetchCatalog: async(query, vars) => {
			const data = { query }

			if (vars) {
				data.vars = vars;
			}

			return await postAction(null, data, {});
		},
		addItem: async(item) => {
			const data = {
				purchasableId: item.id,
				qty: item.qty,
			};

			return await postAction('/commerce/cart/update-cart', data);
		},
		updateQty: async (item) => {
			const data = {
				lineItems: {[item.itemId]: {'qty': item.qty}},
			};

			return await postAction('/commerce/cart/update-cart', data);
		},
		removeItem: async (item) => {
			const data = {
				lineItems: {[item.itemId]: {'remove': true}},
			};

			return await postAction('/commerce/cart/update-cart', data);
		},
		getCart: async () => {
			return await get('/actions/commerce/cart/get-cart');
		},
		applyCoupon: async (item) => {
			const data = {
				couponCode: item.couponCode,
			};

			return await postAction('commerce/cart/update-cart', data);
		},
		clearNotices: async () => {
			const data = {
				clearNotices: 'clearNotices',
			};

			return await postAction('/commerce/cart/update-cart', data);
		}
	}
};

export default ({ app, $config, store }, inject) => {
	inject('api', api($config, store));
};
