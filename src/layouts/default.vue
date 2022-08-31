<script>
	import { mapGetters } from "vuex";
	import SEOMaticQuery from '@/queries/SEOMatic.gql';

	export default {
		fetchOnServer: false,
		data() {
			return {
				metaTags: null,
				title: null,
			};
		},
		async fetch() {
			const sessionInfo = await this.$api.get('/actions/users/session-info');

			await this.$store.dispatch('setCsrfToken', sessionInfo.csrfTokenValue);

			/** Get current cart from craft */
			const {cart} = await this.$api.getCart();

			await this.$store.dispatch('cart/setCartId', cart.number);
			await this.$store.dispatch('cart/setCurrentCart', cart);

			await this.syncCartItems(cart);
		},
		head() {
			const tags = [];
			const result = {
				title: this.title,
			};

			if (this.metaTags) {
				const meta = Object.entries(this.metaTags);
				const fullPath = this.$route.fullPath;
				const path = fullPath.replace(/^\//g, '').replace(/\/$/g, '');
				const pathArr = path.split('/');
				let hid = '';

				for (let i = 0; i < pathArr.length; i++) {
					hid += i ? this.ucfirst(pathArr[i]) : pathArr[i];
				}

				for (const tag of meta) {
					const data = tag[1];

					if (data?.content && data?.content.length) {
						data.hid = hid;

						if (data.name) {
							data.hid += this.ucfirst(data.name);
						} else if (data.property) {
							const props = data.property.split(':');

							for (const prop of props) {
								data.hid += this.ucfirst(prop);
							}
						}

						tags.push(data);
					}
				}
			}

			result.meta = [...tags];

			return result;
		},
		computed: {
			...mapGetters({
				cartErrors: 'cart/getCartErrors',
			}),
			header() {
				return this.$helpers.header();
			},
		},
		watch: {
			$route(to) {
				this.seoData(to.fullPath);
			},
		},
		mounted() {
			this.seoData(this.$route.fullPath);
		},
		methods:{
			async syncCartItems(cart) {
				/** Get current cart items from local storage */
				const items = localStorage.getItem(cart.number);

				/** Sync local and craft cart items  */
				const localCartItems = JSON.parse(items);
				const syncedCartItems = [];

				if (cart.lineItems.length && localCartItems) {
					cart.lineItems.forEach(lineItem => {
						localCartItems.forEach(localCartItem => {
							if (lineItem.id === localCartItem.itemId) {
								syncedCartItems.push({...localCartItem, qty: lineItem.qty});
							}
						});
					});
				}

				await localStorage.setItem(cart.number, JSON.stringify(syncedCartItems));

				await this.$store.dispatch('cart/setItems', syncedCartItems);
				await this.$store.dispatch('cart/setLoading', false);
			},
			async seoData(uri) {
				const seoData = await this.$api.graphqlQuery(SEOMaticQuery, { uri });

				if (seoData?.data?.seomatic) {
					const data = seoData.data.seomatic;

					if (data?.metaTitleContainer) {
						const titleContainer = JSON.parse(data?.metaTitleContainer);

						this.title = titleContainer.title?.title;
					}

					if (data?.metaTagContainer) {
						this.metaTags = JSON.parse(data.metaTagContainer);
					}
				}
			},
			ucfirst(str) {
				return str[0].toUpperCase() + str.slice(1).toLowerCase();
			},
		},
	};
</script>

<template>
  <div class="bg-white">
	 <transition
		enter-active-class="transform transition ease-in-out duration-300"
		enter-class="translate-x-full"
		enter-to-class="translate-x-0"
		leave-active-class="transform transition ease-in-out duration-300"
		leave-from-class="translate-x-0"
		leave-to-class="translate-x-full"
	>
		<div v-if="cartErrors.length > 0" class="fixed w-full top-0 right-0 bg-white py-2 px-4 z-50 max-w-md space-y-3">
			<div v-for="(error, i) in cartErrors" :key="i" class="px-2 py-2 text-sm rounded bg-red-500 text-white">{{error}}</div>
		</div>  
	 </transition>

    <component :is="header" />

    <main class="mt-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <Nuxt />
    </main>

    <TheFooter />
  </div>
</template>
