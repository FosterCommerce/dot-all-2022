<script>
	export default {
		fetchOnServer: false,
		async fetch() {
			const sessionInfo = await this.$api.get('/actions/users/session-info', {}, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});
			console.log('csrf from /session-info: ', sessionInfo);
			await this.$store.dispatch('setCsrfToken', sessionInfo.csrfTokenValue);


			/** Get current cart from craft */
			const {cart} = await this.$api.getCart(`/commerce/cart/get-cart`);
			await this.$store.dispatch('cart/setCartId', cart.number);

			/** Get current cart items from local storage */
			const items = await localStorage.getItem(this.$store.state.cart.cartId);

			/** If there is no current cart items clear local storage */
			if(items === null){
				localStorage.clear();
			}
			this.$store.dispatch('cart/setItems', JSON.parse(items))
		},
		computed: {
			header() {
				return this.$helpers.header();
			},
		},
	
	}
</script>

<template>
  <div class="bg-white">
    <component :is="header" />
    <main class="mt-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>
