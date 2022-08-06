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
		data() {
			return {
				entry: {
					title: "Page Title Here"
				},
			};
		},
		computed: {
			/** Calculates the page view component to call based on the Craft section handle and entry type handle
			 * of the entry we have fetched */

			/** FC DEVELOPER NOTE:
			 * The method below is just temporary code so I can include and test the markup for the different page types.
			 * The real computed method for determining which view to use and passing the Craft entry data into it,
			 * should be included here instead. See on our own FC site how we are doing this, here :
			 * https://github.com/FosterCommerce/fostercommerce-site/blob/develop/site-nuxt/pages/_.vue
			 */
			pageViewComponent() {
				const lastSlug = this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1);
				const section = 'Pages';
				const type = lastSlug === 'women' ? 'Collection' : 'General';
				return section + type;
			},
		}
	}
</script>

<template>
	<div>
		<component :is="pageViewComponent" :entry="entry" />
	</div>
</template>
