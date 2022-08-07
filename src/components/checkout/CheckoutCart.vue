<script>
	export default {
		name: 'CheckoutCart',
		props: {
			isMobile: {
				type: Boolean
			}
		},
		computed: {
			style() {
				return this.isMobile ? 'divide-y divide-gray-200 border-b border-gray-200' : 'flex-auto overflow-y-auto divide-y divide-gray-200 px-6';
			}
		}
	};
</script>

<template>
	<ul role="list" :class="style">
		<li v-for="index in 3" :key="index" class="flex py-6 space-x-6">
			<CheckoutLineItem :line-item="{}" />
		</li>
	</ul>
</template>
