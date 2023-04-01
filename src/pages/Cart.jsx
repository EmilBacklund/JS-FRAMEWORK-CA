import { useSelector, useDispatch } from 'react-redux';
import { CheckIcon } from '@heroicons/react/20/solid';
import { NavLink } from 'react-router-dom';
import {
  removeProductFromCart,
  updateProductQuantity,
} from '../store/modules/cartSlice';
import { useState, useEffect } from 'react';

const Cart = () => {
  const dispatch = useDispatch();
  const { productsInCart } = useSelector((state) => state.cart);
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);
  const [priceWithNoDiscount, setPriceWithNoDiscount] = useState(0);

  console.log('PRODUKTER I VAGNEN', productsInCart);

  function calculateDiscountPercentage(noDiscount, discount) {
    const difference = noDiscount - discount;
    const discountPercentage = (difference / noDiscount) * 100;
    return (
      <p className="text-2xl text-center mt-6 text-gray-900">
        You are saving{' '}
        <span className="text-green-600">{discountPercentage.toFixed(2)}%</span>{' '}
        with this buy!
      </p>
    );
  }

  const handleQuantityChange = (event, cartIndex) => {
    const newQuantity = parseInt(event.target.value);
    const item = productsInCart[cartIndex];
    const oldQuantity = item.quantity;

    const newPriceWithNoDiscount =
      priceWithNoDiscount + (newQuantity - oldQuantity) * item.price;
    const newPriceWithDiscount =
      priceWithDiscount + (newQuantity - oldQuantity) * item.discountedPrice;

    setPriceWithNoDiscount(newPriceWithNoDiscount);
    setPriceWithDiscount(newPriceWithDiscount);

    dispatch(
      updateProductQuantity({ index: cartIndex, quantity: newQuantity })
    );
  };

  useEffect(() => {
    let initialPriceWithDiscount = 0;
    let initialPriceWithNoDiscount = 0;

    productsInCart.forEach((item) => {
      initialPriceWithNoDiscount += item.price * item.quantity;
      initialPriceWithDiscount += item.discountedPrice * item.quantity;
    });

    setPriceWithNoDiscount(initialPriceWithNoDiscount);
    setPriceWithDiscount(initialPriceWithDiscount);
  }, [productsInCart]);

  return (
    <div className="bg-violet-100">
      <div className="mx-auto max-w-4xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        {productsInCart.length == 0 && (
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-12">
              Shopping Cart
            </h1>
            <div className="flex items-center gap-8 mb-12">
              <div className="w-24">
                <img src="/images/cartEmpty.svg" />
              </div>
              <h1 className="text-2xl text-gray-900">Cart is empty</h1>
            </div>
            <NavLink
              to="/products"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Continue Shopping
            </NavLink>
          </div>
        )}
        {productsInCart.length > 0 && (
          <>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Shopping Cart
            </h1>

            <form className="mt-12">
              <div>
                <h2 className="sr-only">Items in your shopping cart</h2>

                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-t border-b border-gray-200"
                >
                  {productsInCart.map((product, cartIndex) => (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                        />
                      </div>

                      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div>
                          <div className="flex justify-between sm:grid sm:grid-cols-2">
                            <div className="pr-6">
                              <h3 className="text-sm">
                                <a
                                  href={product.href}
                                  className="font-medium text-gray-900 hover:text-gray-500"
                                >
                                  {product.title}
                                </a>
                              </h3>
                              {product.quantity > 1 && (
                                <p className="text-xs mt-2 text-gray-500 font-bold pl-2">
                                  ${product.discountedPrice}/ piece with
                                  discount
                                </p>
                              )}
                            </div>

                            <div>
                              <p className="text-right text-base font-medium text-green-600">
                                $
                                {(
                                  product.discountedPrice * product.quantity
                                ).toFixed(2)}
                              </p>
                              {product.discountedPrice !== product.price && (
                                <p className="text-right text-sm font-medium text-red-500 line-through">
                                  $
                                  {(product.price * product.quantity).toFixed(
                                    2
                                  )}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 flex items-center sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block">
                            <label
                              htmlFor={`quantity-${cartIndex}`}
                              className="sr-only"
                            >
                              Quantity, {product.title}
                            </label>
                            <select
                              id={`quantity-${cartIndex}`}
                              name={`quantity-${cartIndex}`}
                              value={product.quantity}
                              onChange={(e) =>
                                handleQuantityChange(e, cartIndex)
                              }
                              className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-200 sm:text-sm"
                            >
                              {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              ))}
                            </select>

                            <button
                              type="button"
                              className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                              onClick={() =>
                                dispatch(removeProductFromCart(product.id))
                              }
                            >
                              <span>Remove all</span>
                            </button>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          <CheckIcon
                            className="h-5 w-5 flex-shrink-0 text-green-500"
                            aria-hidden="true"
                          />
                          <span>In stock</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order summary */}
              <section aria-labelledby="summary-heading" className="mt-10">
                <h2 id="summary-heading" className="sr-only">
                  Order summary
                </h2>

                <div>
                  <dl className="space-y-4">
                    <div className="flex items-center ">
                      <dt className="text-base font-medium text-gray-900">
                        Total:
                      </dt>
                      <dd className="ml-4 text-base font-medium text-green-600">
                        ${priceWithDiscount.toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                  {priceWithDiscount !== priceWithNoDiscount &&
                    calculateDiscountPercentage(
                      priceWithNoDiscount,
                      priceWithDiscount
                    )}
                </div>

                <div className="mt-10">
                  <NavLink
                    to="/cart/checkout"
                    className="block text-center w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Checkout
                  </NavLink>
                </div>

                <div className="mt-6 text-center text-sm text-gray-400">
                  <p>
                    or{' '}
                    <NavLink
                      to="/products"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </NavLink>
                  </p>
                </div>
              </section>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
