import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
// Internal imports:
import {
  useCreateReviewMutation,
  useGetProductQuery,
} from "../slices/productsApiSlice";
import { addTOCart } from "../slices/cartSlice";
import { SPINNERS } from "../assets/SVGs";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Meta from "../components/Meta";

const ProductPage = () => {
  const { id: productID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();

  // get product API:
  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductQuery(productID);
  // create product reviews API:
  const [createReview, { isLoading: loadingCreateReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productID,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addToCartHandler = () => {
    dispatch(addTOCart({ ...product, qty }));
    navigate("/cart");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center m-40">
        {SPINNERS.BIG}
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-primary" role="alert">
        {error?.data?.message || error.error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-white bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:ring-blue-300 focus:outline-none focus:ring-4 font-medium text-center rounded-lg text-sm py-2.5 px-5 ml-6 mb-2"
        >
          Go Back
        </Link>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <Meta title={product.name}/>
          {/* Image */}
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover"
                src={product.image}
                alt="Product Image"
              />
            </div>
          </div>
          {/* Product details & buttons */}
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {product.name}
            </h2>

            {/* Price and availability */}
            <div className="flex items-end mb-4">
              <div className="flex items-end gap-1 my-auto mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span className="text-3xl text-gray-600 dark:text-gray-300">
                  ${product.price}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Availability:{" "}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Ratings */}
            <div className="mb-4">
              <Rating
                value={product.rating}
                rate={`${product.rating} from ${product.numReviews} reviews`}
              />
            </div>

            {/* Product models */}
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Select a Model:
              </span>
              <div className="flex items-center mt-2">
                {product.model.map((model, index) => (
                  <button
                    key={index}
                    className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>

            {/* Product description */}
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {product.description}
              </p>
            </div>

            {/* Add to cart & add to wishlist */}
            <div className="flex -mx-2 mb-2 py-4 items-baseline">
              {product.countInStock > 0 && (
                <div className="px-4 bg-white dark:bg-gray-800 shadow rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Qty:
                    </span>
                    <select
                      className="font-bold w-full block mt-1 p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            </div>
          </div>
        </div>
        {/* Reviews & comment */}
        <div>
          <div className="flex flex-col gap-2 md:w-1/2">
            <label className="font-bold dark:text-gray-400 text-2xl">
              Reviews
            </label>
            {product.reviews.length === 0 && (
              <Message variant="light">No Reviews</Message>
            )}
            {product.reviews.map((review) => (
              <div
                key={review._id}
                className="font-bold border-b-2 pb-2 border-gray-500"
              >
                <h2>{review.name}</h2>

                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-300 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                    {review.rating}
                  </p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                </div>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p className="font-semibold text-gray-400">{review.comment}</p>
              </div>
            ))}
            <div className="border-2 rounded-md border-gray-400 p-4">
              <h2 className="border-2 rounded-t-md p-2 text-gray-200 bg-gray-500 font-bold">
                Write a Customer Review
              </h2>

              {loadingCreateReview && SPINNERS.BIG}

              {userInfo ? (
                <form onSubmit={submitHandler} className="space-y-4">
                  <div className="mb-4">
                    <label
                      htmlFor="rating"
                      className="block mt-4 text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
                    >
                      Rating
                    </label>
                    <select
                      id="rating"
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="block w-full font-bold md:w-1/3 dark:text-gray-600 py-2 px-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    >
                      <option className="font-bold" value="">
                        Select...
                      </option>
                      <option className="font-bold" value="1">
                        1 - Poor
                      </option>
                      <option className="font-bold" value="2">
                        2 - Fair
                      </option>
                      <option className="font-bold" value="3">
                        3 - Good
                      </option>
                      <option className="font-bold" value="4">
                        4 - Very Good
                      </option>
                      <option className="font-bold" value="5">
                        5 - Excellent
                      </option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="comment"
                      className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
                    >
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      rows="3"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="block w-full dark:text-gray-800 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loadingCreateReview}
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <Message>
                  Please <Link to="/login">login</Link> to write a review
                </Message>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
