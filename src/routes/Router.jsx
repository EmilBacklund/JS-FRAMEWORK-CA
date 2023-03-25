import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import ProductDetail from '../pages/ProductDetail';

function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:id' element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default Router;
