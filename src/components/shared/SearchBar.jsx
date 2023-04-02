import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleFilteredProducts } from '../../store/modules/productsSlice';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    let filteredProducts;

    if (searchQuery.length) {
      filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      filteredProducts = [];
    }

    dispatch(handleFilteredProducts(filteredProducts));
  }, [searchQuery, products, dispatch]);

  useEffect(() => {
    setSearchQuery('');
  }, [location]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        id="search"
        name="search"
        className="text-lg block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Search"
        type="search"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
    </div>
  );
};

export default SearchBar;
