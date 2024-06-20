import { Link } from "react-router-dom"
import Rating from "./Rating"

const Product = ({ product }) => {
  return (
    <>
      <div className="w-full xs:max-w-sm sm:max-w-xs bg-white border border-gray-200 rounded-lg dark:bg-gray-500 dark:border-gray-700">
          {/* Image */}
          <Link to={`/product/${product?._id}`}>
              <img className="p-8 rounded-t-lg" src={product?.image} alt="product image" />
          </Link>
          <div className="px-5 pb-5">
              {/* Name */}
              <Link to={`/product/${product?._id}`}>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate ...">{product?.name}</h5>
              </Link>
              {/* Stars */}
              <Rating value={product.rating} rate={`${product.rating} from ${product.numReviews} reviews`}/>
              {/* Price */}
              <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">${product?.price}</span>
                  <Link to="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</Link>
              </div>
          </div>
      </div>
    </>
  )
}

export default Product
