import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { NavLink } from 'react-router-dom';

const MaxQuantityError = ({ item, itemImg }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-40"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg background shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex ">
                  <div className="flex items-center gap-4 justify-between">
                    <ExclamationTriangleIcon
                      className="w-20 h-20 md:h-24 md:w-24  text-yellow-500"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-500">
                        Max quantity reached for {item}
                      </h3>
                      <div className="flex gap-4  mt-4">
                        <p className="text-sm font-medium text-white flex-1">
                          You can't buy more than 10 items of a single product
                          in one purchase.
                        </p>
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden">
                          <img
                            className="w-full object-cover"
                            src={itemImg}
                            alt={item}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sm:ml-4 flex flex-shrink-0"></div>
                  <button
                    type="button"
                    className="h-fit rounded-md bg-white text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <NavLink
                    to="/products"
                    className="text-center w-full rounded-md border border-transparent bg-indigo-600 h-[33px] leading-[33px] px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 mt-4"
                  >
                    See other products
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className="text-center w-full rounded-md border border-transparent bg-green-600 h-[33px] leading-[33px] px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 mt-4"
                  >
                    Go to cart
                  </NavLink>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export default MaxQuantityError;
