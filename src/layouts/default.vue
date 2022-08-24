<script>
	import { mapGetters } from "vuex";
	export default {
		fetchOnServer: false,
		async fetch() {
			const sessionInfo = await this.$api.get(null, '/actions/users/session-info');

			await this.$store.dispatch('setCsrfToken', sessionInfo.csrfTokenValue);

			/** Get current cart from craft */
			const { cart } = await this.$api.get(null, '/commerce/cart/get-cart');
			console.log(cart)

			if (cart) {
				await this.$store.dispatch('cart/setCurrentCart', cart);

				/** Get current cart items from local storage */
				const items = localStorage.getItem(cart.number);

				await this.$store.dispatch('cart/setItems', JSON.parse(items));
			}

			await this.$store.dispatch('cart/setLoading', false);
		},
		computed: {
			header() {
				return this.$helpers.header();
			},
			...mapGetters( {
				cartErrors: 'cart/getCartErrors',
			}),
		},
	}
</script>

<template>
  <div class="bg-white">
	<div v-if="cartErrors.length > 0" class="fixed w-full top-0 right-0 bg-white py-2 z-50 max-w-md space-y-3">
		<div v-for="error in cartErrors" :key="error" class="px-2 py-2 text-sm rounded bg-red-500 text-white">{{error}}</div>
	</div>  
    <component :is="header" />
    <main class="mt-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>
