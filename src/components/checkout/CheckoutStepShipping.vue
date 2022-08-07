<script>
	import { mapGetters, mapMutations } from "vuex";

	export default {
		name: "CheckoutStepShipping",
		computed: {
			...mapGetters('checkout', [
				'getShippingMethodId',
				'getShippingMethodOptions'
			])
		},
		methods: {
			...mapMutations('checkout', [
				'setShippingMethodId'
			]),
			setShippingMethod(id) {
				this.setShippingMethodId(id);
			}
		}
	}
</script>

<template>
	<section aria-labelledby="shipping-heading">

		<h2 id="shipping-heading" class="text-xl font-medium text-gray-900 lg:text-2xl">Shipping method</h2>
		<p class="text-sm text-gray-500">Select a shipping method.</p>

		<div class="mt-6">

			<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">

				<label
					v-for="method in getShippingMethodOptions"
					:key="method.id"
					:for="`shippingMethod_${method.id}`"
					class="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
					:class="`${ method.id === getShippingMethodId ? 'border-transparent' : 'border-gray-300' }`"
				>
					<input
						:id="`shippingMethod_${method.id}`"
						type="radio"
						name="shippingMethodId"
						class="sr-only"
						:aria-labelledby="`shippingMethod_${method.id}_label`"
						:aria-describedby="`shippingMethod_${method.id}_description_0 shippingMethod_${method.id}_description_1`"
						:value="method.id"
						:checked="method.id === getShippingMethodId"
						@click="setShippingMethod(method.id)"
					>
					<div class="flex-1 flex">
						<div class="flex flex-col">
							<span :id="`shippingMethod_${method.id}_label`" class="block text-sm font-medium text-gray-900">{{ method.name }}</span>
							<span :id="`shippingMethod_${method.id}_description_0`" class="mt-1 flex items-center text-sm text-gray-500">{{ method.description }}</span>
							<span :id="`shippingMethod_${method.id}_description_1`" class="mt-6 text-sm font-medium text-gray-900">{{ method.price }}</span>
						</div>
					</div>
					<svg v-show="method.id === getShippingMethodId" class="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
					</svg>
					<div class="absolute -inset-px rounded-lg border-2 pointer-events-none" :class="`${method.id === getShippingMethodId ? 'border-indigo-500' : 'border-transparent'}`" aria-hidden="true"></div>
				</label>

			</div>

		</div>

	</section>
</template>
