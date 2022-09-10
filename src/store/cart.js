/**
 * The main Vuex state for the cart.
 */
export const state = () => ({
  /**
   * Whether or not the app is loading.
   */
  loading: true,
  /**
   * The cart properties.
   */
  currentCart: {

  	email: '',

		shippingAddressId: null,

	  shippingMethodHandle: null,

	  availableShippingMethodOptions: {},

    /**
     * Applied coupon code (if any).
     */
    couponCode: null,
    /**
     * Subtotal of all items in the cart.
     */
    itemSubtotalAsCurrency: '$0.00',
    /**
     * Taxes.
     */
    totalTaxAsCurrency: '$0.00',
    /**
     * Discount, iff applicable.
     */
    totalDiscountAsCurrency: '$0.00',
    /**
     * Shipping cost for the order.
     */
    totalShippingCostAsCurrency: '$0.00',
    /**
     * Total for everything (subtotal + tax - discount + shipping).
     */
    totalAsCurrency: '$0.00',
    /**
     * Unique identifier for the cart in Craft.
     */
    number: null,
		/**
		 * Line items in the cart
		 */
		lineItems: [],
  },
  /**
   * Errors, if any.
   */
  cartErrors: [],
});

/**
 * Getters. These return properties of the state.
 */
export const getters = {
  /**
   * Get the current cart.
   *
   * NOTE: The `state` property is pulled in automatically.
   */
  getCurrentCart(state) {
    return state.currentCart;
  },

	/**
	 * Get all items in the cart.
	 *
	 * NOTE: The `state` property is pulled in automatically.
	 */
	getItems(state) {
		return state.currentCart.lineItems;
	},

	getEmail(state) {
		return state.currentCart.email;
	},

	getShippingAddressId(state) {
		return state.currentCart.shippingAddressId;
	},

	getShippingMethodHandle(state) {
		return state.currentCart.shippingMethodHandle;
	},

	getAvailableShippingMethodOptions(state) {
		return state.currentCart.availableShippingMethodOptions;
	},

  /**
   * Get the loading status.
   *
   * NOTE: The `state` property is pulled in automatically.
   */
  getLoading(state) {
    return state.loading;
  },

  /**
   * Get Cart errors.
   *
   * NOTE: The `state` property is pulled in automatically.
   */
  getCartErrors(state) {
    return state.cartErrors;
  },
};

/**
 * Mutations. These set/modify properties of the state.
 */
export const mutations = {
  /**
   * Set the current cart.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @property {object} payload - The cart object to set int he state.
   */
  setCurrentCart(state, payload) {
    state.currentCart = payload;
  },
  /**
   * Set the loading state.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @property {boolean} payload - Whether or not the app is loading.
   */
  setLoading(state, payload) {
    state.loading = payload;
  },

  /**
   * Set the cart error.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @property {object} payload - Array of errors to set in the cart.
   */
  setCartErrors(state, payload) {
    state.cartErrors = payload;
  },
};

/**
 * Actions. These run the mutations which set the properties of the state.
 */
