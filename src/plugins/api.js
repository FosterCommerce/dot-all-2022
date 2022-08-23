import https from 'https';
import axios from 'axios';
import { stringify } from 'qs';

/*
import { stringify } from 'qs';
import merge from 'lodash/merge';
*/

const api = ($config, store) => ({
	get: async (uri) => {
		const csrfToken = await store.getters.getCsrfToken;
		const {
			data
		} = await axios.get(`${$config.baseURL}${uri}`, {
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
		}, );

		return data;
	},
	post: async (uri, postData) => {
		const csrfToken = await store.getters.getCsrfToken;
		const csrfTokeName = 'CRAFT_CSRF_TOKEN';
		const data = {
			action: uri,
		};

		data[csrfTokeName] = csrfToken;

		if (Object.values(postData).length > 0) {
			data.purchasableId = postData.id
			data.qty = postData.qty
		}

		console.log('stringified form data: ', stringify(data));

		const response = await axios.post($config.baseURL,
			stringify(data),
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
			},
			
		)
		console.log('form response: ', response);
		return response.data

	},
	updateQty: async (uri, postData) => {
		const csrfToken = await store.getters.getCsrfToken;
		const csrfTokeName = 'CRAFT_CSRF_TOKEN';
		console.log(postData)
		const data = {
			action: uri,
			lineItems: {[postData.itemId]: {'qty': postData.qty}}
		};

		data[csrfTokeName] = csrfToken;
		console.log('stringified form data: ', stringify(data));

		const response = await axios.post($config.baseURL,
			stringify(data),
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
			},
			
		)
		console.log('form response: ', response);
		return response.data

	},
	removeItem: async (uri, postData) => {
		const csrfToken = await store.getters.getCsrfToken;
		const csrfTokeName = 'CRAFT_CSRF_TOKEN';
		console.log(postData)
		const data = {
			action: uri,
			lineItems: {[postData.itemId]: {'remove': true}}
		};

		data[csrfTokeName] = csrfToken;
		console.log('stringified form data: ', stringify(data));

		const response = await axios.post($config.baseURL,
			stringify(data),
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
			},
			
		)
		console.log('form response: ', response);
		return response.data

	},
	getCart: async (uri) => {
		const csrfToken = await store.getters.getCsrfToken;
		const params = {
			action: uri,
			'CRAFT_CSRF_TOKEN': csrfToken
		};
		const response = await axios.get($config.baseURL,
			{
				params,
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
			
		)
		// console.log('form response: ', response);
		return response.data

	},
});

export default ({ app, $config, store }, inject) => {
	inject('api', api($config, store));
};
