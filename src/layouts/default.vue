<script>
	export default {
		computed: {
			header() {
				return this.$helpers.header();
			},
		},
		async created() {
			const critical = await this.$api.get('/api/get-critical');
			await this.$store.dispatch('setCsrfToken', critical.csrfToken);
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
