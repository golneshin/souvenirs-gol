import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react';

import Rating from '../components/Rating';

const ProductPage = () => {
  const { id: productID } = useParams();
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const getProductAPI = useCallback(async () => {
    setLoading(true)
    
    try {
      const productRes = await axios.get(`/api/products/${productID}`)
      setProduct(productRes.data)
      
    } catch (error) {
      console.error(error.message)
    } finally{
      setLoading(false)
    }
  },[])

  useEffect(()=> {
    getProductAPI()
  },[getProductAPI])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // <div className='flex flex-col text-gray-700'>
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
                      <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                          <img className="w-full h-full object-cover" src={product.image} alt="Product Image"/>
                      </div>
                      <div className="flex -mx-2 mb-4">
                          <div className="w-1/2 px-2">
                              <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                          </div>
                          <div className="w-1/2 px-2">
                              <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                          </div>
                      </div>
                  </div>
                  <div className="md:flex-1 px-4">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
                      {/* <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                          ante justo. Integer euismod libero id mauris malesuada tincidunt.
                      </p> */}
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
                      <div className="mb-4">
                          <span className="font-bold text-gray-700 dark:text-gray-300">Select Model:</span>
                          <div className="flex items-center mt-2">
                              <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{product.model[0]}</button>
                              <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{product.model[1]}</button>
                              <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{product.model[2]}</button>
                              <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{product.model[3]}</button>
                              {/* <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button> */}
                          </div>
                      </div>
                      <div>
                          <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
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
