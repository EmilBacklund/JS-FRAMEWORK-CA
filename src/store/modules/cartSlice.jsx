import { createSlice } from '@reduxjs/toolkit';

const cartrSlice = createSlice({
  name: 'cart',
  initialState: {
    productsInCart: [],
    numberOfProductsInCart: 0,
  },
  reducers: {
    ADD_PRODUCT_TO_CART: (state, action) => {
      console.log('action: ', action);
      console.log('state: ', state.productsInCart);
      state.productsInCart = [...state.productsInCart, action.payload];
    },
    REMOVE_PRODUCT_FROM_CART: (state, action) => {
      console.log('State: ', state, 'Action: ', action);
      state.productsInCart = state.productsInCart.filter(
        (product) => product.id !== action.payload
      );
    },
    CLEAR_CART: (state) => {
      state.productsInCart = [];
    },
  },
});

export default cartrSlice.reducer;

// Actions
const { ADD_PRODUCT_TO_CART, CLEAR_CART, REMOVE_PRODUCT_FROM_CART } =
  cartrSlice.actions;

export const addProductToCart = (productData) => (dispatch) => {
  console.log('productData: ', productData);
  dispatch(ADD_PRODUCT_TO_CART(productData));
};

export const removeProductFromCart = (productId) => (dispatch) => {
  console.log('productID: ', productId);
  dispatch(REMOVE_PRODUCT_FROM_CART(productId));
};

export const clearCart = () => (dispatch) => {
  dispatch(CLEAR_CART());
};
