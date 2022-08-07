<script>
	export default {
		layout: 'checkout',
	}
</script>

<template>
	<main class="lg:overflow-hidden lg:flex lg:flex-row-reverse" style="min-height: calc(100% - 85px);">
		<h1 class="sr-only">Checkout</h1>

		<section aria-labelledby="order-heading" class="px-4 py-6 bg-gray-50 border-b border-gray-200 transition-opacity duration-300 sm:px-6 lg:hidden">
			<div class="max-w-2xl mx-auto">
				<div class="flex items-center justify-between">
					<h2 id="order-heading" class="text-lg font-medium text-gray-900">Your Order</h2>
					<button
						type="button"
						class="font-medium text-indigo-600 hover:text-indigo-500"
						aria-controls="disclosure-1"
					>
						<span>Show full summary</span>
					</button>
				</div>

				<div id="disclosure-1">
					<h3>Mobile Cart Here</h3>
					<h3>Mobile Discount Form Here</h3>
					<h3>Mobile Summary Here</h3>
				</div>

				<p class="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
					<span class="text-base">Total</span>
					<span class="text-base">$148.00</span>
				</p>
			</div>
		</section>

		<section
			v-cloak
			aria-labelledby="summary-heading"
			class="hidden bg-gray-50 w-full max-w-md flex-col transition-opacity duration-300 lg:flex"
		>
			<h2 id="summary-heading" class="sr-only">Order summary</h2>
			<h3>Desktop Cart Here</h3>
			<div class="sticky bottom-0 flex-none bg-gray-50 border-t border-gray-200 p-6">
				<h3>Desktop Discount Form Here</h3>
				<h3>Desktop Summary Here</h3>
			</div>
		</section>

		<section v-cloak class="flex-auto overflow-y-auto pt-2 px-4 pb-16 transition-opacity duration-300 sm:px-6 sm:pt-8 lg:px-8 lg:pt-0 lg:pb-24">
			<div class="max-w-2xl mx-auto">
				<form class="mt-6 lg:mt-16">
					<h2>Form Steps Here</h2>
					<h3>Nav Buttons Here</h3>
				</form>
			</div>
		</section>
	</main>
</template>
