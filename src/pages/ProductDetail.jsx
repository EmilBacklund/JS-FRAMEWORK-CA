import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProductByID } from '../store/modules/productsSlice';
import { useEffect } from 'react';
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import ReviewSection from '../components/ReviewSection';
import { addProductToCart } from '../store/modules/cartSlice';
import PageNotFound from './PageNotFound';
import { handleResponseError } from '../store/modules/productsSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { singleProduct, isError } = useSelector((state) => state.products);

  let { id } = useParams();

  console.log(useSelector((state) => state.products));

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProductByID(id));
    }
  }, [dispatch, id]);

  console.log('singleProduct', singleProduct);

  return (
    <>
      {singleProduct && !isError && (
        <div className="bg-violet-50">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            {/* Product details */}
            <div className="lg:max-w-lg lg:self-end">
              <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {singleProduct.title}
                </h1>
              </div>

              <section aria-labelledby="information-heading" className="mt-4">
                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
                <div className="flex items-center">
                  <p className="text-lg text-gray-900 sm:text-xl">
                    ${singleProduct.price}
                  </p>
                  <div className="ml-4 border-l border-gray-300 pl-4">
                    <h2 className="sr-only">
                      {singleProduct.reviews.length} Reviews
                    </h2>
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                singleProduct.rating > rating
                                  ? 'text-yellow-500'
                                  : 'text-gray-300',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {singleProduct.rating} out of 5 stars
                        </p>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">
                        {singleProduct.reviews.length} reviews
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-6">
                  <p className="text-base text-gray-500">
                    {singleProduct.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center">
                  <CheckIcon
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-2 text-sm text-gray-500">
                    In stock and ready to ship
                  </p>
                </div>
              </section>
            </div>

            {/* Product image */}
            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                <img
                  src={singleProduct.imageUrl}
                  alt={singleProduct.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product form */}
            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              <section aria-labelledby="options-heading">
                <h2 id="options-heading" className="sr-only">
                  Product options
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="mt-4">
                    <a
                      href="#"
                      className="group inline-flex text-sm text-gray-500 hover:text-gray-700"
                    >
                      <span>Need help?</span>
                      <QuestionMarkCircleIcon
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                  <div className="mt-10">
                    <button
                      onClick={() => dispatch(addProductToCart(singleProduct))}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Add to cart
                    </button>
                  </div>
                  <div className="mt-6 text-center">
                    <a
                      href="#"
                      className="group inline-flex text-base font-medium"
                    >
                      <ShieldCheckIcon
                        className="mr-2 h-6 w-6 flex-shrink-0 text-green-500 group-hover:text-green-600"
                        aria-hidden="true"
                      />
                      <span className="text-gray-500 hover:text-gray-700">
                        Lifetime Guarantee
                      </span>
                    </a>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <ReviewSection singleProduct={singleProduct} />
        </div>
      )}
      {isError && (
        <PageNotFound
          status={singleProduct.status}
          statusCode={singleProduct.statusCode}
          isError={isError}
        />
      )}
    </>
  );
};

export default ProductDetail;
