import { Route, Routes } from 'react-router-dom';
import Products from '../pages/Products';
import Contact from '../pages/Contact';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import PageNotFound from '../pages/PageNotFound';
import Checkout from '../pages/Checkout';
import Category from '../pages/Category';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/products/category/:tag" element={<Category />} />
        <Route path="/category/:tag" element={<Category />} />
        <Route
          path="/products/category/:tag/products/product/:id"
          element={<ProductDetail />}
        />
        <Route path="/category/:tag/product/:id" element={<ProductDetail />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default Router;
