<script>
	import { print } from 'graphql';
	import Product from '@/queries/Product.gql';
	export default {
		async asyncData({isDev, route, $axios}) {
			const {data} = await $axios.$post('/api', {query: print(Product), variables: {
				slug: route.params.slug,
			},});
		
			return{
				product: data.product,
				variants: data.variants,
				selectedVariant: data.variants[0]
			}
		},
		data() {
			return {
				selectedVariant: null
			}
		},
		computed:{
			productImageUrl(){
				return this.selectedVariant === null ? this.variants[0].image[0].url : this.selectedVariant.image[0].url
			}
		},
		methods: {
			async addToCart(products) {
				this.$store.dispatch('checkout/updateCart', {...this.selectedVariant, qty: 1})
				await this.$api.post('commerce/cart/update-cart', products);
			},
			sizeUpdated(size){
				this.selectedVariant = this.variants.find(variant => variant.size === size)
			}
		},
	};
</script>

<template >
	<div>
		<div class="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
			<div class="lg:col-start-8 lg:col-span-5">
				<div class="flex justify-between">
					<h1 class="text-xl font-medium text-gray-900">{{product.title}}</h1>
					<p class="text-xl font-medium text-gray-900">${{selectedVariant.price}}</p>
				</div>
			</div>

			<!-- Image gallery -->
			<div class="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
				<h2 class="sr-only">Images</h2>
				<div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
					<!-- Primary Image -->
					<img :src="productImageUrl" alt="Back of women&#039;s Basic Tee in black." class="lg:col-span-2 lg:row-span-2 rounded-lg">

					<!-- Secondary Images -->
					<img v-for="(image, id) in selectedVariant.images" :key="id" :src="image.url" alt="Side profile of women&#039;s Basic Tee in black." class="hidden lg:block rounded-lg">
				</div>
			</div>

			<div class="mt-8 lg:col-span-5">
				<form class="space-y-8">
					<ProductColorPicker />
					<ProductSizePicker :sizes="variants.map( variant => variant.size)" @size-updated="sizeUpdated" />

					<!-- Add to Cart button -->
					<button
						type="button"
						class="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						@click='addToCart({ id: selectedVariant.id, qty: 1 })'
					>
						Add to cart
					</button>
				</form>

				<div class="mt-10">
					<h2 class="text-base font-medium text-gray-900">Description</h2>

					<div class="mt-4 space-y-6 prose prose-sm text-gray-500">
						<!-- Product Description (content blocks here) -->
						<div>
							<p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
							<p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
						</div>

						<ul role="list">
							<li>Quis elit egestas venenatis mattis dignissim.</li>
							<li>Cras cras lobortis vitae vivamus ultricies facilisis tempus.</li>
							<li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
						</ul>
					</div>

					<!-- Policies (Static Text) -->
					<section aria-labelledby="policies-heading" class="mt-10">
						<h2 id="policies-heading" class="sr-only">Our Policies</h2>
						<dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
							<div class="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
								<dt>
									<svg class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									<span class="mt-4 text-sm font-medium text-gray-900"> International delivery </span>
								</dt>
								<dd class="mt-1 text-sm text-gray-500">Get your order in 2 years</dd>
							</div>
							<div class="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
								<dt>
									<svg class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									<span class="mt-4 text-sm font-medium text-gray-900"> Loyalty rewards </span>
								</dt>
								<dd class="mt-1 text-sm text-gray-500">Don&#039;t look at other tees</dd>
							</div>
						</dl>
					</section>
				</div>
			</div>
		</div>
	</div>
</template>
