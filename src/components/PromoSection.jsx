import { NavLink } from 'react-router-dom';

const PromoSection = ({ products }) => {
  const allTags = products.flatMap((product) => product.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    const index = acc.findIndex((t) => t.name === tag);
    if (index === -1) {
      acc.push({ name: tag, count: 1 });
    } else {
      acc[index].count++;
    }
    return acc;
  }, []);

  tagCounts.sort((a, b) => b.count - a.count);
  const popularTags = tagCounts.slice(0, 3).map((tag) => tag.name);

  const popularProducts = products.filter((product) =>
    product.tags.some((tag) => popularTags.includes(tag))
  );
  const popularProductsWithImages = popularProducts.map((product) => {
    const matchingImage = products.find(
      (p) =>
        p.id !== product.id && p.tags.some((tag) => product.tags.includes(tag))
    );
    return {
      tag: product.tags.find((tag) => popularTags.includes(tag)),
      image: matchingImage.imageUrl,
      id: matchingImage.id,
    };
  });

  return (
    <div className="relative background lg:mb-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden sm:flex sm:flex-col"
      >
        <div className="relative w-full flex-1 bg-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="h-32 w-full  md:h-40 lg:h-48" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col sm:hidden"
        >
          <div className="relative w-full flex-1 bg-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div className="h-48 w-full " />
        </div>
        <div className="relative py-32">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Popular Categories
          </h1>
          <div className="mt-4 sm:mt-6"></div>
        </div>
      </div>

      <section
        aria-labelledby="collection-heading"
        className="relative -mt-96 sm:mt-0"
      >
        <h2 id="collection-heading" className="sr-only">
          Collections
        </h2>
        <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-8">
          {popularProductsWithImages.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-w-4 sm:aspect-h-5 sm:h-auto"
            >
              <div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 overflow-hidden rounded-lg"
                >
                  <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                </div>
                <div className="absolute inset-0 flex items-end rounded-lg p-6">
                  <div>
                    <p aria-hidden="true" className="text-sm text-white">
                      Shop the collection
                    </p>
                    <h3 className="mt-1 font-semibold text-white">
                      <NavLink to={`/category/${product.tag}`}>
                        <span className="absolute inset-0" />
                        {product.tag.charAt(0).toUpperCase() +
                          product.tag.slice(1)}
                      </NavLink>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PromoSection;
