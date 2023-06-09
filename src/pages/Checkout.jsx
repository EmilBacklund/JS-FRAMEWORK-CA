import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/modules/cartSlice';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { selectTotalPriceWithDiscount } from '../store/modules/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const { productsInCart } = useSelector((state) => state.cart);
  const [havePayed, setHavePayed] = useState(false);
  const totalPriceWithDiscount = useSelector(selectTotalPriceWithDiscount);

  let priceWithDiscount = 0;

  productsInCart.forEach((item) => {
    priceWithDiscount += item.discountedPrice;
  });

  const handlePayNowClick = (event) => {
    event.preventDefault();
    dispatch(clearCart());
    setHavePayed(true);
  };

  return (
    <>
      {productsInCart.length == 0 && !havePayed && (
        <div className="bg-violet-50">
          <div className="mx-auto flex items-center gap-6 flex-col justify-center max-w-7xl py-32 mb-auto ">
            <h1 className="text-center">Something went wrong 😞</h1>
            <NavLink
              to="/products"
              className="rounded-md w-auto text-center border cursor-pointer border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Back to Home
            </NavLink>
          </div>
        </div>
      )}
      {productsInCart.length == 0 && havePayed && (
        <div className="bg-violet-50">
          <div className="mx-auto flex items-center gap-6 flex-col justify-center max-w-7xl py-32 mb-auto ">
            <h1 className="text-center">Your payment was successfull!</h1>
            <p>Thank you! 🥰</p>
            <NavLink
              to="/products"
              className="rounded-md w-auto text-center border cursor-pointer border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Back to Home
            </NavLink>
          </div>
        </div>
      )}
      {productsInCart.length > 0 && (
        <div className="bg-white">
          <div
            className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block"
            aria-hidden="true"
          />
          <div
            className="fixed right-0 top-0 hidden h-full w-1/2 bg-indigo-900 lg:block"
            aria-hidden="true"
          />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
            <h1 className="sr-only">Checkout</h1>

            <section
              aria-labelledby="summary-heading"
              className="bg-indigo-900 py-12 text-indigo-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
            >
              <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                <h2 id="summary-heading" className="sr-only">
                  Order summary
                </h2>

                <dl>
                  <dt className="text-sm font-medium">Thank you! ❤️</dt>
                  <dd className="mt-1 text-3xl font-bold tracking-tight text-white">
                    Order summary
                  </dd>
                </dl>

                <ul
                  role="list"
                  className="divide-y divide-white divide-opacity-10 text-sm font-medium"
                >
                  {productsInCart.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-start space-x-4 py-6"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-20 w-20 flex-none rounded-md object-cover object-center"
                      />
                      <div className="flex-auto space-y-1">
                        <h3 className="text-white">{product.title}</h3>
                        <p>{product.description}</p>
                      </div>
                      <p className="flex-none text-base font-medium text-white">
                        $
                        {(product.discountedPrice * product.quantity).toFixed(
                          2
                        )}
                      </p>
                    </li>
                  ))}
                </ul>

                <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
                  <div className="flex items-center justify-between pt-6 text-white">
                    <dt className="text-base">Total</dt>
                    <dd className="text-base">
                      ${totalPriceWithDiscount.toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <section
              aria-labelledby="payment-and-shipping-heading"
              className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
            >
              <h2 id="payment-and-shipping-heading" className="sr-only">
                Payment and shipping details
              </h2>
              <form onSubmit={handlePayNowClick}>
                <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                  <div>
                    <h3
                      id="contact-info-heading"
                      className="text-lg font-medium text-gray-900"
                    >
                      Contact information
                    </h3>

                    <div className="mt-6">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          id="email-address"
                          name="email-address"
                          autoComplete="email"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-lg font-medium text-gray-900">
                      Payment details
                    </h3>

                    <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                      <div className="col-span-3 sm:col-span-4">
                        <label
                          htmlFor="card-number"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Card number
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="card-number"
                            name="card-number"
                            autoComplete="cc-number"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="col-span-2 sm:col-span-3">
                        <label
                          htmlFor="expiration-date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Expiration date (MM/YY)
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="expiration-date"
                            id="expiration-date"
                            autoComplete="cc-exp"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="cvc"
                          className="block text-sm font-medium text-gray-700"
                        >
                          CVC
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="cvc"
                            id="cvc"
                            autoComplete="csc"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-lg font-medium text-gray-900">
                      Shipping address
                    </h3>

                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="address"
                            name="address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="city"
                            name="city"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State / Province
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="region"
                            name="region"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Postal code
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="postal-code"
                            name="postal-code"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-lg font-medium text-gray-900">
                      Billing information
                    </h3>

                    <div className="mt-6 flex items-center">
                      <input
                        id="same-as-shipping"
                        name="same-as-shipping"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="ml-2">
                        <label
                          htmlFor="same-as-shipping"
                          className="text-sm font-medium text-gray-900"
                        >
                          Same as shipping information
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                    <input
                      type="submit"
                      value="Pay now"
                      className="rounded-md w-full text-center border cursor-pointer border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    />
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
