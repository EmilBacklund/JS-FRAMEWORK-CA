import { createSlice } from '@reduxjs/toolkit';

// Slice
// name
// initial state
// reducers // those are the functions which amend of change the state

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    total: 0,
  },
  // Here we declare the functions which amend our state
  // state - is the current state at this time
  // action - it will have the new state we get from the API
  reducers: {
    SET_ALL_PRODUCTS: (state, action) => {
      state.products = action.payload;
    },
  },
});

export default productsSlice.reducer;

// Actions // API calls etc
// *** WE DONT CHANGE THE STATE HERE ***
const { SET_ALL_PRODUCTS } = productsSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch('https://api.noroff.dev/api/v1/online-shop');
    const data = await response.json();
    console.log(data);

    dispatch(SET_ALL_PRODUCTS(data));
  } catch (e) {
    console.error(e);
  }
};
