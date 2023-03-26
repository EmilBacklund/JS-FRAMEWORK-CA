import { createSlice } from '@reduxjs/toolkit';

const cartrSlice = createSlice({
  name: 'cart',
  initialState: {
    productsInCart: [],
  },
  reducers: {
    ADD_PRODUCT_TO_CART: (state, action) => {
      console.log('action: ', action);
      state.productsInCart = [...state.productsInCart, action.payload];
    },
  },
});

export default cartrSlice.reducer;

// Actions
const { ADD_PRODUCT_TO_CART } = cartrSlice.actions;

export const addProductToCart = (productData) => (dispatch) => {
  console.log('productData: ', productData);
  dispatch(ADD_PRODUCT_TO_CART(productData));
};
