<script>
	import { mapMutations } from 'vuex';

	export default {
		name: "CheckoutStepEmail",
		methods: {
			...mapMutations('checkout', [
				'setModal'
			]),
			openLoginModal() {
				this.setModal({ context: 'login', payload: true });
			}
		}
	}
</script>

<template>
	<section aria-labelledby="contact-info-heading">

		<h2 id="contact-info-heading" class="text-xl font-medium text-gray-900 lg:text-2xl">Where should we send your receipt?</h2>
		<p class="text-sm text-gray-500">
			Already have an account?
			<a href="#" class="text-indigo-600" @click.prevent="openLoginModal">Log in.</a>
		</p>

		<div class="mt-6">
			<label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
			<div class="mt-1">
				<input
					id="email"
					type="email"
					name="email"
					autocomplete="email"
					class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					required
				>
			</div>
		</div>

		<div class="relative flex items-start mt-6">
			<div class="flex items-center h-5">
				<input
					id="newsletter"
					aria-describedby="newsletter-description"
					name="newsletter"
					type="checkbox"
					class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
				>
			</div>
			<div class="ml-3 text-sm">
				<label for="newsletter" class="font-medium text-gray-700">Signup for our newsletter</label>
				<span id="newsletter-description" class="text-gray-500">
        <span class="sr-only">Signup for our newsletter</span> so you always know what's happening.
      </span>
			</div>
		</div>

		<CheckoutModal context="login" title="Sign in to your account">
			<LoginForm />
		</CheckoutModal>
	</section>
</template>

