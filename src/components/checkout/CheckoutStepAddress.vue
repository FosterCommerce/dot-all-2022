<script>
	import { mapGetters, mapMutations, mapActions } from "vuex";

	export default {
		name: "CheckoutStepAddress",
		data() {
			return {
				editModalOpen: false,
				deleteModalOpen: false,
			}
		},
		computed: {
			...mapGetters('user', [
				'getIsGuest',
				'getAddresses'
			]),
			...mapGetters('checkout', [
				'getShippingAddressId',
			])
		},
		methods: {
			...mapMutations('checkout', [
				'setShippingAddressId',
			]),
			...mapActions('checkout', [
				'decrementStep',
				'incrementStep'
			]),
			toggleEditAddressModal() {
				this.editModalOpen = !this.editModalOpen;
			},
			editAddress() {
				// Code here to load in the address the user will edit, then open the modal
				this.toggleEditAddressModal();
			},
			toggleDeleteAddressModal() {
				this.deleteModalOpen = !this.deleteModalOpen;
			},
			deleteAddress() {
				// Code here to load in the address the user will delete, then open the modal
				this.toggleDeleteAddressModal();
			},
			setShippingAddress(id) {
				this.setShippingAddressId(id);
			},
			nextStep() {
				// ... Code to save the data back to Commerce here
				// and if there are no errors we can then increment the step
				this.incrementStep();
			},
			previousStep() {
				// ... Any code that needs to happen here before
				// stepping back in the process
				this.decrementStep();
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

			<div v-if="getIsGuest" class="mt-6 sm:col-span-6">
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

		<div class="flex flex-col justify-start items-stretch gap-y-4 pt-8 sm:flex-row-reverse sm:justify-between sm:items-center lg:pt-16">
			<button
				class="flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
				@click.prevent="nextStep"
			>
				<span>Continue to Shipping</span>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mr-1 ml-3 hidden sm:inline-block" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
				</svg>
			</button>

			<button
				class="flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
				@click.prevent="previousStep"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -ml-1 mr-3 hidden sm:inline-block" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
				</svg>
				<span>Return to Email</span>
			</button>
		</div>

		<BaseModal v-if="editModalOpen" title="Edit your address" width="xl" @close="toggleEditAddressModal">
			<AddressFormEdit @close="toggleEditAddressModal" />
		</BaseModal>

		<BaseModal v-if="deleteModalOpen" title="Delete this address?" @close="toggleDeleteAddressModal">
			<AddressFormDelete @close="toggleDeleteAddressModal" />
		</BaseModal>
	</section>
</template>
