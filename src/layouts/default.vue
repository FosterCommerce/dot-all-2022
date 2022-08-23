<script>
	import ProductsCatalog from '@/queries/ProductsCatalog.gql';

	export default {
		computed: {
			header() {
				return this.$helpers.header();
			},
		},
		async created() {
			const test = await this.$api.post(
				'/api',
				ProductsCatalog,
			);

			console.log(test);

			const sessionInfo = await this.$api.get('/actions/users/session-info', {}, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});
			console.log('csrf from /session-info: ', sessionInfo);
			await this.$store.dispatch('setCsrfToken', sessionInfo.csrfTokenValue);
		},
	}
</script>

<template>
  <div class="bg-white">
    <component :is="header" />
    <main class="mt-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>
