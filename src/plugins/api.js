import { stringify } from 'qs';
import { print } from 'graphql';

/**
 * Methods for interfacing with the Craft back end.
 */
const api = ({$axios}, $config, store) => {
	/**
	 * Utility to add default request config to requests, such as adding commonly used headers.
	 *
	 * @param {object} requestConfig - Custom request config to be merged with the default config.
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
	};

	/**
	 * For making GET requests to the Craft back end.
	 *
	 * @property {string} action - The Craft action URI.
	 * @property {object} config - Custom request configuration (such as headers).
	 */
	const get = async (action, config = {}) => {
		const { data } = await $axios.get(`/api${action}`, withDefaultConfig({ config }));
		return data;
	};

	/**
	 * For making POST requests to the Craft back end.
	 *
	 * @property {string} action   - The Craft action URI.
	 * @property {object} postData - The data to post.
	 * @property {object} config   - Custom request configuration (such as headers).
	 */
	const postAction = async (action, postData, config = {}) => {
		const data = {
			action,
			CRAFT_CSRF_TOKEN: await store.getters.getCsrfToken,
			...postData,
		};

		const response = await $axios.post(`/api`,
			stringify(data),
			withDefaultConfig(config),
		);

		return response.data;
	};

	/**
	 * All of the methods we are exporting from this file.
	 */
	return {
		get,
		postAction,
		/**
		 * For sending GQL queries to the Craft back end.
		 *
		 * @property {object} query     - The query to run.
		 * @property {object} variables - The variables to pass into the query.
		 * @property {object} params    - Any extra params to post with the request.
		 */
		graphqlQuery: async(query, variables, params) => {
			const data = {
				query: print(query),
				variables,
				params,
			};
			const response = await $axios.post(`/graphql`,
				data,
				withDefaultConfig({
					headers: {
						'Content-Type': 'application/json',
					},
				}),
			);
			return response.data;
		},
		/**
		 * For adding an item to the cart.
		 *
		 * @property {object} item - The item to add to the cart.
		 */
		addItem: async(item) => {
			const data = {
				purchasableId: item.id,
				qty: item.qty,
			};
			return await postAction('/fc/cart/update-cart', data);
		},
		/**
		 * For updating the quantity of an item in the cart.
		 *
		 * @property {object} item - The item to update the quantity for.
		 */
		updateQty: async (item) => {
			const data = {
				lineItems: { [item.itemId]: {'qty': item.qty} },
			};
			return await postAction('/fc/cart/update-cart', data);
		},
		/**
		 * For removing an item from the cart.
		 *
		 * @property {object} item - The item to remove from the cart.
		 */
		removeItem: async (item) => {
			const data = {
				lineItems: {[item.itemId]: {'remove': true}},
			};
			return await postAction('/fc/cart/update-cart', data);
		},
		/**
		 * Apply a coupon to the cart.
		 *
		 * @property {object} item - The coupon object.
		 */
		applyCoupon: async (item) => {
			const data = {
				couponCode: item.couponCode,
			};
			return await postAction('/fc/cart/update-cart', data);
		},
		/**
		 * Clears errors/notices from the Craft back end for the cart.
		 */
		clearNotices: async () => {
			const data = {
				clearNotices: 'clearNotices',
			};
			return await postAction('/fc/cart/update-cart', data);
		},

		saveAddress: async (address) => {
			const data = {
				addressId: address.id,
				...address
			};
			return await postAction('users/save-address', data);
		},

		deleteAddress: async (address) => {
			const data = {
				addressId: address.id,
			};
			return await postAction('users/delete-address', data);
		},

		submitStripePayment: async (paymentInfo) => {
			try {
				return await postAction('/commerce/payments/pay', paymentInfo);
			} catch (e) {
				if (e.response) {
					return e.response.data;
				} else {
					// TODO Handle some case where response is not set
					return null;
				}
			}
		},

		submitManualPayment: async () => {
			try {
				return await postAction('/commerce/payments/pay');
			} catch (e) {
				if (e.response) {
					return e.response.data;
				} else {
					// TODO Handle some case where response is not set
					return null;
				}
			}
		},
	};
};

/**
 * Injects the api method into Vue so it can be used globally throughout the app.
 * Example usage: this.$api.graphqlQuery([query], [vars], [params]);
 */
export default ({ app, $config, store }, inject) => {
	inject('api', api(app, $config, store));
};
