<script>
	import { mapGetters, mapActions } from "vuex";
	import Addresses from '@/queries/Addresses.gql';

	export default {
		name: "CheckoutStepAddress",
		data() {
			return {
				editModalOpen: false,
				deleteModalOpen: false,
				userAddress: null,
				shippingAddressId: '', // This is our local state (for the selectors)
				newAddress: {
					id: '',
					firstName: '',
					lastName: '',
					organization: '',
					addressLine1: '',
					addressLine2: '',
					locality: '',
					administrativeArea: '',
					countryCode: '',
					postalCode: '',
					phone: ''
				},
				isSaving: false,
				cartShippingAddress: null,
			}
		},
		async fetch() {
			// Run the users/fetchAddresses here ?
			await this.$store.dispatch('cart/fetchCart');

			// Run the cart/fetchCart here ?
			await this.$store.dispatch('user/fetchAddresses', 1);

			// Run the logic to set the local shipping address ID variable here ?
			if (!this.getShippingAddressId && !this.getSourceShippingAddressId) {
				console.log('No shipping address and no source address');

				// There is no shipping address set and no source shipping address set ...
				// Lets set it to the first of their address (if they have any)
				if (this.getAddresses.length) {
					this.shippingAddressId = this.getAddresses[0].id;
				}
			} else if (this.getShippingAddressId && !this.getSourceShippingAddressId) {
				console.log('There is a shipping address but no source address');

				// There is a shipping address, but there is no source ID so its a new address ...
				// Not based on any of the users addresses
				this.newAddress = this.fetchAddress(this.getShippingAddressId);
			} else {
				// There is both a shipping address ID and a source address ID ...
				// So it's related to one of the users addresses
				console.log('There is a shipping address and a source address');

				this.getAddresses.forEach((address) => {
					if (parseInt(address.id) === parseInt(this.getSourceShippingAddressId)) {
						this.shippingAddressId = address.id;
					}
				});
			}
		},
		computed: {
			...mapGetters('user', [
				'getIsGuest',
				'getAddresses'
			]),
			...mapGetters('checkout', [
				'getPreviousStep',
				'getNextStep',
				'getIsFirstStep'
			]),
			...mapGetters('cart', [
				'getShippingAddressId',
				'getSourceShippingAddressId',
				'getShippingAddress',
				'getCartErrors'
			]),
		},
		methods: {
			...mapActions('checkout', [
				'decrementStep',
				'incrementStep'
			]),
			...mapActions('cart', [
				'fetchShippingAddress',
				'saveShippingAddress'
			]),

			loadUserAddress(id) {
				const address = this.getAddresses.filter((address) => {
					return address.id === id;
				});
				this.userAddress = address.length ? address[0] : null;
			},
			toggleEditAddressModal() {
				this.editModalOpen = !this.editModalOpen;
			},
			toggleDeleteAddressModal() {
				this.deleteModalOpen = !this.deleteModalOpen;
			},
			editAddress(id) {
				this.loadUserAddress(id);
				this.toggleEditAddressModal();
			},
			deleteAddress(id) {
				this.loadUserAddress(id);
				this.toggleDeleteAddressModal();
			},

			async fetchAddress(id) {
				const { data } = await this.$api.graphqlQuery(
					Addresses,
					{
						id,
						limit: 1
					}
				);
				return data.addresses.length ? data.addresses[0] : null;
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
		<p v-if="!getIsGuest && getAddresses.length" class="text-sm text-gray-500">Select one of your saved addresses or add a new one.</p>

		<div v-if="!getIsGuest && getAddresses.length" class="mt-6 divide-y divide-gray-200">

			<div v-for="address in getAddresses" :key="address.id" class="relative flex items-start py-4">
				<div class="min-w-0 flex-1 text-sm">
					<label :for="`address_${address.id}`" class="font-medium text-gray-700">
						<span v-if="address.organization">{{ address.organization }} - {{ address.firstName }} {{ address.lastName }}</span>
						<span v-if="!address.organization">{{ address.firstName }} {{ address.lastName }}</span>
					</label>
					<p :id="`address_${address.id}_description`" class="text-gray-500">
						<span>{{ address.addressLine1 }},</span>
						<span v-if="address.addressLine2">{{ address.addressLine2 }},</span>
						<br/><span>{{ address.locality }},</span>
						<span>{{ address.administrativeArea }},</span>
						<span>{{ address.postalCode }},</span>
						<span>{{ address.countryCode }}</span>
					</p>
					<div class="flex justify-start space-x-2">
						<button
							type="button"
							class="inline-flex items-center mt-2 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							@click="editAddress(address.id)"
						>
							Edit
						</button>
						<button
							type="button"
							class="inline-flex items-center mt-2 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							@click="deleteAddress(address.id)"
						>
							Delete
						</button>
					</div>
				</div>
				<div class="ml-3 flex items-center h-5">
					<input
						:id="`address_${address.id}`"
						v-model="shippingAddressId"
						:aria-describedby="`address_${address.id}_description`"
						name="address"
						type="radio"
						:value="address.id"
						class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
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
						v-model="shippingAddressId"
						aria-describedby="address_0_description"
						name="address"
						type="radio"
						value=""
						class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
					/>
				</div>
			</div>

		</div>

		<div v-show="getIsGuest || shippingAddressId === ''">

			<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
				<div class="sm:col-span-3">
					<label :for="`FirstName-${newAddress.id}`" class="block text-sm font-medium text-gray-700">First Name</label>
					<div class="mt-1">
						<input
							:id="`FirstName-${newAddress.id}`"
							v-model="newAddress.firstName"
							:name="`FirstName`"
							type="text"
							autocomplete="given-name"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label :for="`LastName-${newAddress.id}`" class="block text-sm font-medium text-gray-700">Last Name</label>
					<div class="mt-1">
						<input
							:id="`LastName-${newAddress.id}`"
							v-model="newAddress.lastName"
							:name="`LastName`"
							type="text"
							autocomplete="family-name"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>
				</div>

				<div class="sm:col-span-6">
					<div class="flex justify-between">
						<label :for="`Company-${newAddress.id}`" class="block text-sm font-medium text-gray-700">Company</label>
						<span :id="`Company-optional-${newAddress.id}`" class="text-sm text-gray-400">Optional</span>
					</div>
					<div class="mt-1">
						<input
							:id="`Company-${newAddress.id}`"
							v-model="newAddress.organization"
							:name="`Company`"
							:aria-describedby="`Company-optional-${newAddress.id}`"
							type="text"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
				</div>

				<div class="sm:col-span-4">
					<label :for="`Address1-${newAddress.id}`" class="block text-sm font-medium text-gray-700">Street Address</label>
					<div class="mt-1">
						<input
							:id="`Address1-${newAddress.id}`"
							v-model="newAddress.addressLine1"
							:name="`Address1`"
							type="text"
							autocomplete="street-address"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>
				</div>

				<div class="sm:col-span-2">
					<div class="flex justify-between">
						<label :for="`Address2-${newAddress.id}`" class="block text-sm font-medium text-gray-700">Apt.</label>
						<span :id="`Address2-optional-${newAddress.id}`" class="text-sm text-gray-400">Optional</span>
					</div>
					<div class="mt-1">
						<input
							:id="`Address2-${newAddress.id}`"
							v-model="newAddress.addressLine2"
							type="text"
							:name="`Address2`"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							:aria-describedby="`Address2-optional${newAddress.id}`"
						/>
					</div>
				</div>

				<div class="sm:col-span-2">
					<label :for="`City-${newAddress.id}`" class="block text-sm font-medium text-gray-700">City</label>
					<div class="mt-1">
						<input
							:id="`City-${newAddress.id}`"
							v-model="newAddress.locality"
							type="text"
							:name="`City`"
							autocomplete="address-level2"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>
				</div>

				<div class="sm:col-span-2">
					<label :for="`Region-${newAddress.id}`" class="block text-sm font-medium text-gray-700">State / Province</label>
					<div class="mt-1">
						<input
							:id="`Region-${newAddress.id}`"
							v-model="newAddress.administrativeArea"
							type="text"
							:name="`Region`"
							autocomplete="address-level1"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>
				</div>

				<div class="sm:col-span-2">
					<label :for="`Country-${newAddress.id}`" class="block text-sm font-medium text-gray-700">Country</label>
					<div class="mt-1">
						<select
							:id="`Country-${newAddress.id}`"
							v-model="newAddress.countryCode"
							:name="`Country`"
							autocomplete="country-name"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						>
							<option value="US">United States</option>
							<option value="UK">United Kingdom</option>
							<option value="CL">Chile</option>
							<option value="ES">Spain</option>
							<option value="NG">Nigeria</option>
							<option value="ZA">South Africa</option>
						</select>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label :for="`ZipCode-${newAddress.id}`" class="block text-sm font-medium text-gray-700">Postal code</label>
					<div class="mt-1">
						<input
							:id="`ZipCode-${newAddress.id}`"
							v-model="newAddress.postalCode"
							type="text"
							:name="`ZipCode`"
							autocomplete="postal-code"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							required
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<div class="flex justify-between">
						<label :for="`Phone-${newAddress.id}`" class="block text-sm font-medium text-gray-700">Phone</label>
						<span :id="`Phone-optional-${newAddress.id}`" class="text-sm text-gray-400">Optional</span>
					</div>
					<div class="mt-1">
						<input
							:id="`Phone-${newAddress.id}`"
							v-model="newAddress.phone"
							type="tel"
							:name="`Phone`"
							autocomplete="tel"
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							:aria-describedby="`Phone-optional${newAddress.id}`"
						/>
					</div>
				</div>
			</div>

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
				<span>Continue to {{ getNextStep.label }}</span>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mr-1 ml-3 hidden sm:inline-block" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
				</svg>
			</button>

			<nuxt-link
				v-if="getIsFirstStep"
				to="/"
				class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -ml-1 mr-3 hidden sm:inline-block" viewBox="0 0 20 20" fill="currentColor">
					<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
				</svg>
				<span>Continue Shopping</span>
			</nuxt-link>

			<button
				v-else
				class="flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
				@click.prevent="previousStep"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -ml-1 mr-3 hidden sm:inline-block" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
				</svg>
				<span>Return to {{ getPreviousStep.label }}</span>
			</button>

		</div>

		<BaseModal v-if="editModalOpen" title="Edit your address" width="xl" @close="toggleEditAddressModal">
			<AddressFormEdit :address="userAddress" @close="toggleEditAddressModal" />
		</BaseModal>

		<BaseModal v-if="deleteModalOpen" title="Delete this address?" @close="toggleDeleteAddressModal">
			<AddressFormDelete :address="userAddress" @close="toggleDeleteAddressModal" />
		</BaseModal>
	</section>
</template>
