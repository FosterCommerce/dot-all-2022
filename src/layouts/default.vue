<script>
	export default {
		fetchOnServer: false,
		async fetch() {
			const sessionInfo = await this.$api.get('/actions/users/session-info');

			await this.$store.dispatch('setCsrfToken', sessionInfo.csrfTokenValue);

			/** Get current cart from craft */
			const {cart} = await this.$api.getCart();

			await this.$store.dispatch('cart/setCartId', cart.number);
			await this.$store.dispatch('cart/setCurrentCart', cart);

			/** Get current cart items from local storage */
			const items = await localStorage.getItem(cart.number);

			await this.$store.dispatch('cart/setItems', JSON.parse(items))
			this.$store.dispatch('cart/setLoading', false)

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
