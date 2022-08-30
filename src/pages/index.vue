<script>
	import EntryHome from '@/queries/EntryHome.gql';

	export default {
		async asyncData({ $api, route }) {
			// Check for Craft Live Preview params
			let previewParams = null;
			if (route.query['x-craft-live-preview']) {
				previewParams = {
					token: route.query.token,
					'x-craft-live-preview': route.query['x-craft-live-preview'],
				};
			}

			// Call the query API method to get the data from Craft
			const {data: queryData} = await $api.graphqlQuery(
				EntryHome,
				{limit: 1},
				previewParams,
			);

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
		<!-- Hero Header -->
		<BaseHomeHero :entry="entry" />

		<!-- Page Content -->
		<div class="mt-12 mx-auto prose prose-indigo prose-lg text-gray-500 lg:mt-24">
			<ContentBlocks :blocks="entry.contentBlocks" />
		</div>
  </div>
</template>
