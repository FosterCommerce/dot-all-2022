<script>
	/** This component acts as a controller to get the appropriate views component
	 * to render the page entry type. */

	import PagesGeneral from '@/components/views/PagesGeneral';
	import PagesCollection from '@/components/views/PagesCollection';

	export default {
		components: {
			PagesGeneral,
			PagesCollection
		},
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
				name: 'EntriesPages',
				variables: {
					uri: route.params.pathMatch,
					limit: 1,
				},
				params: previewParams,
			});

			return {
				entry: queryData?.entries[0],
			};
		},
		computed: {
			/** Calculates the page view component to call based on the Craft section handle and entry type handle
			 * of the entry we have fetched */
			pageViewComponent() {
				const section = this.entry?.sectionHandle.charAt(0).toUpperCase() + this.entry?.sectionHandle.slice(1);
				const type = this.entry?.typeHandle.charAt(0).toUpperCase() + this.entry?.typeHandle.slice(1);
				return section + type;
			},
		}
	}
</script>

<template>
	<div>
		<component :is="pageViewComponent" />
	</div>
</template>
