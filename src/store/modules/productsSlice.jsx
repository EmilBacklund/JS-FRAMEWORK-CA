import { createSlice } from '@reduxjs/toolkit';
import { setLoadingState } from './loaderSlice';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    singleProduct: null,
    isError: false,
    filteredProducts: [],
  },

  reducers: {
    SET_ALL_PRODUCTS: (state, action) => {
      state.products = action.payload;
    },
    SET_SINGLE_PRODUCT: (state, action) => {
      state.singleProduct = action.payload;
    },
    SET_ERROR: (state, action) => {
      state.isError = action.payload;
    },
    SET_FILTERED_PRODUCTS: (state, action) => {
      state.filteredProducts = action.payload;
    },
  },
});

export default productsSlice.reducer;

// Actions // API calls etc
// *** WE DONT CHANGE THE STATE HERE ***
const { SET_ALL_PRODUCTS } = productsSlice.actions;
const { SET_SINGLE_PRODUCT } = productsSlice.actions;
const { SET_ERROR } = productsSlice.actions;
const { SET_FILTERED_PRODUCTS } = productsSlice.actions;

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
    dispatch(handleResponseError(false));
  } else {
    dispatch(handleResponseError(true));
  }
};

export const handleResponseError = (response) => (dispatch) => {
  dispatch(SET_ERROR(response));
};

export const handleFilteredProducts = (filteredProducts) => (dispatch) => {
  dispatch(SET_FILTERED_PRODUCTS(filteredProducts));
};
