export const state = () => ({
  items: [],
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
};

export const mutations = {
  /**
   * Set the entire items array. Probably only useful for emptying an entire cart
   */
  setItems(state, payload) {
    state.items = payload;
  },
  /**
   * Add a new item to the cart (to modify quantity, use setItemQty)
   */
  addNewItem(state, payload) {
    state.items.push(payload);
  },
  /**
   * Remove an item entirely from the cart
   */
  removeItem(state, payload) {
    state.items.splice(payload, 1);
  },
  /**
   * Set the quantity of an item
   */
  setItemQty(state, payload) {
    state.items[payload.idx].qty = payload.qty;
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
  addNewItem({ commit }, item) {
    commit('addNewItem', item);
  },
  /**
   * Remove an item entirely from the cart
   */
  removeItem({ commit }, item) {
    let itemIdx;

    for (const [idx, existingItem] of state.items) {
      if (existingItem.id === item.id) {
        itemIdx = idx;
      }
    }

    if (itemIdx && itemIdx !== -1) {
      commit('removeItem', itemIdx);
    }
  },
  /**
   * Set the quantity of an item
   */
  setItemQty({ commit }, item) {
    let itemIdx;

    for (const [idx, existingItem] of state.items) {
      if (existingItem.id === item.id) {
        itemIdx = idx;
      }
    }

    if (itemIdx && itemIdx !== -1) {
      commit('setItemQty', { idx: itemIdx, qty: item.qty });
    }
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
}
