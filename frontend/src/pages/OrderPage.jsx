import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice";

import { SPINNERS } from "../assets/SVGs";
import { useEffect } from "react";
import { dateFormat } from "../utils/dateFormat";

const OrderPage = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  console.log("Order", order);

  const { userInfo } = useSelector((state) => state.auth);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();

  //   toast.success("Order is paid");
  // }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Changed to delivered successfuly");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center m-40 ">
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
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className=" mx-auto text-xl text-gray-800 border border-gray-500 rounded-lg p-2 font-semibold dark:text-gray-400 sm:text-3xl">
            Order: {order._id}
          </h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {/* order detail */}
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <h2 className="text-md md:text-2xl font-semibold text-gray-900 dark:text-white">
                Shipping
              </h2>
              <div className="rounded-lg my-4 border gap-8 border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex">
                  <span className=" text-gray-700 dark:text-gray-400">
                    Name:
                  </span>
                  <span className="ml-2 font-bold">{order?.user?.name}</span>
                </div>
                <div className="flex">
                  <span className=" text-gray-700 dark:text-gray-400">
                    Email:
                  </span>
                  <span className="ml-2 font-bold">{order?.user?.email}</span>
                </div>
                <div className="flex">
                  <span className=" text-gray-700 dark:text-gray-400">
                    Address:
                  </span>
                  <span className="ml-2 font-bold">
                    {order?.shippingAddress?.address},{" "}
                    {order?.shippingAddress?.city},{" "}
                    {order?.shippingAddress?.country}
                  </span>
                </div>
                {order?.isDelivered ? (
                  <div className="rounded-lg font-bold my-4 border text-gray-600 border-gray-200 bg-green-200 p-4 shadow-sm dark:border-gray-700">
                    Delivered on {dateFormat(order.deliveredAt)}
                  </div>
                ) : (
                  <div className="rounded-lg font-bold my-4 border text-gray-600 border-gray-200 bg-red-200 p-4 shadow-sm dark:border-gray-700">
                    Not Delivered
                  </div>
                )}
              </div>
              <h2 className="text-md md:text-2xl font-semibold text-gray-900 dark:text-white">
                Payment Method
              </h2>
              <div className="rounded-lg my-4 border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="flex">
                  <span className=" text-gray-700 dark:text-gray-400">
                    Method:
                  </span>
                  <span className="ml-2 font-bold">{order?.paymentMethod}</span>
                </div>
                {order?.isPaid ? (
                  <div className="rounded-lg font-bold my-4 border text-gray-600 border-gray-200 bg-green-200 p-4 shadow-sm dark:border-gray-700">
                    Paid on {dateFormat(order.paidAt)}
                  </div>
                ) : (
                  <div className="rounded-lg font-bold my-4 border text-gray-600 border-gray-200 bg-red-200 p-4 shadow-sm dark:border-gray-700">
                    Not Paid
                  </div>
                )}
              </div>
              <h2 className="text-md md:text-2xl font-semibold text-gray-900 dark:text-white">
                Items
              </h2>
              <div className="rounded-lg my-4 border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                {order.orderItems.map((item) => (
                  <div
                    key={item?._id}
                    className="flex my-4 rounded-lg bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-4"
                  >
                    <div className="space-y-2 flex items-center justify-between gap-6 md:space-y-0">
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
                            {item?.qty} * ${(item?.price).toFixed(2)} = $
                            {item?.qty * item?.price}
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
                          ${order.itemsPrice}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Shipping Price
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          ${order.shippingPrice}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Tax
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          ${order.taxPrice}
                        </dd>
                      </dl>
                    </div>
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        ${order.totalPrice}
                      </dd>
                    </dl>
                  </div>
                  {!order.isPaid && (
                    <section>
                      {loadingPay && SPINNERS.SMALL}
                      {isPending ? (
                        SPINNERS.SMALL
                      ) : (
                        <>
                          {/* <button
                            onClick={onApproveTest}
                            className="flex w-full mb-2 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          >
                            Test Pay Order
                          </button> */}
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </>
                      )}
                    </section>
                  )}
                  
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <div>
                        <button
                          className="flex w-full mb-2 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          onClick={deliverHandler}
                        >
                          {loadingDeliver ? SPINNERS.SMALL : 'Mark As Delivered'}
                        </button>
                      </div>
                    )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderPage;
