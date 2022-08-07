<script>
	import { mapGetters, mapMutations } from "vuex";

	export default {
		name: 'AddressFormDelete',
		computed: {
			...mapGetters('user', [
				'getAddresses'
			]),
			address() {
				return this.getAddresses[0];
			}
		},
		methods: {
			...mapMutations('checkout', [
				'setModal'
			]),
			closeModal() {
				this.setModal({ context: 'addressDelete', payload: false });
			},
			deleteAddress() {
				console.log('Delete address code here');
				this.closeModal();
			}
		}
	};
</script>

<template>
	<form class="mt-6 space-y-6">

		<div class="flex items-start mt-6 space-x-6">
			<div class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
				<svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
			</div>
			<p class="text-gray-500">
				<strong class="font-medium text-gray-700">
				<span v-if="address.company">
					{{ address.company }}<br/>
					{{ address.firstName }} {{ address.lastName }}
				</span>
					<span v-else>
					{{ address.firstName }} {{ address.lastName }}
				</span>
				</strong>
				<br/>
				<span>{{ address.address1 }},</span>
				<span v-if="address.address2">{{ address.address2 }},</span>
				<br/><span>{{ address.city }},</span>
				<span>{{ address.region }}</span>
				<br/><span>{{ address.zipCode }},</span>
				<span>{{ address.country }}</span>
			</p>
		</div>

		<div class="flex flex-col space-y-3 pt-6 border-t border-gray-200 sm:flex-row-reverse sm:justify-between sm:items-center sm:space-y-0">
			<button
				type="submit"
				class="flex justify-center items-center px-4 py-2 bg-red-600 text-base font-medium rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:inline-flex"
				@click.prevent="deleteAddress"
			>
				Delete Address
			</button>
			<button
				type="button"
				class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
				@click="closeModal"
			>
				Cancel
			</button>
		</div>

	</form>
</template>