export const actions = {
	/**
	 * Fetches the cart data from Craft/Commerce and places it into state.
	 *
	 * @property {function} commit   - Vuex commit method.
	 */
	async fetchCart({ commit }) {
		// Get the cart from commerce and set it into state
		const { cart } = await this.$api.getCart();
		commit('setCurrentCart', cart);
		commit('setLoading', false);
	},

  /**
   * Add a new item to the cart (to modify quantity, use setItemQty).
   *
   * @property {function} dispatch - Vuex dispatch method.
   * @property {function} commit   - Vuex commit method.
   * @property {object}   item     - The item object to add to the cart.
   */
  async addNewItem({ commit, dispatch }, item) {
    try {
        const { cart } = await this.$api.addItem({
          id: item.id,
          qty: item.qty,
        });
       const errorNotices = handleNotices({ commit, dispatch }, cart.notices);

       if (errorNotices.length < 1) {
         commit('setCurrentCart', cart);
       }
    } catch (error) {
      handleError(commit, error);
    }
  },
  /**
   * Remove an item entirely from the cart.
   *
   * @property {function} dispatch - Vuex dispatch method.
   * @property {function} commit   - Vuex commit method.
   * @property {object}   item     - The item object to remove from the cart.
   */
  async removeItem({ commit, dispatch }, item) {
    try {
       const { cart } = await this.$api.removeItem({ itemId: item.id });
       const errorNotices = handleNotices({ commit, dispatch }, cart.notices);

       if (errorNotices.length < 1) {
          commit('setCurrentCart', cart);
       }
    } catch (error) {
       handleError(commit, error);
    }
  },

  /**
   * Set the quantity of an item.
   *
   * @property {function} dispatch - Vuex dispatch method.
   * @property {function} commit   - Vuex commit method.
   * @property {object}   item     - The item object to set the quantity for.
   */
  async setItemQty({ dispatch, commit }, item) {
  	console.log(item.id)
    try {
      const { cart } = await this.$api.updateQty({
        itemId: Number(item.id),
        qty: Number(item.qty),
      });
      const errorNotices = handleNotices({ commit, dispatch }, cart.notices);

      if (errorNotices.length < 1) {
        if (item.qty === 0) {
          return dispatch('removeItem', item);
        }
        commit('setCurrentCart', cart);
        return true;
      }
    } catch (error) {
      handleError(commit, error);
      return false;
    }
  },

	/**
	 * Saves the email address
	 *
	 * @property {function} dispatch - Vuex dispatch method.
	 * @property {function} commit   - Vuex commit method.
	 * @property {string}  email  - An email address string
	 */
	async saveEmail({ commit, dispatch }, email) {
		try {
			const { cart } = await this.$api.postAction('/fc/cart/update-cart', { email });
			const errorNotices = handleNotices({ commit, dispatch }, cart.notices);

			if (errorNotices.length < 1) {
				commit('setCurrentCart', cart);
			}
		} catch (error) {
			handleError(commit, error);
		}
	},

	async saveShippingMethod({ commit, dispatch }, shippingMethodHandle) {
		try {
			const { cart } = await this.$api.postAction('/fc/cart/update-cart', { shippingMethodHandle });
			const errorNotices = handleNotices({ commit, dispatch }, cart.notices);

			if (errorNotices.length < 1) {
				commit('setCurrentCart', cart);
			}
		} catch (error) {
			handleError(commit, error);
		}
	},

  /**
   * Apply coupon.
   *
   * @property {function} dispatch - Vuex dispatch method.
   * @property {function} commit   - Vuex commit method.
   * @property {object}   item     - The object that contains the coupon code property.
   */
  async applyCoupon({ dispatch, commit }, item) {
    try {
      const { cart } = await this.$api.applyCoupon({ couponCode: item.couponCode });
      const errorNotices = handleNotices({ commit, dispatch }, cart.notices);

      if (errorNotices.length < 1) {
        commit('setCurrentCart', cart);
        return true;
      }
    } catch (error) {
      handleError(commit, error);
      return false;
    }
  },
	/**
	 * Used to display notices manually
	 * @param commit
	 * @param dispatch
	 * @param notice
	 */
	displayNotice({ commit, dispatch }, notice) {
  	handleNotices({ commit, dispatch }, [{ message: notice }]);
	},

  /**
   * Clear Cart notices.
   *
   * @property {function} commit - Vuex commit method.
   */
  async clearNotices({ commit }) {
    const { cart } = await this.$api.clearNotices();
    commit('setCurrentCart', cart);
  },
};

/**
 * Sets cart notices and errors.
 *
 * @property {function} dispatch - Vuex dispatch method.
 * @property {function} commit   - Vuex commit method.
 * @property {object}   notices  - Array of notices for the cart.
 */
const handleNotices = ({ commit, dispatch }, notices) => {
  let errors = [];

  notices.forEach(notice => {
    errors = [...errors, notice.message];
  });

  commit('setCartErrors', errors);

  // Remove the errors after 6 seconds.
  setTimeout(() => {
    dispatch('clearNotices');
    commit('setCartErrors', []);
  }, 6000);

  return errors;
};

/**
 * Handles errors that come back from the API.
 *
 * @property {function} commit - Vuex commit method.
 * @property {object}   error  - The error object from the server.
 */
const handleError = (commit, error) => {
  let errors = [];

  if (error.response.status === 400) {
    const cartErrors = Object.values(error.response.data.errors);

    cartErrors.forEach(parentErrors => {
      parentErrors.forEach(error => {
        errors = [...errors, error];
      });
    });

    commit('setCartErrors', errors);

    // Remove the errors after 6 seconds.
    setTimeout(() => {
      commit('setCartErrors', []);
    }, 6000);
  } else {
    commit('setCartErrors', [
      "Your request could not be completed at the moment. Please try again.",
    ]);

    // Remove the errors after 6 seconds.
    setTimeout(() => {
      commit('setCartErrors', []);
    }, 6000);
  }

  return {
    success: false,
    error,
  };
};
