<script>
	export default {
		head: {
			headAttrs: {
				class: 'h-full bg-white'
			},
			bodyAttrs: {
				class: 'h-full'
			}
		}
	}
</script>

<template>
  <div class="h-full">
		<CheckoutHeader />
		<Nuxt />
  </div>
</template>


<style lang="postcss">
	#__nuxt,
	#__layout {
		height: 100vh;
	}
</style>
