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
  cartErrors: []
 
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
  getLoading(state) {
    return state.loading;
  },
  /**
   * Get Cart errors
   */
  getCartErrors(state) {
    return state.cartErrors;
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
    const items = state.items.filter(item => item.id !== payload.id)
    state.items = items
    localStorage.setItem(state.currentCart.number, JSON.stringify(state.items));
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
  /**
   * Set the cart error
   */
  setCartErrors(state, payload) {
    state.cartErrors = payload;
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
  async addNewItem({ commit, dispatch }, item) {
    try {
        const {cart} = await this.$api.addItem({
          id: item.id,
          qty: item.qty
        });
       const errorNotices = handleNotices({commit, dispatch}, cart.notices)
       if (errorNotices.length < 1) {
         const newItem = cart.lineItems.find(cartItem => String(cartItem.purchasableId) === String(item.id));

         commit('addNewItem', {
           ...item,
           itemId: newItem.id
         });
         commit('setCurrentCart', cart);
       }
    } catch (error) {
      handleError(commit, error)
    }
    
    
  },
  /**
   * Remove an item entirely from the cart
   */
  async removeItem({ commit, dispatch }, item) {
   
    try {
       const {
         cart
       } = await this.$api.removeItem({
           itemId:item.itemId
         },
       );

       const errorNotices = handleNotices({commit, dispatch}, cart.notices)
       if (errorNotices.length < 1) {
          commit('removeItem', item);
          commit('setCurrentCart', cart);
       }

    } catch (error) {
       handleError(commit, error)
    }
  },
  /**
   * Set the quantity of an item
   */
  async setItemQty({dispatch, commit }, item) {
    try {
      const {
        cart
      } = await this.$api.updateQty({
        itemId: item.itemId,
        qty: item.qty
      });


      const errorNotices = handleNotices({commit, dispatch}, cart.notices)
      if (errorNotices.length < 1) {
        if (item.qty === 0) {
          return dispatch('removeItem', item)
        }
        commit('setItemQty', item);
        commit('setCurrentCart', cart);
        return true
      }

      
    } catch (error) {
      handleError(commit, error)
      return false
    }
  },
  /**
   * Apply coupon
   */
  async applyCoupon({dispatch, commit }, item) {
    try {
       const {cart} = await this.$api.applyCoupon({couponCode: item.couponCode});

      const errorNotices = handleNotices({commit, dispatch}, cart.notices)
      if (errorNotices.length < 1) {
        commit('setItemQty', item);
        commit('setCurrentCart', cart);
        return true
      }

    } catch (error) {
      handleError(commit, error)
      return false
    }
  },

  /**
   * Clear Cart notices
   */
  async clearNotices({commit }) {
    const { cart } = await this.$api.clearNotices();
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

  /**
   * set cart Errors
   */
  setCartErrors({ commit }, payload) {
    commit('setCartErrors', payload);
  },
}

const handleNotices = ({commit, dispatch}, notices) => {
  let errors = []
  notices.forEach(notice => {
    errors = [...errors, notice.message]
  })
  commit('setCartErrors', errors)
  setTimeout(() => {
    dispatch('clearNotices')
    commit('setCartErrors', [])
  }, 6000);

  return errors
}

 const handleError = (commit, error) =>{
    let errors = []
    if (error.response.status === 400) {
      const cartErrors = Object.values(error.response.data.errors)
      cartErrors.forEach(parentErrors => {
        parentErrors.forEach(error => {
          errors = [...errors, error]
        })
      })
      commit('setCartErrors', errors)
      setTimeout(() => {
        commit('setCartErrors', [])
      }, 6000);
    } else {
      commit('setCartErrors', ["Your request coud not be completed at the moment. Please try again"])
      setTimeout(() => {
        commit('setCartErrors', [])
      }, 6000);
    }
    return {
      success: false,
      error
    }
  }

