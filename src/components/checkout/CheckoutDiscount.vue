<script>
	export default {
		name: 'CheckoutDiscount',
		props: {
			isMobile: {
				type: Boolean
			}
		},
		data() {
			return {
				coupon:'',
				error: null
			}
		},
		computed: {
			device() {
				return this.isMobile ? 'mobile' : 'desktop';
			}
		},
		methods:{
			applyCoupon(){
				if (this.coupon === '') {
					return
				}
				this.$store.dispatch('cart/applyCoupon', {couponCode: this.coupon})
			}
		}
	};
</script>

<template>
	<form :class="{ 'mt-10': isMobile }">
		<label :for="`discount-code-${device}`" class="block text-sm font-medium text-gray-700">Discount code</label>
		<div class="flex space-x-4 mt-1">
			<input
				:id="`discount-code-${device}`"
				v-model="coupon"
				type="text"
				:name="`discount-code-${device}`"
				class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			/>
			<button
				class="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
				@click.prevent="applyCoupon"
			>
				Apply
			</button>
		</div>
		<span v-if="error !== null" class="text-red-500 text-sm mt-2 ">{{error}}</span>
		<!-- <span class="text-red-500 text-sm py-2 ">{{"Coupon removed: Coupon not valid."}}</span> -->
	</form>
</template>
