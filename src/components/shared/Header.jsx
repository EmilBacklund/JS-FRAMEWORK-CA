import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/20/solid';
import { useLocation } from 'react-router-dom';

const Header = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const location = useLocation();

  const navigation = [
    {
      name: 'Home',
      href: '/',
      current: location.pathname === '/',
    },
    {
      name: 'Contact',
      href: '/contact',
      current: location.pathname === '/contact',
    },
  ];

  return (
    <Disclosure as='header' className='header-background shadow'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8'>
            <div className='relative flex h-16 justify-between'>
              <div className='relative z-10 flex px-2 lg:px-0'>
                <div className='flex flex-shrink-0 items-center'>
                  <img
                    className='block h-8 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                    alt='Your Company'
                  />
                </div>
              </div>
              <div className='relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0'>
                <div className='w-full sm:max-w-xs'>
                  <label htmlFor='search' className='sr-only'>
                    Search
                  </label>
                  <div className='relative'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    </div>
                    <input
                      id='search'
                      name='search'
                      className='text-lg block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      placeholder='Search'
                      type='search'
                    />
                  </div>
                </div>
              </div>
              <div className='relative z-10 flex items-center lg:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
            <nav
              className='hidden lg:flex lg:space-x-8 lg:py-2 items-center justify-between'
              aria-label='Global'
            >
              <div className='flex gap-8'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-200 text-gray-800' : ' hover:bg-gray-100 ',
                      'inline-flex items-center rounded-md py-2 px-3 text-lg font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className='ml-4 flow-root lg:ml-8'>
                <a href='#' className='group -m-2 flex items-center p-2'>
                  <ShoppingCartIcon
                    className='h-6 w-6 flex-shrink-0 text-gray-500 group-hover:text-gray-600'
                    aria-hidden='true'
                  />
                  <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                    0
                  </span>
                  <span className='sr-only'>items in cart, view bag</span>
                </a>
              </div>
            </nav>
          </div>

          <Disclosure.Panel as='nav' className='lg:hidden' aria-label='Global'>
            <div className='space-y-1 px-2 pt-2 pb-3'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-200 text-gray-800' : ' hover:bg-gray-100 ',
                    'block rounded-md py-2 px-3 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className='border-t border-gray-200 pt-4 pb-3'>
              <div className='flex items-center px-4'>
                <div className='flow-root lg:ml-8'>
                  <a href='#' className='group -m-2 flex items-center p-2'>
                    <ShoppingCartIcon
                      className='h-6 w-6 flex-shrink-0 text-gray-500 group-hover:text-gray-600'
                      aria-hidden='true'
                    />
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                      0
                    </span>
                    <span className='sr-only'>items in cart, view bag</span>
                  </a>
                </div>
                <div className='flex-shrink-0'>
                  {/* <img className='h-10 w-10 rounded-full' src={user.imageUrl} alt='' /> */}
                </div>
                <div className='ml-3'>
                  {/* <div className='text-base font-medium text-gray-800'>{user.name}</div>
                  <div className='text-sm font-medium text-gray-500'>{user.email}</div> */}
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
