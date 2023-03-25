import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/modules/productsSlice';
import { StarIcon } from '@heroicons/react/20/solid';
import PromoSection from '../components/PromoSection';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log('Produkter', products);

  return (
    <div className='background'>
      <PromoSection products={products} />

      <div className='mx-auto max-w-7xl overflow-hidden py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-4'>
          All Products
        </h1>
        <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8'>
          {products.map((product) => (
            <div key={product.id} className='group text-sm'>
              <Link to={`product/${product.id}`}>
                <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                  <img
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    className='h-full w-full object-cover object-center'
                  />
                </div>
              </Link>
              <Link to={`product/${product.id}`}>
                <h3 className='mt-4 font-medium text-white'>{product.title}</h3>
              </Link>
              <div className='mt-2 flex flex-col w-min'>
                <p className='sr-only'>{product.rating} out of 5 stars</p>
                <div className='flex items-center'>
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-yellow-500' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden='true'
                    />
                  ))}
                </div>
                <p className='mt-1 text-sm text-gray-400'>{product.reviews.length} reviews</p>
              </div>
              <p className='mt-2 font-medium text-white'>$ {product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
