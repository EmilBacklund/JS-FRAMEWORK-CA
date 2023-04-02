import { Disclosure } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { useLocation, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';

const Header = () => {
  const productsInCart = useSelector((state) => state.cart.productsInCart);
  const { filteredProducts } = useSelector((state) => state.products);

  let totalItemsWithQuantity = 0;

  productsInCart.forEach((item) => {
    totalItemsWithQuantity += item.quantity;
  });

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const location = useLocation();

  const navigation = [
    {
      name: 'All Products',
      href: '/products',
      current: location.pathname === '/products' || location.pathname === '/',
    },
    {
      name: 'Contact',
      href: '/contact',
      current: location.pathname === '/contact',
    },
  ];

  return (
    <Disclosure as="header" className="bg-white shadow">
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
          <div className="relative flex h-16 justify-between">
            <div className="relative z-10 flex px-2 lg:px-0">
              <div className="flex flex-shrink-0 items-center">
                <NavLink to="/products">
                  <img
                    className="block h-9 w-auto"
                    src="/images/4.png"
                    alt="Your Company"
                  />
                </NavLink>
              </div>
            </div>
            <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
              <div className="w-full sm:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <SearchBar />
              </div>
            </div>
          </div>
          {filteredProducts.length > 0 && (
            <div className="relative flex flex-col gap-2 max-h-96 overflow-auto">
              {filteredProducts.map((product) => (
                <div className="relative p-4 bg-stone-300 hover:bg-stone-200 transition z-10 rounded">
                  <NavLink key={product.id} to={`product/${product.id}`}>
                    <h2 className="mb-4 text-lg font-semibold">
                      {product.title}
                    </h2>
                    <div className="flex gap-4 items-center">
                      <div className="w-20 h-20 rounded overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={product.imageUrl}
                          alt={product.title}
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <p className="text-sm">{product.description}</p>
                        <div className="text-sm font-semibold flex gap-4">
                          {product.tags.map((tag) => (
                            <NavLink
                              to={`/category/${tag}`}
                              className="text-gray-900 cursor-default hover:text-indigo-600"
                            >
                              #{tag}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          )}
          <nav
            className="flex space-x-8 lg:py-2 items-center justify-between"
            aria-label="Global"
          >
            <div className="lg:flex gap-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-200 text-gray-800'
                      : ' hover:bg-gray-100 ',
                    'inline-flex items-center rounded-md py-2 px-3 text-lg font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="ml-4 flow-root lg:ml-8">
              <NavLink
                to="/cart"
                className="group lg:-mr-2 flex items-center  p-2"
              >
                <ShoppingCartIcon
                  className="h-6 w-6 flex-shrink-0 text-gray-500 group-hover:text-gray-600"
                  aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  {totalItemsWithQuantity}
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </NavLink>
            </div>
          </nav>
        </div>
      </>
    </Disclosure>
  );
};

export default Header;
