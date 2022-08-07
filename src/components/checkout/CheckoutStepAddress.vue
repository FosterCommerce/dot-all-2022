<script>
	import { mapGetters, mapMutations } from "vuex";

	export default {
		name: "CheckoutStepAddress",
		computed: {
			...mapGetters('user', [
				'getIsLoggedIn',
				'getAddresses'
			]),
			...mapGetters('checkout', [
				'getShippingAddressId',
			])
		},
		methods: {
			...mapMutations('checkout', [
				'setShippingAddressId',
				'setModal'
			]),
			editAddress() {
				this.setModal({ context: 'addressEdit', payload: true })
			},
			deleteAddress() {
				this.setModal({ context: 'addressDelete', payload: true })
			},
			setShippingAddress(id) {
				this.setShippingAddressId(id);
			}
		}
	}
</script>

<template>
	<section aria-labelledby="address-heading">

		<h2 id="address-heading" class="text-xl font-medium text-gray-900 lg:text-2xl">Where should we mail your order?</h2>
		<p v-if="getAddresses.length" class="text-sm text-gray-500">Select one of your saved addresses or add a new one.</p>

		<div v-if="getAddresses.length" class="mt-6 divide-y divide-gray-200">

			<div v-for="address in getAddresses" :key="address.id" class="relative flex items-start py-4">
				<div class="min-w-0 flex-1 text-sm">
					<label :for="`address_${address.id}`" class="font-medium text-gray-700">
						<span v-if="address.company">{{ address.company }} - {{ address.firstName }} {{ address.lastName }}</span>
						<span v-if="!address.company">{{ address.firstName }} {{ address.lastName }}</span>
					</label>
					<p :id="`address_${address.id}_description`" class="text-gray-500">
						<span>{{ address.address1 }},</span>
						<span v-if="address.address2">{{ address.address2 }},</span>
						<br/><span>{{ address.city }},</span>
						<span>{{ address.region }},</span>
						<span>{{ address.zipCode }},</span>
						<span>{{ address.country }}</span>
					</p>
					<div class="flex justify-start space-x-2">
						<button
							type="button"
							class="inline-flex items-center mt-2 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							@click="editAddress"
						>
							Edit
						</button>
						<button
							type="button"
							class="inline-flex items-center mt-2 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							@click="deleteAddress"
						>
							Delete
						</button>
					</div>
				</div>
				<div class="ml-3 flex items-center h-5">
					<input
						:id="`address_${address.id}`"
						:aria-describedby="`address_${address.id}_description`"
						name="address"
						type="radio"
						:value="address.id"
						:checked="parseInt(getShippingAddressId) === parseInt(address.id)"
						class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
						@change="setShippingAddress(address.id)"
					/>
				</div>
			</div>

			<div class="relative flex items-start py-4">
				<div class="min-w-0 flex-1 text-sm">
					<label for="address_0" class="font-medium text-gray-700">New Address</label>
					<p id="address_0_description" class="text-gray-500">Use a different shipping address</p>
				</div>
				<div class="ml-3 flex items-center h-5">
					<input
						id="address_0"
						aria-describedby="address_0_description"
						name="address"
						type="radio"
						value="0"
						:checked="getShippingAddressId === 0 || getAddresses.length === 0"
						class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
						@change="setShippingAddress(0)"
					/>
				</div>
			</div>

		</div>

		<div v-show="getShippingAddressId === 0 || getAddresses.length === 0">

			<CheckoutAddressFields context="shipping" />

			<div v-if="!getIsLoggedIn" class="mt-6 sm:col-span-6">
				<div class="relative flex items-start">
					<div class="flex items-center h-5">
						<input
							id="create-account"
							aria-describedby="create-account-description"
							name="create-account"
							type="checkbox"
							class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="create-account" class="font-medium text-gray-700">Create an account</label>
						<span id="create-account-description" class="text-gray-500">
            <span class="sr-only">Create an account</span> to save this information for next time.
          </span>
					</div>
				</div>
			</div>

		</div>

		<div class="mt-12">
			<div class="flex justify-between">
				<label for="instructions" class="block text-sm font-medium text-gray-700">Special Instructions</label>
				<span id="instructions-optional" class="text-sm text-gray-400">Optional</span>
			</div>
			<div class="mt-1">
      <textarea
				id="instructions"
				rows="4"
				name="instructions"
				class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
				aria-describedby="instructions-optional"
			></textarea>
			</div>
		</div>

		<CheckoutModal context="addressEdit" title="Edit your address" width="xl">
			<AddressFormEdit />
		</CheckoutModal>

		<CheckoutModal context="addressDelete" title="Delete this address?">
			<AddressFormDelete />
		</CheckoutModal>
	</section>
</template>
