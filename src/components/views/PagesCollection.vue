<script>
	export default {
		name: 'PagesCollection',
		props: {
			entry: {
				type: Object,
				required: true
			}
		}
	};
</script>

<template>
	<div>
		<!-- Collection Header -->
		<header class="text-center py-16 px-4 sm:px-6 lg:px-8">
			<h1 class="text-4xl font-extrabold tracking-tight text-gray-900">{{ entry.title }}</h1>
			<p class="mt-4 max-w-xl mx-auto text-base text-gray-500">The secret to a tidy desk? Don't get rid of anything, just put it in really really nice looking containers.</p>
		</header>

		<!-- Collection Product grid -->
		<section aria-labelledby="products-heading" class="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
			<h2 id="products-heading" class="sr-only">Products</h2>
			<div class="-mx-px border-l border-t border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
				<ProductPreviewCard v-for="index in 12" :key="index" />
			</div>
		</section>

		<!-- Collection Pagination -->
		<Pagination />
	</div>
</template>
