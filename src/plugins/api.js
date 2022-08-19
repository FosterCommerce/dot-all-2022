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

		await axios.post($config.baseURL,
			stringify(data),
			{
				withCredentials: true,
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/x-www-form-urlencoded',
					Accept: 'application/json',
					'X-CSRF-Token': csrfToken,
				},
			}
		).then((response) => {
			console.log('form response: ', response);

		});

	},
});

export default ({ app, $config, store }, inject) => {
	inject('api', api($config, store));
};
