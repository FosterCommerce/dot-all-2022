export const state = () => ({
  items: [],
  cartId: null,
  subTotal: 0,
  shipping: 0,
  taxes: 0,
  discount: 0,
  total: 0,
});

export const getters = {
  /**
   * Get all items in the cart
   */
  getItems(state) {
    return state.items;
  },
  /**
   * Get the subtotal of all items in the cart
   */
  getSubtotal(state) {
    return state.subTotal;
  },
  /**
   * Get the shipping cost
   */
  getShipping(state) {
    return state.shipping;
  },
  /**
   * Get any applicable taxes
   */
  getTaxes(state) {
    return state.taxes;
  },
  /**
   * Get the discount if there is one
   */
  getDiscount(state) {
    return state.discount;
  },
  /**
   * Get the total for everything
   */
  getTotal(state) {
    return state.total;
  },
  /**
   * Get the current cart id
   */
  getCartId(state) {
    return state.cartId;
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
    localStorage.setItem(state.cartId, JSON.stringify(state.items));
  },
  /**
   * Remove an item entirely from the cart
   */
  removeItem(state, payload) {
    state.items.splice(payload, 1);
    localStorage.setItem(state.cartId, JSON.stringify(state.items));
  },
  /**
   * Set the quantity of an item
   */
  setItemQty(state, payload) {
    const cartItems = state.items
    if (parseInt(payload.qty) !== 0) {
      const availableItemIndex = cartItems.findIndex(item => String(item.id) === String(payload.id));
      cartItems[availableItemIndex] = payload;
      state.items = [...cartItems]
    } else {
      const filteredCart = cartItems.filter(item => String(item.id) !== String(payload.id));
      state.items = filteredCart
    }
     localStorage.setItem(state.cartId, JSON.stringify(state.items));
  },
  /**
   * Set the subtotal for the cart
   */
  setSubTotal(state, payload) {
    state.subTotal = payload;
  },
  /**
   * Set the shipping cost
   */
  setShipping(state, payload) {
    state.shipping = payload;
  },
  /**
   * Set any applicable taxes
   */
  setTaxes(state, payload) {
    state.taxes = payload;
  },
  /**
   * Set the amount of the discount, if any
   */
  setDiscount(state, payload) {
    state.discount = payload;
  },
  /**
   * Set the total for everything (items, shipping, taxes, discount)
   */
  setTotal(state, payload) {
    state.total = payload;
  },
  /**
   * Set the current cart id
   */
  setCartId(state, payload) {
    state.cartId = payload;
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
    const response = await this.$api.addItem(item);
    // console.log(response)
    const newItem = response.cart.lineItems.find(cartItem => String(cartItem.purchasableId) === String(item.id))
    commit('addNewItem', {...item, itemId: newItem.id});
  },
  /**
   * Remove an item entirely from the cart
   */
  async removeItem({ commit }, item) {
      await this.$api.removeItem(item);
      commit('removeItem', item);
  },
  /**
   * Set the quantity of an item
   */
  async setItemQty({dispatch, commit }, item) {
    // let itemIdx;

    // for (const [idx, existingItem] of state.items) {
    //   if (existingItem.id === item.id) {
    //     itemIdx = idx;
    //   }
    // }

    // if (itemIdx && itemIdx !== -1) {
    //   commit('setItemQty', { idx: itemIdx, qty: item.qty });
    // }
    await this.$api.updateQty(item);
    if (item.qty === 0) {
      return dispatch('removeItem', item)
    }
    commit('setItemQty', item);
  },
  /**
   * Calculates the subtotal for items in the cart
   */
  calculateSubtotal({ commit }) {
    let subTotal = 0;

    for (const item of state.items) {
      subTotal += item.price * item.qty;
    }

    commit('setSubtotal', subTotal);
  },
  /**
   * Calculates the total for everything (items, shipping, taxes, discount)
   */
  calculateTotal({ commit }) {
    commit('setTotal', (state.subTotal + state.shipping + state.taxes - state.discount));
  },

  /**
   * Calculates the total for everything (items, shipping, taxes, discount)
   */
  setCartId({ commit }, payload) {
    commit('setCartId', payload);
  },
}

