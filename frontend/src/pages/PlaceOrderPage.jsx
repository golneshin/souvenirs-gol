import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { SPINNERS } from "../assets/SVGs";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      if (res && res._id) {
        dispatch(clearCartItems());
        navigate(`/order/${res._id}`);
      } else {
        throw new Error('Order creation failed');
      }

    } catch (err) {
      toast.error(err);
    }
  };

  if (error) {
    return (
      <div className="alert alert-primary" role="alert">
        {error?.data?.message || error.error}
      </div>
    )
  };
  
  return (
    <>
      <CheckoutSteps placeOrderStep />
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {/* order detail */}
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <h2 className="text-md md:text-2xl font-semibold text-gray-900 dark:text-white">
                Shipping
              </h2>
              <div className="rounded-lg my-4 border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.country}
              </div>
              <h2 className="text-md md:text-2xl font-semibold text-gray-900 dark:text-white">
                Payment Method
              </h2>
              <div className="rounded-lg my-4 border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                {cart.paymentMethod}
              </div>
              <h2 className="text-md md:text-2xl font-semibold text-gray-900 dark:text-white">
                Items
              </h2>
              <div className="rounded-lg my-4 border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                {cart.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex my-4 rounded-lg bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-4"
                  >
                    <div className="space-y-4 flex items-center justify-between gap-6 md:space-y-0">
                      <Link
                        to={`/product/${item?._id}`}
                        className="shrink-0 md:order-1"
                      >
                        <img
                          className="h-20 w-20 dark:hidden"
                          src={item?.image}
                          alt={item?.name}
                        />
                        <img
                          className="hidden h-20 w-20 dark:block"
                          src={item?.image}
                          alt={item?.name}
                        />
                      </Link>
                      <div className="w-full min-w-0 flex-1 md:order-2 md:max-w-md">
                        <Link
                          to={`/product/${item?._id}`}
                          className="text-base font-bold text-gray-900 hover:underline dark:text-white"
                        >
                          {item?.name}
                        </Link>
                      </div>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="text-end md:order-4 md:w-38">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            {item?.qty} * ${(item?.price).toFixed(2)} = ${item?.qty*item?.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* order summary */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <section className="bg-white antialiased dark:bg-gray-900">
                <h2 className="text-md md:text-2xl font-semibold text-gray-900 dark:text-white">
                  Order Summary
                </h2>
                <div className="space-y-4 mt-4 rounded-lg border border-gray-100 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Original price
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          ${cart.itemsPrice}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Shipping Price
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          ${cart.shippingPrice}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Tax
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          ${cart.taxPrice}
                        </dd>
                      </dl>
                    </div>
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        ${cart.totalPrice}
                      </dd>
                    </dl>
                  </div>
                  <button
                    onClick={placeOrderHandler}
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {isLoading ? SPINNERS.SMALL : "Place Order"}
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlaceOrderPage;
