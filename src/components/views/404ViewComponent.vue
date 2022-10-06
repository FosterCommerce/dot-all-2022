<script>
	import FourOhFour from '@/queries/FourOhFour.gql';
	export default {
		data() {
			return {
				entry: {},
			};
		},

		async created() {
			// Call the query API method to get the data from Craft
			const { data } = await this.$api.graphqlQuery(FourOhFour);
			this.entry = data?.entry;
		},
	};
</script>

<template>
	<div>
		<!-- Page Header -->
		<header class="bg-white">
			<div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
				<div class="text-center">
					<h1 class="text-4xl font-extrabold tracking-tight text-gray-900">{{ entry.heading }}</h1>
				</div>
			</div>
		</header>

		<!-- Page Content -->
		<div v-if="entry" class="mt-12 mx-auto prose prose-indigo prose-lg text-gray-500 lg:mt-24">
			<ContentBlocks :blocks="entry.contentBlocks" />
		</div>
	</div>
</template>
