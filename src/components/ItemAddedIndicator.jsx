import { Popover, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

const ItemAddedIndicator = ({
  show,
  setItemAdded,
  timeoutId,
  currentItemInCart,
}) => {
  const { productsInCart } = useSelector((state) => state.cart);
  const leaveTimeoutId = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    clearTimeout(leaveTimeoutId.current);
    setItemAdded(true);
  };

  const handleMouseLeave = () => {
    leaveTimeoutId.current = setTimeout(() => {
      setItemAdded(false);
    }, 3000);
  };

  return (
    <Popover
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={
        currentItemInCart == 10
          ? 'sticky  -translate-y-2 top-5 sm:top-64 z-50 h-0 '
          : 'sticky -translate-y-2 top-5 z-50 h-0 '
      }
    >
      <div className="bg-white pb-6 shadow-lg sm:px-2 ml-auto lg:w-80 lg:rounded-lg lg:ring-opacity-5  lg:ring-black lg:ring-1 ">
        <Transition show={show}>
          <Popover.Panel className="">
            <h2 className="sr-only">Shopping Cart</h2>
            <form className="mx-auto max-w-2xl px-4">
              <button
                type="button"
                className="h-fit float-right mt-6 rounded-md bg-gray-400 text-gray-300 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  setItemAdded(false);
                }}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <ul role="list" className="divide-y divide-gray-200">
                {productsInCart.slice(-3).map((product) => (
                  <li key={product.id} className="flex items-center py-6">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-16 w-16 object-cover flex-none rounded-md border border-gray-200"
                    />
                    <div className="ml-4 flex-auto">
                      <h3 className="font-medium text-gray-900">
                        <NavLink to={`product/${product.id}`}>
                          {product.title}
                        </NavLink>
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Qty: {product.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <NavLink to="/cart/checkout">
                <button className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                  Checkout
                </button>
              </NavLink>
              <p className="mt-6 text-center">
                <NavLink
                  to="/cart"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View Shopping Cart
                </NavLink>
              </p>
            </form>
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  );
};

export default ItemAddedIndicator;
