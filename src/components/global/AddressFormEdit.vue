<script>
	import { mapActions } from "vuex";

	export default {
		name: 'AddressFormEdit',
		props: {
			address: {
				type: Object,
				required: false,
				default: () => ({
					id: 0,
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
				})
			}
		},
		data() {
			return {
				addressData: JSON.parse(JSON.stringify(this.address)),
				error: ''
			};
		},
		methods: {
			...mapActions('user', [
				'fetchAddresses'
			]),
			close() {
				this.$emit('close');
			},
			async saveAddress() {
				await this.$api.saveAddress(this.addressData);
				await this.fetchAddresses();
				this.close();
			}
		}
	};
</script>

<template>
	<form class="mt-6 space-y-6">

		<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
			<div class="sm:col-span-3">
				<label :for="`FirstName-${addressData.id}`" class="block text-sm font-medium text-gray-700">First Name</label>
				<div class="mt-1">
					<input
						:id="`FirstName-${addressData.id}`"
						v-model="addressData.firstName"
						:name="`FirstName`"
						type="text"
						autocomplete="given-name"
						class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required
					/>
				</div>
			</div>

			<div class="sm:col-span-3">
				<label :for="`LastName-${addressData.id}`" class="block text-sm font-medium text-gray-700">Last Name</label>
				<div class="mt-1">
					<input
						:id="`LastName-${addressData.id}`"
						v-model="addressData.lastName"
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
					<label :for="`Company-${addressData.id}`" class="block text-sm font-medium text-gray-700">Company</label>
					<span :id="`Company-optional-${addressData.id}`" class="text-sm text-gray-400">Optional</span>
				</div>
				<div class="mt-1">
					<input
						:id="`Company-${addressData.id}`"
						v-model="addressData.organization"
						:name="`Company`"
						:aria-describedby="`Company-optional-${addressData.id}`"
						type="text"
						class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
			</div>

			<div class="sm:col-span-4">
				<label :for="`Address1-${addressData.id}`" class="block text-sm font-medium text-gray-700">Street Address</label>
				<div class="mt-1">
					<input
						:id="`Address1-${addressData.id}`"
						v-model="addressData.addressLine1"
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
					<label :for="`Address2-${addressData.id}`" class="block text-sm font-medium text-gray-700">Apt.</label>
					<span :id="`Address2-optional-${addressData.id}`" class="text-sm text-gray-400">Optional</span>
				</div>
				<div class="mt-1">
					<input
						:id="`Address2-${addressData.id}`"
						v-model="addressData.addressLine2"
						type="text"
						:name="`Address2`"
						class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						:aria-describedby="`Address2-optional${addressData.id}`"
					/>
				</div>
			</div>

			<div class="sm:col-span-2">
				<label :for="`City-${addressData.id}`" class="block text-sm font-medium text-gray-700">City</label>
				<div class="mt-1">
					<input
						:id="`City-${addressData.id}`"
						v-model="addressData.locality"
						type="text"
						:name="`City`"
						autocomplete="address-level2"
						class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required
					/>
				</div>
			</div>

			<div class="sm:col-span-2">
				<label :for="`Region-${addressData.id}`" class="block text-sm font-medium text-gray-700">State / Province</label>
				<div class="mt-1">
					<input
						:id="`Region-${addressData.id}`"
						v-model="addressData.administrativeArea"
						type="text"
						:name="`Region`"
						autocomplete="address-level1"
						class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						required
					/>
				</div>
			</div>

			<div class="sm:col-span-2">
				<label :for="`Country-${addressData.id}`" class="block text-sm font-medium text-gray-700">Country</label>
				<div class="mt-1">
					<select
						:id="`Country-${addressData.id}`"
						v-model="addressData.countryCode"
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
				<label :for="`ZipCode-${addressData.id}`" class="block text-sm font-medium text-gray-700">Postal code</label>
				<div class="mt-1">
					<input
						:id="`ZipCode-${addressData.id}`"
						v-model="addressData.postalCode"
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
					<label :for="`Phone-${addressData.id}`" class="block text-sm font-medium text-gray-700">Phone</label>
					<span :id="`Phone-optional-${addressData.id}`" class="text-sm text-gray-400">Optional</span>
				</div>
				<div class="mt-1">
					<input
						:id="`Phone-${addressData.id}`"
						v-model="addressData.phone"
						type="tel"
						:name="`Phone`"
						autocomplete="tel"
						class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						:aria-describedby="`Phone-optional${addressData.id}`"
					/>
				</div>
			</div>
		</div>

		<div class="flex flex-col space-y-3 pt-6 border-t border-gray-200 sm:flex-row-reverse sm:justify-between sm:items-center sm:space-y-0">
			<button
				type="submit"
				class="flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
				@click.prevent="saveAddress"
			>
				Save Address
			</button>
			<button
				type="button"
				class="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:inline-flex"
				@click="close"
			>
				Cancel
			</button>
		</div>

	</form>
</template>
