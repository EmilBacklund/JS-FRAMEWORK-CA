import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import PageNotFound from '../pages/PageNotFound';
import Checkout from '../pages/Checkout';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default Router;
