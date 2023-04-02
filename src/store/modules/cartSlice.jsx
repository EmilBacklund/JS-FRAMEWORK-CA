import { createSlice, createSelector } from '@reduxjs/toolkit';

const cartrSlice = createSlice({
  name: 'cart',
  initialState: {
    productsInCart: [],
  },
  reducers: {
    ADD_PRODUCT_TO_CART: (state, action) => {
      const productIndex = state.productsInCart.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productIndex !== -1) {
        if (state.productsInCart[productIndex].quantity <= 9) {
          state.productsInCart[productIndex].quantity += 1;
          state.productsInCart[productIndex].canAddItem = true;
        } else {
          state.productsInCart[productIndex].canAddItem = false;
        }
      } else {
        state.productsInCart = [
          ...state.productsInCart,
          { ...action.payload, quantity: 1, canAddItem: true },
        ];
      }
    },
    REMOVE_PRODUCT_FROM_CART: (state, action) => {
      state.productsInCart = state.productsInCart.filter(
        (product) => product.id !== action.payload
      );
    },
    CLEAR_CART: (state) => {
      state.productsInCart = [];
    },
    UPDATE_PRODUCT_QUANTITY: (state, action) => {
      const { index, quantity } = action.payload;
      state.productsInCart[index].quantity = quantity;
    },
  },
});

export default cartrSlice.reducer;

// Actions
const {
  ADD_PRODUCT_TO_CART,
  CLEAR_CART,
  REMOVE_PRODUCT_FROM_CART,
  UPDATE_PRODUCT_QUANTITY,
} = cartrSlice.actions;

export const addProductToCart = (productData) => (dispatch) => {
  dispatch(ADD_PRODUCT_TO_CART(productData));
};

export const removeProductFromCart = (productId) => (dispatch) => {
  dispatch(REMOVE_PRODUCT_FROM_CART(productId));
};

export const clearCart = () => (dispatch) => {
  dispatch(CLEAR_CART());
};

export const updateProductQuantity = (index) => (dispatch) => {
  dispatch(UPDATE_PRODUCT_QUANTITY(index));
};

export const selectTotalPriceWithDiscount = createSelector(
  (state) => state.cart.productsInCart,
  (productsInCart) => {
    let totalPriceWithDiscount = 0;

    productsInCart.forEach((item) => {
      totalPriceWithDiscount += item.discountedPrice * item.quantity;
    });

    return totalPriceWithDiscount;
  }
);
