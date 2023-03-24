// configureStore will help you create the redux store
// combineReducers will help you to combine all your modules e.g (products, productDetails, etc)
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Here I am combining my modules
const reducer = combineReducers({
  // list my modules
});

// her I am creating my store
const index = configureStore({
  reducer,
});

export default index;
