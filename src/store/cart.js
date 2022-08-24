export const state = () => ({
  items: [],
  loading: true,
  currentCart: {
    couponCode: null,
    itemSubtotalAsCurrency: '$0.00',
    totalTaxAsCurrency: '$0.00',
    totalDiscountAsCurrency: '$0.00',
    totalShippingCostAsCurrency: '$0.00',
    totalAsCurrency: '$0.00',
    number: null,
  },
 
});

export const getters = {
  /**
   * Get all items in the cart
   */
  getItems(state) {
    return state.items;
  },  
  /**
   * Get the current cart id
   */
  getCartId(state) {
    return state.cartId;
  },
  /**
   * Get the current cart
   */
  getCurrentCart(state) {
    return state.currentCart;
  },

  /**
   * Get the current cart
   */
  getloading(state) {
    return state.loading;
  },
};

export const mutations = {
  /**
   * Set the entire items array. Probably only useful for emptying an entire cart
   */
  setItems(state, payload) {
    state.items = payload || [];
  },
  /**
   * Add a new item to the cart (to modify quantity, use setItemQty)
   */
  addNewItem(state, payload) {
    const availableItemIndex = state.items.findIndex(item => String(item.id) === String(payload.id));

    if (availableItemIndex === -1) {
      state.items = [...state.items, payload];
    } else {
      state.items[availableItemIndex].qty = state.items[availableItemIndex].qty + 1
    }

    localStorage.setItem(state.currentCart.number, JSON.stringify(state.items));
  },
  /**
   * Remove an item entirely from the cart
   */
  removeItem(state, payload) {
    state.items.splice(payload, 1);
    localStorage.setItem(state.currentCart.number, JSON.stringify(state.items));
  },
  /**
   * Set the quantity of an item
   */
  setItemQty(state, payload) {
    const cartItems = state.items;

    if (parseInt(payload.qty) !== 0) {
      const availableItemIndex = cartItems.findIndex(item => String(item.id) === String(payload.id));
      cartItems[availableItemIndex] = payload;
      state.items = [...cartItems];
    } else {
      state.items = cartItems.filter(item => String(item.id) !== String(payload.id));
    }

    localStorage.setItem(state.currentCart.number, JSON.stringify(state.items));
  },
  /**
   * Set the current cart id
   */
  setCartId(state, payload) {
    state.cartId = payload;
  },
  /**
   * Set the current cart
   */
  setCurrentCart(state, payload) {
    state.currentCart = payload;
  },
  /**
   * Set the loading state
   */
  setLoading(state, payload) {
    state.loading = payload;
  },
};

export const actions = {
  /**
   * Set the entire items array. Probably only useful for emptying an entire cart
   */
  setItems({ commit }, items) {
    commit('setItems', items);
  },
  /**
   * Add a new item to the cart (to modify quantity, use setItemQty)
   */
  async addNewItem({ commit }, item) {
    const { cart } = await this.$api.post('commerce/cart/update-cart', {
      purchasableId: item.id,
      qty: item.qty
    });
    const newItem = cart.lineItems.find(cartItem => String(cartItem.purchasableId) === String(item.id));

    commit('addNewItem', {...item, itemId: newItem.id});
    commit('setCurrentCart', cart);
  },
  /**
   * Remove an item entirely from the cart
   */
  async removeItem({ commit }, item) {
    const { cart } = await this.$api.post('commerce/cart/update-cart', {
      lineItems: {[item.itemId]: {'remove': true}},
    });

    commit('removeItem', item);
    commit('setCurrentCart', cart);
  },
  /**
   * Set the quantity of an item
   */
  async setItemQty({dispatch, commit }, item) {
    const { cart } = await this.$api.post('commerce/cart/update-cart', {
      purchasableId: item.id,
      qty: item.qty
    });

    if (item.qty === 0) {
      return dispatch('removeItem', item)
    }

    commit('setItemQty', item);
    commit('setCurrentCart', cart);
  },

  /**
   * set the cart id
   */
  setCartId({ commit }, payload) {
    commit('setCartId', payload);
  },
  /**
   * set the current cart
   */
  setCurrentCart({ commit }, payload) {
    commit('setCurrentCart', payload);
  },

  /**
   * set the current cart
   */
  setLoading({ commit }, payload) {
    commit('setLoading', payload);
  },
}

