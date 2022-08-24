<script>
	export default {
		name: 'ProductPreviewCard',
	};
</script>

<template>
	<div class="group relative p-4 border-r border-b border-gray-200 sm:p-6">
		<!-- Product Preview Image -->
		<div class="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
			<img
				src="https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg"
				alt="TODO"
				class="w-full h-full object-center object-cover"
			/>
		</div>

		<div class="pt-10 pb-4 text-center">
			<!-- Product Title and Link -->
			<h3 class="text-base font-medium text-gray-900">
				<a href="#">
					<span aria-hidden="true" class="absolute inset-0"></span>
					Product Title Here
				</a>
			</h3>
			<!-- Product Preview Text -->
			<div class="mt-3 flex flex-col items-center">
				<p class="prose prose-sm text-gray-500">Look like a visionary CEO and wear the same black t-shirt every day.</p>
			</div>
			<!-- Product Price -->
			<p class="mt-4 text-base font-medium text-gray-900">$149</p>
		</div>
	</div>
</template>
