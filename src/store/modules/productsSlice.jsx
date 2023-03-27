import { createSlice } from '@reduxjs/toolkit';
import { setLoadingState } from './loaderSlice';

// Slice
// name
// initial state
// reducers // those are the functions which amend of change the state

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    singleProduct: null,
    isError: false,
  },
  // Here we declare the functions which amend our state
  // state - is the current state at this time
  // action - it will have the new state we get from the API
  reducers: {
    SET_ALL_PRODUCTS: (state, action) => {
      console.log('SET_PRODUCTS: action.payload', action.payload[2]);

      state.products = action.payload;
    },
    SET_SINGLE_PRODUCT: (state, action) => {
      console.log('SET_SINGLE_PRODUCT: action.payload', action.payload);
      state.singleProduct = action.payload;
    },
    SET_ERROR: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export default productsSlice.reducer;

// Actions // API calls etc
// *** WE DONT CHANGE THE STATE HERE ***
const { SET_ALL_PRODUCTS } = productsSlice.actions;
const { SET_SINGLE_PRODUCT } = productsSlice.actions;
const { SET_ERROR } = productsSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const response = await fetch('https://api.noroff.dev/api/v1/online-shop');
    const data = await response.json();

    dispatch(SET_ALL_PRODUCTS(data));
    dispatch(setLoadingState(false));
  } catch (e) {
    return console.error(e.message);
  }
};

export const fetchSingleProductByID = (id) => async (dispatch) => {
  dispatch(setLoadingState(true));
  let singleResponse;
  try {
    singleResponse = await fetch(
      `https://api.noroff.dev/api/v1/online-shop/${id}`
    );
    const singleData = await singleResponse.json();

    dispatch(SET_SINGLE_PRODUCT(singleData));
    dispatch(setLoadingState(false));
  } catch (e) {
    return console.error(e.message);
  }
  if (singleResponse.ok) {
    console.log('singleResponse is okey');
    dispatch(handleResponseError(false));
  } else {
    console.log('singleResponse is not okey');
    dispatch(handleResponseError(true));
  }
};

export const handleResponseError = (response) => (dispatch) => {
  dispatch(SET_ERROR(response));
};
