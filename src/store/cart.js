import Addresses from '@/queries/Addresses.gql';

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
    /**
     * The customer's email.
     */
    email: '',
    /**
     * The ID of the shipping address.
     */
    shippingAddressId: null,
    /**
     * The ID of the source shipping address.
     */
    sourceShippingAddressId: null,
    /**
     * The handle for the currently selected shipping method.
     */
    shippingMethodHandle: null,
    /**
     * All available shipping methods.
     */
    availableShippingMethodOptions: {},
    /**
     * Whether billing and shipping addresses are the same.
     */
    billingSameAsShipping: true,
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
     * Line items in the cart.
     */
    lineItems: [],
  },
  /**
   * Addresses for the user.
   */
  addresses: [],
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
   * Get the current cart for the user.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {object} - The current cart.
   */
  getCurrentCart(state) {
    return state.currentCart;
  },
  /**
   * Get the shipping address for the user.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {object|null} - The customer's shipping address or null if there isn't one.
   */
  getShippingAddress(state) {
    const shippingAddresses = state.addresses.filter((address) => {
      return address.title === 'Shipping Address';
    });

    return shippingAddresses.length ? shippingAddresses[0] : null;
  },
  /**
   * Get the billing address for the user.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {object|null} - The customer's billing address or null if there isn't one.
   */
  getBillingAddress(state) {
    const billingAddresses = state.addresses.filter((address) => {
      return address.title === 'Billing Address';
    });

    return billingAddresses.length ? billingAddresses[0] : null;
  },
  /**
   * Get all items in the cart.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {Array} - The line items in the cart.
   */
  getItems(state) {
    return state.currentCart.lineItems;
  },
  /**
   * Get the email address for the user.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {string} - The customer's email.
   */
  getEmail(state) {
    return state.currentCart.email;
  },
  /**
   * Get the shipping address ID.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {number} - The customer's shipping address ID.
   */
  getShippingAddressId(state) {
    return state.currentCart.shippingAddressId;
  },
  /**
   * Get the source shipping address ID.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {number} - The source shipping address ID.
   */
  getSourceShippingAddressId(state) {
    return state.currentCart.sourceShippingAddressId;
  },
  /**
   * Get the shipping method handle.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {string} - The handle for the currently selected shipping method.
   */
  getShippingMethodHandle(state) {
    return state.currentCart.shippingMethodHandle;
  },
  /**
   * Get the available shipping methods.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {array} - List of available shipping methods.
   */
  getAvailableShippingMethodOptions(state) {
    return state.currentCart.availableShippingMethodOptions;
  },
  /**
   * Get the billing address ID.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {number} - The customer's billing address ID.
   */
  getBillingAddressId(state) {
    return state.currentCart.billingAddressId;
  },
  /**
   * Get the source billing address ID.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {number} - The source billing address ID.
   */
  getSourceBillingAddressId(state) {
    return state.currentCart.sourceBillingAddressId;
  },
  /**
   * Get whether the shipping and billing addresses are the same.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {boolean} - Whether the shipping and billing addresses are the same.
   */
  getBillingSameAsShipping(state) {
    return state.currentCart.billingSameAsShipping;
  },
  /**
   * Get the loading status.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {boolean} - Whether the app is loading or not.
   */
  getLoading(state) {
    return state.loading;
  },
  /**
   * Get Cart errors.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @returns {array} - List of cart validation errors.
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
   *
   * @returns {void}
   */
  setCurrentCart(state, payload) {
    state.currentCart = payload;
  },
  /**
   * Set the addresses for the user.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @property {object} payload - The addresses to save.
   *
   * @returns {void}
   */
  setAddresses(state, payload) {
    state.addresses = payload;
  },
  /**
   * Set the loading state.
   *
   * NOTE: The `state` property is pulled in automatically.
   *
   * @property {boolean} payload - Whether or not the app is loading.
   *
   * @returns {void}
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
   *
   * @returns {void}
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
   * @property {function} commit - Vuex commit method.
   *
   * @returns {void}
   */
  async fetchCart({ commit, dispatch }) {
    // Get the cart from commerce and set it into state
    const { cart } = await this.$api.getCart();
    commit('setCurrentCart', cart);
    await dispatch('fetchAddresses', cart.id);
    commit('setLoading', false);
  },
  /**
   * Fetches the user's addresses from Craft/Commerce and places it into state.
   *
   * @property {function} commit - Vuex commit method.
   * @property Number cartId     - The cart ID.
   *
   * @returns {void}
   */
  async fetchAddresses({ commit }, cartId) {
    const { data } = await this.$api.graphqlQuery(
      Addresses,
      {
        ownerId: cartId,
      },
    );
    commit('setAddresses', data.addresses);
  },
  /**
   * Add a new item to the cart (to modify quantity, use setItemQty).
   *
   * @property {function} commit   - Vuex commit method.
   * @property {function} dispatch - Vuex dispatch method.
   * @property {object}   item     - The item object to add to the cart.
   *
   * @returns {void}
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
   * @property {function} commit   - Vuex commit method.
   * @property {function} dispatch - Vuex dispatch method.
   * @property {object}   item     - The item object to remove from the cart.
   *
   * @returns {void}
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
   *
   * @returns {void}
   */
  async setItemQty({ dispatch, commit }, item) {
    console.log(item.id);
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
   * Saves the email address.
   *
   * @property {function} commit   - Vuex commit method.
   * @property {function} dispatch - Vuex dispatch method.
   * @property {string}   email    - An email address string.
   *
   * @returns {void}
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
  /**
   * Saves the shipping address.
   *
   * @property {function} commit          - Vuex commit method.
   * @property {function} dispatch        - Vuex dispatch method.
   * @property {object}   shippingAddress - A shipping address object.
   *
   * @returns {void}
   */
  async saveShippingAddress({ commit, dispatch }, shippingAddress) {
    const params = {
      shippingAddressId: shippingAddress.id,
      shippingAddress,
    };
    try {
      const { cart } = await this.$api.postAction('/fc/cart/update-cart', params);
      const errorNotices = handleNotices({ commit, dispatch }, cart.notices);

      if (errorNotices.length < 1) {
        commit('setCurrentCart', cart);
        await dispatch('fetchAddresses', cart.id);
      }
    } catch (error) {
      handleError(commit, error);
    }
  },
  /**
   * Saves the selected shipping method.
   *
   * @property {function} commit               - Vuex commit method.
   * @property {function} dispatch             - Vuex dispatch method.
   * @property {string}   shippingMethodHandle - The handle for the selected shipping method.
   *
   * @returns {void}
   */
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
   *
   * @returns {boolean} - Whether the coupon was successfully applied or not.
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
   * Used to display notices manually.
   * @param commit
   * @param dispatch
   * @param notice
   *
   * @returns {void}
   */
  displayNotice({ commit, dispatch }, notice) {
    handleNotices({ commit, dispatch }, [{ message: notice }]);
  },
  /**
   * Clear Cart notices.
   *
   * @property {function} commit - Vuex commit method.
   *
   * @returns {void}
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
 *
 * @returns {Array} - List of validation errors int he cart.
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
 *
 * @returns {object|void}
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
      'Your request could not be completed at the moment. Please try again.',
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
