<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'TheHeader',
		data() {
			return {
				menuOpen : false
			}
		},
		computed:{
			...mapGetters({
				cartItems: 'cart/getItems',
			}),
		},
		methods: {
			toggleMenu() {
				this.menuOpen = !this.menuOpen;
			}
		}
	}
</script>

<template>
  <div>
    <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">

      <!-- Mobile Menu Overlay -->
      <transition name="fade">
        <div v-show="menuOpen" class="fixed inset-0 bg-black bg-opacity-25"></div>
      </transition>

      <!-- Mobile Fly Out Menu -->
      <transition>
        <div v-show="menuOpen" class="fixed inset-0 flex z-40">
          <div class="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
            <!-- Mobile Menu Close button -->
            <div class="px-4 pt-5 pb-2 flex">
              <button type="button" class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400" @click="toggleMenu">
                <span class="sr-only">Close menu</span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <!-- Mobile Menu Links -->
            <div class="border-t border-gray-200 py-6 px-4 space-y-6">
							<div class="flow-root">
								<nuxt-link to="/women" class="-m-2 p-2 block font-medium text-gray-900">Women</nuxt-link>
							</div>
							<div class="flow-root">
								<nuxt-link to="/men" class="-m-2 p-2 block font-medium text-gray-900">Men</nuxt-link>
							</div>
              <div class="flow-root">
								<nuxt-link to="/about" class="-m-2 p-2 block font-medium text-gray-900">About</nuxt-link>
              </div>
              <div class="flow-root">
								<nuxt-link to="/about/stores" class="-m-2 p-2 block font-medium text-gray-900">Stores</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Main Site Header -->
    <header class="relative bg-white">
      <nav aria-label="Top" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="h-16 flex items-center justify-between">
            <div class="flex-1 flex items-center lg:hidden">
              <!-- Mobile Menu Open button -->
              <button type="button" class="-ml-2 bg-white p-2 rounded-md text-gray-400" @click="toggleMenu">
                <span class="sr-only">Open menu</span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <!-- Non-mobile only links -->
            <div class="hidden lg:flex-1 lg:block lg:self-stretch">
              <div class="h-full flex space-x-8">
								<nuxt-link to="/women" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Women</nuxt-link>
								<nuxt-link to="/men" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Men</nuxt-link>
								<nuxt-link to="/about" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">About</nuxt-link>
								<nuxt-link to="/about/stores" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Stores</nuxt-link>
              </div>
            </div>

            <!-- Logo -->
            <nuxt-link to="/" class="flex">
              <span class="sr-only">Foster Clothing</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="">
            </nuxt-link>

            <!-- Auxiliary Links -->
            <div class="flex-1 flex items-center justify-end">
              <!-- Account Link -->
              <a href="#" class="p-2 text-gray-400 hover:text-gray-500 lg:ml-4">
                <span class="sr-only">Account</span>
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>

              <!-- Cart Link -->
              <div class="ml-4 flow-root lg:ml-6">
                <nuxt-link to="/cart" class="group -m-2 p-2 flex items-center">
                  <svg class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{cartItems.length}}</span>
                  <span class="sr-only">items in cart, view bag</span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<style lang="postcss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
