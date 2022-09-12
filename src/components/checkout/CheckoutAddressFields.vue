<script>
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
				addressData: this.address
			};
		},
		computed: {
			contextName() {
				return this.context.charAt(0).toUpperCase() + this.context.slice(1);
			},
			style() {
				return 'mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'
			}
		},
		methods: {
			changedAddress(e) {
				this.$emit('changedAddress', e);
			}
		}
	}
</script>

<template>
	<div :class="style">
		<div class="sm:col-span-3">
			<label :for="`${contextName}FirstName-${addressData.id}`" class="block text-sm font-medium text-gray-700">First Name</label>
			<div class="mt-1">
				<input
					:id="`${contextName}FirstName-${addressData.id}`"
					v-model="addressData.firstName"
					:name="`${contextName}FirstName`"
					type="text"
					autocomplete="given-name"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					@change="changedAddress"
				/>
			</div>
		</div>

		<div class="sm:col-span-3">
			<label :for="`${contextName}LastName-${addressData.id}`" class="block text-sm font-medium text-gray-700">Last Name</label>
			<div class="mt-1">
				<input
					:id="`${contextName}LastName-${addressData.id}`"
					v-model="addressData.lastName"
					:name="`${contextName}LastName`"
					type="text"
					autocomplete="family-name"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					@change="changedAddress"
				/>
			</div>
		</div>

		<div class="sm:col-span-6">
			<div class="flex justify-between">
				<label :for="`${contextName}Company-${addressData.id}`" class="block text-sm font-medium text-gray-700">Company</label>
				<span :id="`${contextName}Company-optional-${addressData.id}`" class="text-sm text-gray-400">Optional</span>
			</div>
			<div class="mt-1">
				<input
					:id="`${contextName}Company-${addressData.id}`"
					v-model="addressData.organization"
					:name="`${contextName}Company`"
					:aria-describedby="`${contextName}Company-optional-${addressData.id}`"
					type="text"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					@change="changedAddress"
				/>
			</div>
		</div>

		<div class="sm:col-span-4">
			<label :for="`${contextName}Address1-${addressData.id}`" class="block text-sm font-medium text-gray-700">Street Address</label>
			<div class="mt-1">
				<input
					:id="`${contextName}Address1-${addressData.id}`"
					v-model="addressData.addressLine1"
					:name="`${contextName}Address1`"
					type="text"
					autocomplete="street-address"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					@change="changedAddress"
				/>
			</div>
		</div>

		<div class="sm:col-span-2">
			<div class="flex justify-between">
				<label :for="`${contextName}Address2-${addressData.id}`" class="block text-sm font-medium text-gray-700">Apt.</label>
				<span :id="`${contextName}Address2-optional-${addressData.id}`" class="text-sm text-gray-400">Optional</span>
			</div>
			<div class="mt-1">
				<input
					:id="`${contextName}Address2-${addressData.id}`"
					v-model="addressData.addressLine2"
					type="text"
					:name="`${contextName}Address2`"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					:aria-describedby="`${contextName}Address2-optional${addressData.id}`"
					@change="changedAddress"
				/>
			</div>
		</div>

		<div class="sm:col-span-2">
			<label :for="`${contextName}City-${addressData.id}`" class="block text-sm font-medium text-gray-700">City</label>
			<div class="mt-1">
				<input
					:id="`${contextName}City-${addressData.id}`"
					v-model="addressData.locality"
					type="text"
					:name="`${contextName}City`"
					autocomplete="address-level2"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					@change="changedAddress"
				/>
			</div>
		</div>

		<div class="sm:col-span-2">
			<label :for="`${contextName}Region-${addressData.id}`" class="block text-sm font-medium text-gray-700">State / Province</label>
			<div class="mt-1">
				<input
					:id="`${contextName}Region-${addressData.id}`"
					v-model="addressData.administrativeArea"
					type="text"
					:name="`${contextName}Region`"
					autocomplete="address-level1"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					@change="changedAddress"
				/>
			</div>
		</div>

		<div class="sm:col-span-2">
			<label :for="`${contextName}Country-${addressData.id}`" class="block text-sm font-medium text-gray-700">Country</label>
			<div class="mt-1">
				<select
					:id="`${contextName}Country-${addressData.id}`"
					v-model="addressData.countryCode"
					:name="`${contextName}Country`"
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
			<label :for="`${contextName}ZipCode-${addressData.id}`" class="block text-sm font-medium text-gray-700">Postal code</label>
			<div class="mt-1">
				<input
					:id="`${contextName}ZipCode-${addressData.id}`"
					v-model="addressData.postalCode"
					type="text"
					:name="`${contextName}ZipCode`"
					autocomplete="postal-code"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
					@change="changedAddress"
				/>
			</div>
		</div>

		<div class="sm:col-span-3">
			<div class="flex justify-between">
				<label :for="`${contextName}Phone-${addressData.id}`" class="block text-sm font-medium text-gray-700">Phone</label>
				<span :id="`${contextName}Phone-optional-${addressData.id}`" class="text-sm text-gray-400">Optional</span>
			</div>
			<div class="mt-1">
				<input
					:id="`${contextName}Phone-${addressData.id}`"
					v-model="addressData.phone"
					type="tel"
					:name="`${contextName}Phone`"
					autocomplete="tel"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					:aria-describedby="`${contextName}Phone-optional${addressData.id}`"
				/>
			</div>
		</div>
	</div>
</template>
