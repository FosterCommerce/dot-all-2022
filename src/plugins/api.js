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
		const data = {
			action: uri,
		};

		console.log('csrf3:', csrfToken.token);
		data.csrfTokenName = csrfToken.token;
		
		if (Object.values(postData).length > 0) {
			data.purchasableId = postData.id
			data.qty = postData.qty
		}


		console.log(stringify(data));

		await axios.post($config.baseURL,
			stringify(data),
			{
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/x-www-form-urlencoded',
					Accept: 'application/json',
					'X-CSRF-Token': csrfToken.token,
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
	},
});

export default ({ app, $config, store }, inject) => {
	inject('api', api($config, store));
};
