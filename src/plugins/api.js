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
		};
	}

	const get = async (action, config = {}) => {
		const { data } = await axios.get(`/api${action}`, withDefaultConfig({ config }));

		return data;
	}

	const postAction = async (action, postData, config = {}) => {
		const data = {
			action,
			CRAFT_CSRF_TOKEN: await store.getters.getCsrfToken,
			...postData,
		};

		const response = await axios.post(`/api`,
			stringify(data),
			withDefaultConfig(config),

		)

		return response.data
	}

	return {
		get,
		postAction,
		graphqlQuery: async(query, variables, params) => {
			const data = {
				query: print(query),
				variables,
				params
			};

			const response = await axios.post(`/graphql`,
				data,
				withDefaultConfig({
					headers: {
						'Content-Type': 'application/json',
					}
				}),
			)

			return response.data;
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
