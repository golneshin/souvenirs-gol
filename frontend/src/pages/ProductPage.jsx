import { Link, useParams } from 'react-router-dom'
import products from '../products';
import Rating from '../components/Rating';

const ProductPage = () => {
  const { id: productID } = useParams();
  const product = products.find((p) => p._id === productID);
  console.log(product)

  return (
    // <div className='flex flex-col text-gray-700'>
      <div class="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="
              text-white 
              bg-blue-700 
              dark:bg-blue-600 
              hover:bg-blue-800 
              dark:hover:bg-blue-700 
              dark:focus:ring-blue-800
              focus:ring-blue-300 
              focus:outline-none 
              focus:ring-4 
              font-medium 
              text-center 
              rounded-lg 
              text-sm 
              py-2.5 
              px-5 
              ml-6
              mb-2
              ">
            Go Back
          </Link>
        </div>
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex flex-col md:flex-row -mx-4">
                  <div class="md:flex-1 px-4">
                      <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                          <img class="w-full h-full object-cover" src={product.image} alt="Product Image"/>
                      </div>
                      <div class="flex -mx-2 mb-4">
                          <div class="w-1/2 px-2">
                              <button class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                          </div>
                          <div class="w-1/2 px-2">
                              <button class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                          </div>
                      </div>
                  </div>
                  <div class="md:flex-1 px-4">
                      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
                      <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                          ante justo. Integer euismod libero id mauris malesuada tincidunt.
                      </p>
                      <div class="flex items-end mb-4">
                          <div class="flex items-end gap-1 my-auto mr-4">
                              <span class="font-bold  text-gray-700 dark:text-gray-300">Price:</span>
                              <span class="text-3xl text-gray-600 dark:text-gray-300">$ {product.price}</span>
                          </div>
                          <div>
                              <span class="font-bold text-gray-700 dark:text-gray-300">Availability: </span>
                              <span class="text-gray-600 dark:text-gray-300">
                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                              </span>
                          </div>
                      </div>
                      <div class="mb-4">
                          {/* <span class="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                          <div class="flex items-center mt-2">
                              <button class="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                              <button class="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                              <button class="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                              <button class="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                          </div> */}
                        <Rating value={product.rating} rate={`${product.rating} from ${product.numReviews} reviews`} />
                      </div>
                      <div class="mb-4">
                          <span class="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                          <div class="flex items-center mt-2">
                              <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                              <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                              <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                              <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                              <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
                          </div>
                      </div>
                      <div>
                          <span class="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                          <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                              {product.description}
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    // </div>
  )
}

export default ProductPage
