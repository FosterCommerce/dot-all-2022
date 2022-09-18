<script>
	import { mapGetters } from "vuex";

	export default {
		name: "CheckoutAddressFields",
		props: {
			context: {
				type: String,
				required: false,
				default: 'shipping'
			},
			address: {
				type: Object,
				required: false,
				default: () => ({
					id: 0,
					title: '',
					firstName: '',
					lastName: '',
					fullName: '',
					organization: '',
					addressLine1: '',
					addressLine2: '',
					locality: '',
					administrativeArea: '',
					countryCode: '',
					postalCode: '',
					phone: ''
				})
			},
			useFullName: {
				type: Boolean
			}
		},
		computed: {
			...mapGetters('checkout', [
				'getCountries',
				'getRegions'
			]),
			/** Gets the countries regions based on the country code */
			countryRegions() {
				let regions = null;
				if (this.address.countryCode && this.address.countryCode in this.getRegions) {
					regions = this.getRegions[this.address.countryCode];
				}
				return !Array.isArray(regions) ? regions : null;
			},
			contextName() {
				return this.context.charAt(0).toUpperCase() + this.context.slice(1);
			},
		},
		methods: {
			update(key, value) {
				this.$emit('input', { ...this.address, [key]: value });
			}
		}
	}
</script>

<template>
	<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
		<div v-if="useFullName" class="sm:col-span-6">
			<label :for="`${contextName}FullName-${address.id}`" class="block text-sm font-medium text-gray-700">Your Full Name</label>
			<div class="mt-1">
				<input
					:id="`${contextName}FullName-${address.id}`"
					:name="`${contextName}FullName`"
					type="text"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					:value="address.fullName"
					@input="update('fullName', $event.target.value)"
				/>
			</div>
		</div>

		<div v-if="!useFullName" class="sm:col-span-3">
			<label :for="`${contextName}FirstName-${address.id}`" class="block text-sm font-medium text-gray-700">First Name</label>
			<div class="mt-1">
				<input
					:id="`${contextName}FirstName-${address.id}`"
					:name="`${contextName}FirstName`"
					type="text"
					autocomplete="given-name"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					:value="address.firstName"
					@input="update('firstName', $event.target.value)"
				/>
			</div>
		</div>

		<div v-if="!useFullName" class="sm:col-span-3">
			<label :for="`${contextName}LastName-${address.id}`" class="block text-sm font-medium text-gray-700">Last Name</label>
			<div class="mt-1">
				<input
					:id="`${contextName}LastName-${address.id}`"
					:name="`${contextName}LastName`"
					type="text"
					autocomplete="family-name"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					:value="address.lastName"
					@input="update('lastName', $event.target.value)"
				/>
			</div>
		</div>

		<div class="sm:col-span-6">
			<div class="flex justify-between">
				<label :for="`${contextName}Organization-${address.id}`" class="block text-sm font-medium text-gray-700">Company</label>
				<span :id="`${contextName}Organization-optional-${address.id}`" class="text-sm text-gray-400">Optional</span>
			</div>
			<div class="mt-1">
				<input
					:id="`${contextName}Organization-${address.id}`"
					:name="`${contextName}Organization`"
					:aria-describedby="`${contextName}Organization-optional-${address.id}`"
					type="text"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					:value="address.organization"
					@input="update('organization', $event.target.value)"
				/>
			</div>
		</div>

		<div class="sm:col-span-4">
			<label :for="`${contextName}AddressLine1-${address.id}`" class="block text-sm font-medium text-gray-700">Street Address</label>
			<div class="mt-1">
				<input
					:id="`${contextName}AddressLine1-${address.id}`"
					:name="`${contextName}AddressLine1`"
					type="text"
					autocomplete="street-address"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					:value="address.addressLine1"
					@input="update('addressLine1', $event.target.value)"
				/>
			</div>
		</div>

		<div class="sm:col-span-2">
			<div class="flex justify-between">
				<label :for="`${contextName}AddressLine2-${address.id}`" class="block text-sm font-medium text-gray-700">Apt.</label>
				<span :id="`${contextName}AddressLine2-optional-${address.id}`" class="text-sm text-gray-400">Optional</span>
			</div>
			<div class="mt-1">
				<input
					:id="`${contextName}AddressLine2-${address.id}`"
					type="text"
					:name="`${contextName}AddressLine2`"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					:aria-describedby="`${contextName}AddressLine2-optional${address.id}`"
					:value="address.addressLine2"
					@input="update('addressLine2', $event.target.value)"
				/>
			</div>
		</div>

		<div class="sm:col-span-2">
			<label :for="`${contextName}Locality-${address.id}`" class="block text-sm font-medium text-gray-700">City</label>
			<div class="mt-1">
				<input
					:id="`${contextName}Locality-${address.id}`"
					type="text"
					:name="`${contextName}Locality`"
					autocomplete="address-level2"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					:value="address.locality"
					@input="update('locality', $event.target.value)"
				/>
			</div>
		</div>

		<div class="sm:col-span-2">
			<label :for="`${contextName}AdministrativeArea-${address.id}`" class="block text-sm font-medium text-gray-700">State / Province</label>
			<div class="mt-1">
				<select
					v-if="countryRegions"
					:id="`${contextName}AdministrativeArea-${address.id}`"
					:name="`${contextName}AdministrativeArea`"
					autocomplete="address-level1"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					:value="address.administrativeArea"
					@change="update('administrativeArea', $event.target.value)"
				>
					<option v-for="(name, value) in countryRegions" :key="value" :value="value">{{ name }}</option>
				</select>
				<input
					v-else
					:id="`${contextName}AdministrativeArea-${address.id}`"
					type="text"
					:name="`${contextName}AdministrativeArea`"
					autocomplete="address-level1"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					:value="address.administrativeArea"
					@input="update('administrativeArea', $event.target.value)"
				/>
			</div>
		</div>

		<div class="sm:col-span-2">
			<label :for="`${contextName}CountryCode-${address.id}`" class="block text-sm font-medium text-gray-700">Country</label>
			<div class="mt-1">
				<select
					:id="`${contextName}CountryCode-${address.id}`"
					:name="`${contextName}CountryCode`"
					autocomplete="country-name"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					:value="address.countryCode"
					@change="update('countryCode', $event.target.value)"
				>
					<option v-for="(name, value) in getCountries" :key="value" :value="value">{{ name }}</option>
				</select>
			</div>
		</div>

		<div class="sm:col-span-3">
			<label :for="`${contextName}PostalCode-${address.id}`" class="block text-sm font-medium text-gray-700">Postal code</label>
			<div class="mt-1">
				<input
					:id="`${contextName}PostalCode-${address.id}`"
					type="text"
					:name="`${contextName}PostalCode`"
					autocomplete="postal-code"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					:value="address.postalCode"
					@input="update('postalCode', $event.target.value)"
				/>
			</div>
		</div>

		<div class="sm:col-span-3">
			<div class="flex justify-between">
				<label :for="`${contextName}Phone-${address.id}`" class="block text-sm font-medium text-gray-700">Phone</label>
				<span :id="`${contextName}Phone-optional-${address.id}`" class="text-sm text-gray-400">Optional</span>
			</div>
			<div class="mt-1">
				<input
					:id="`${contextName}Phone-${address.id}`"
					type="tel"
					:name="`${contextName}Phone`"
					autocomplete="tel"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					:aria-describedby="`${contextName}Phone-optional${address.id}`"
					:value="address.phone"
					@input="update('phone', $event.target.value)"
				/>
			</div>
		</div>
	</div>
</template>
