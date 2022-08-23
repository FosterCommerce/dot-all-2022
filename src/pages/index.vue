<script>
	export default {
		async asyncData({ route, store }) {
			// Check for Craft Live Preview params
			let previewParams = null;
			if (route.query['x-craft-live-preview']) {
				previewParams = {
					token: route.query.token,
					'x-craft-live-preview': route.query['x-craft-live-preview'],
				};
			}

			// Call the query API method to get the data from Craft
			const { data: queryData } = await store.dispatch('queryAPI', {
				name: 'EntryHome',
				variables: {
					limit: 1
				},
				params: previewParams,
			});

			return {
				entry: queryData?.entry,
			};
		},
		data() {
			return {
				entry: null,
			};
		},
	}
</script>

<template>
  <div>
		<!-- Hero -->
		<div class="flex flex-col border-b border-gray-200 lg:border-0">
			<div class="relative">
				<div aria-hidden="true" class="hidden absolute w-1/2 h-full bg-gray-100 lg:block"></div>
				<div class="relative bg-gray-100 lg:bg-transparent">
					<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2">
						<div class="max-w-2xl mx-auto py-24 lg:py-64 lg:max-w-none">
							<div class="lg:pr-16">
								<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:tracking-tight sm:text-5xl xl:tracking-tight xl:text-6xl">Focus on what matters</h1>
								<p class="mt-4 text-xl text-gray-600">All the charts, datepickers, and notifications in the world can't beat checking off some items on a paper card.</p>
							</div>
						</div>
					</div>
				</div>
				<div class="w-full h-48 sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-full">
					<img src="https://tailwindui.com/img/ecommerce-images/home-page-02-hero-half-width.jpg" alt="" class="w-full h-full object-center object-cover">
				</div>
			</div>
		</div>

		<!-- Page Content -->
		<div class="mt-12 mx-auto prose prose-indigo prose-lg text-gray-500 lg:mt-24">

			<!--
				DEV NOTE: This is where we should use the output from the content builder (ContentBlocks)
				The block components have already been built as well so you should just be able to include
				it here. The markup below is just an example of the output on this page type.
			-->

			<div>

				<h2>From beginner to expert in 30 days</h2>

				<div>
					<p>
						Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh.
						Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus
						mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
						ipsum eu a sed convallis diam.
					</p>

					<p>
						Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
						sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
					</p>
				</div>

			</div>

		</div>


  </div>
</template>
