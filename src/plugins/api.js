import https from 'https';
import axios from 'axios';
import { stringify } from 'qs';

/*
import { stringify } from 'qs';
import merge from 'lodash/merge';
*/

const api = ($config, store) => {
	/**
	 * Utility to add default request config to requests, such as adding commonly used headers.
	 *
	 * @param {*} requestConfig custom request config to be merged with the default config.
	 * @returns merged request config.
	 */
	const withDefaultConfig = (requestConfig = {}) => {
		const config = {
			...requestConfig,
			withCredentials: true,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: 'application/json',
				...requestConfig.headers,
			},
			httpsAgent: new https.Agent({
				rejectUnauthorized: false
			}),
		}

		return config;
	}

	const get = async (action, config = {}) => {
		const {
			data
		} = await axios.get(`${$config.baseURL}${action}`, withDefaultConfig({config}), );

		return data;
	}

	const postAction = async (action, postData, config = {}) => {
		const data = {
			action,
			CRAFT_CSRF_TOKEN: await store.getters.getCsrfToken,
			...postData,
		};

		// console.log('stringified form data: ', stringify(data));

		const response = await axios.post($config.baseURL,
			stringify(data),
			withDefaultConfig(config),

		)
		// console.log('postAction form response', response);
		return response.data
	}

	return {
		get,
		postAction,
		addItem: async(item) => {
			const data = {
				purchasableId: item.id,
				qty: item.qty,
			};

			return await postAction('commerce/cart/update-cart', data);
		},
		updateQty: async (item) => {
			const data = {
				lineItems: {[item.itemId]: {'qty': item.qty}}
			};

			return await postAction('commerce/cart/update-cart', data)
		},
		removeItem: async (item) => {
			const data = {
				lineItems: {[item.itemId]: {'remove': true}}
			};

			return await postAction('commerce/cart/update-cart', data);
		},
		getCart: async () => {
			return await get('/actions/commerce/cart/get-cart');
		},
		applyCoupon: async (item) => {
			const data = {
				couponCode: item.coupon
			};
			return await postAction('commerce/cart/update-cart', data);
		}
	}
};

export default ({ app, $config, store }, inject) => {
	inject('api', api($config, store));
};
