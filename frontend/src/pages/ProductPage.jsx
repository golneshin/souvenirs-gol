import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
// Internal imports:
import { useGetProductQuery } from '../slices/productsApiSlice';
import { addTOCart } from '../slices/cartSlice';
import { SPINNERS } from '../assets/SVGs';
import Rating from '../components/Rating';

const ProductPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // instead of using useState, useCallback, useEffect and try-catch block:
  // now we just use the hook created by RTK Query.
  const [qty, setQty] = useState(1)
  const { id: productID } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(productID)

  const addToCartHandler = () => {
    dispatch(addTOCart({ ...product, qty }))
    navigate('/cart')
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center m-40 ">
        {SPINNERS.BIG}
      </div>
    )
  };

  if (error) {
    return (
      <div class="alert alert-primary" role="alert">
        {error?.data?.message || error.error}
      </div>
    )
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            {/* product image */}
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img className="w-full h-full object-cover" src={product.image} alt="Product Image"/>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
            {/* <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                ante justo. Integer euismod libero id mauris malesuada tincidunt.
            </p> */}
            {/* price and availability */}
            <div className="flex items-end mb-4">
              <div className="flex items-end gap-1 my-auto mr-4">
                <span className="font-bold  text-gray-700 dark:text-gray-300">Price:</span>
                <span className="text-3xl text-gray-600 dark:text-gray-300">${product.price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">Availability: </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            {/* Ratings */}
            <div className="mb-4">
                {/* <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                <div className="flex items-center mt-2">
                    <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                    <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                    <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                    <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                </div> */}
              <Rating value={product.rating} rate={`${product.rating} from ${product.numReviews} reviews`} />
            </div>
            {/* product models */}
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">Select a Model:</span>
              <div className="flex items-center mt-2">
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{product.model[0]}</button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{product.model[1]}</button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{product.model[2]}</button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{product.model[3]}</button>
                {/* <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button> */}
              </div>
            </div>
            {/* product description */}
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {product.description}
              </p>
            </div>
            
            {/* add to cart & add to wishlist */}
            <div className="flex -mx-2 mb-2 py-4 items-baseline">
             {product.countInStock > 0 && (
                <div className="px-4 bg-white dark:bg-gray-800 shadow rounded-md">
                  <div className="flex items-center gap-2 ">
                    <span className=" font-bold text-gray-700 dark:text-gray-300">Qty:</span>
                    <select
                      className=" font-bold w-full block mt-1 p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              <div className="w-1/2 px-2">
                <button 
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
                    w-full 
                    py-2 
                    px-4 
                    rounded-full 
                    font-bold 
                    "
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                  >
                  Add to Cart
                </button>
              </div>
              {/* <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Add to Wishlist
                </button>
              </div> */}
              {/* Qty Select */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
