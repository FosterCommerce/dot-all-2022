<script>
	export default {
		name: "CheckoutAddressFields",
		props: {
			context: {
				type: String,
				required: false,
				default: 'shipping'
			},
			addressObj: {
				type: Object,
				required: false,
				default: () => ({
					id: 0,
					firstName: '',
					lastName: '',
					company: '',
					address1: '',
					address2: '',
					city: '',
					region: '',
					country: '',
					zipCode: '',
					phone: ''
				})
			}
		},
		data() {
			return {
				address: this.addressObj
			};
		},
		computed: {
			contextName() {
				return this.context.charAt(0).toUpperCase() + this.context.slice(1);
			},
			style() {
				return 'mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'
			}
		}
	}
</script>

<template>
	<div :class="style">
		<div class="sm:col-span-3">
			<label :for="`${contextName}FirstName${address.id}`" class="block text-sm font-medium text-gray-700">First Name</label>
			<div class="mt-1">
				<input
					:id="`${contextName}FirstName${address.id}`"
					type="text"
					:name="`${contextName}FirstName`"
					autocomplete="given-name"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
				/>
			</div>
		</div>

		<div class="sm:col-span-3">
			<label :for="`${contextName}LastName${address.id}`" class="block text-sm font-medium text-gray-700">Last Name</label>
			<div class="mt-1">
				<input
					:id="`${contextName}LastName${address.id}`"
					type="text"
					:name="`${contextName}LastName`"
					autocomplete="family-name"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
				/>
			</div>
		</div>

		<div class="sm:col-span-6">
			<div class="flex justify-between">
				<label :for="`${contextName}Company${address.id}`" class="block text-sm font-medium text-gray-700">Company</label>
				<span :id="`${contextName}Company-optional${address.id}`" class="text-sm text-gray-400">Optional</span>
			</div>
			<div class="mt-1">
				<input
					:id="`${contextName}Company${address.id}`"
					type="text"
					:name="`${contextName}Company`"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					:aria-describedby="`${contextName}Company-optional${address.id}`"
				/>
			</div>
		</div>

		<div class="sm:col-span-4">
			<label :for="`${contextName}Address1${address.id}`" class="block text-sm font-medium text-gray-700">Street Address</label>
			<div class="mt-1">
				<input
					:id="`${contextName}Address1${address.id}`"
					type="text"
					:name="`${contextName}Address1`"
					autocomplete="street-address"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
				/>
			</div>
		</div>

		<div class="sm:col-span-2">
			<div class="flex justify-between">
				<label :for="`${contextName}Address2${address.id}`" class="block text-sm font-medium text-gray-700">Apt.</label>
				<span :id="`${contextName}Address2-optional${address.id}`" class="text-sm text-gray-400">Optional</span>
			</div>
			<div class="mt-1">
				<input
					:id="`${contextName}Address2${address.id}`"
					type="text"
					:name="`${contextName}Address2`"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					:aria-describedby="`${contextName}Address2-optional${address.id}`"
				/>
			</div>
		</div>

		<div class="sm:col-span-2">
			<label :for="`${contextName}City${address.id}`" class="block text-sm font-medium text-gray-700">City</label>
			<div class="mt-1">
				<input
					:id="`${contextName}City${address.id}`"
					type="text"
					:name="`${contextName}City`"
					autocomplete="address-level2"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
				/>
			</div>
		</div>

		<div class="sm:col-span-2">
			<label :for="`${contextName}Region${address.id}`" class="block text-sm font-medium text-gray-700">State / Province</label>
			<div class="mt-1">
				<input
					:id="`${contextName}Region${address.id}`"
					type="text"
					:name="`${contextName}Region`"
					autocomplete="address-level1"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
				/>
			</div>
		</div>

		<div class="sm:col-span-2">
			<label :for="`${contextName}Country${address.id}`" class="block text-sm font-medium text-gray-700">Country</label>
			<div class="mt-1">
				<select
					:id="`${contextName}Country${address.id}`"
					:name="`${contextName}Country`"
					autocomplete="country-name"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
				>
					<option value="US" selected>United States</option>
					<option value="CA">Canada</option>
					<option value="MX">Mexico</option>
				</select>
			</div>
		</div>

		<div class="sm:col-span-3">
			<label :for="`${contextName}ZipCode${address.id}`" class="block text-sm font-medium text-gray-700">Postal code</label>
			<div class="mt-1">
				<input
					:id="`${contextName}ZipCode${address.id}`"
					type="text"
					:name="`${contextName}ZipCode`"
					autocomplete="postal-code"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
				/>
			</div>
		</div>

		<div class="sm:col-span-3">
			<div class="flex justify-between">
				<label :for="`${contextName}Phone${address.id}`" class="block text-sm font-medium text-gray-700">Phone</label>
				<span :id="`${contextName}Phone-optional${address.id}`" class="text-sm text-gray-400">Optional</span>
			</div>
			<div class="mt-1">
				<input
					:id="`${contextName}Phone${address.id}`"
					type="tel"
					:name="`${contextName}Phone`"
					autocomplete="tel"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					:aria-describedby="`${contextName}Phone-optional${address.id}`"
				/>
			</div>
		</div>
	</div>
</template>
