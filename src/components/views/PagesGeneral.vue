<script>
	export default {
		name: 'PagesGeneral',
	};
</script>

<template>
	<div>
		<header class="bg-white">
			<div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
				<div class="text-center">
					<p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">General Page Title Here</p>
					<p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">Start building for free, then add a site plan to go live. Account plans unlock additional features.</p>
				</div>
			</div>
		</header>

		<div class="relative px-4 sm:px-6 lg:px-8">
			<div class="mt-6 mx-auto prose prose-indigo prose-lg text-gray-500">

				<!--
					DEV NOTE: This is where we should use the output from the content builder (ContentBlocks)
					The block components have already been built as well so you should just be able to include
					it here. The markup below is just an example of the output on this page type.
				-->

				<div>

					<div>
						<p>
							Faucibus commodo massa rhoncus, volutpat. <strong>Dignissim</strong> sed <strong>eget risus enim</strong>.
							Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra
							tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.
							<a href="#">Mattis mauris semper</a> sed amet vitae sed turpis id.
						</p>

						<ul>
							<li>Quis elit egestas venenatis mattis dignissim.</li>
							<li>Cras cras lobortis vitae vivamus ultricies facilisis tempus.</li>
							<li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
						</ul>

						<p>Quis semper vulputate aliquam venenatis egestas sagittis quisque orci. Donec commodo sit viverra aliquam
							porttitor ultrices gravida eu. Tincidunt leo, elementum mattis elementum ut nisl, justo, amet, mattis. Nunc
							purus, diam commodo tincidunt turpis. Amet, duis sed elit interdum dignissim.
						</p>
					</div>


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

					<figure>
						<img
							class="w-full rounded-lg"
							src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
							alt=""
							width="1310"
							height="873"
						/>
					</figure>

					<h2>Everything you need to get up and running</h2>

					<div>
						<p>
							Purus morbi dignissim senectus mattis <a href="#">adipiscing</a>. Amet, massa quam varius orci dapibus
							volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus
							non molestie. Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc,
							congue erat ac. Cras fermentum convallis quam.
						</p>

						<p>Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
							sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
						</p>
					</div>

					<nuxt-link
						to="/"
						target="_self"
						class="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex items-center justify-center text-base font-medium text-white no-underline hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Go To Our Homepage
					</nuxt-link>

				</div>

			</div>
		</div>
	</div>
</template>

