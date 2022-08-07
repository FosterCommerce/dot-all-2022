<script>
	export default {
		name: 'CheckoutSummary',
		props: {
			isMobile: {
				type: Boolean
			}
		}
	};
</script>

<template>
	<dl class="text-sm font-medium text-gray-500 mt-10 space-y-6">
		<div class="flex justify-between">
			<dt>Subtotal</dt>
			<dd class="text-gray-900">$90.00</dd>
		</div>
		<div class="flex justify-between">
			<dt class="flex">
				Discount
				<span class="ml-2 rounded-full bg-gray-200 text-xs text-gray-600 py-0.5 px-2 tracking-wide">CHEAPSKATE</span>
			</dt>
			<dd class="text-gray-900">-$10.00</dd>
		</div>
		<div class="flex justify-between">
			<dt>Taxes</dt>
			<dd class="text-gray-900">$5.00</dd>
		</div>
		<div class="flex justify-between">
			<dt>Shipping</dt>
			<dd class="text-gray-900">$10.00</dd>
		</div>
		<div v-if="!isMobile" class="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-6">
			<dt class="text-base">Total</dt>
			<dd class="text-base">$95.00</dd>
		</div>
	</dl>
</template>
