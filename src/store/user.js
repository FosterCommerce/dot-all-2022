export const state = () => ({
	isLoggedIn: false,
	addresses: [
		{
			id: 1,
			firstName: 'Michael',
			lastName: 'Van Dorth',
			company: 'Foster Commerce',
			address1: '1234 Test Street',
			address2: 'Apt. 3D',
			city: 'Los Angeles',
			region: 'California',
			country: 'US',
			zipCode: '93277',
			phone: '(555) 555-5555'
		}
	]
});

export const getters = {
	getIsLoggedIn(state) {
		return state.isLoggedIn;
	},
	getAddresses(state) {
		return state.addresses;
	}
}
