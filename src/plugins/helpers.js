const helpers = ($route) => ({
	header() {
		const segments = $route.path.split('/');
		const lastSegment = segments.pop() || segments.pop();

		return lastSegment === 'checkout' ? 'CheckoutHeader' : 'TheHeader';
	},
});

export default ({ app, route }, inject) => {
  inject('helpers', helpers(route));
};
