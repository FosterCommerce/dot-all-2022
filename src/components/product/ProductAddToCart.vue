<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: 'ProductAddToCart',
		props: {
			/** The Commerce purchasable object  */
			purchasable: {
				type: Object,
				required: true
			},
			/** The amount of the purchasable to add to the cart */
			qty: {
				type: [Number, String],
				required: true
			},
			/** Redirect to a URL after adding the item to the cart? */
			redirect: {
				type: String,
				required: false,
				default: null
			}
		},
		data() {
			return {
				adding: false
			};
		},
		computed: {
			...mapGetters('cart', [
				'getCartErrors'
			])
		},
		methods: {
			...mapActions('cart', [
				'addNewItem'
			]),
			/** Adds the item to the cart via the cart Vuex action */
			async addToCart() {
				this.adding = true;
				await this.addNewItem({ ...this.purchasable, qty: this.qty });
				this.adding = false;
				if (this.redirect && this.getCartErrors.length === 0) {
					window.location.href = this.redirect
				}
			}
		}
	};
</script>

<template>
	<button
		type="button"
		:class="{ 'opacity-25 cursor-not-allowed': adding }"
		class="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		:disabled="adding"
		@click='addToCart'
	>
		<span v-if="adding">Adding to cart ...</span>
		<span v-else>Add to cart</span>
	</button>
</template>

