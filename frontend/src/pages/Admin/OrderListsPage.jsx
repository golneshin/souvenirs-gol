import { Link } from "react-router-dom"
import { SPINNERS } from "../../assets/SVGs"
import { useGetOrdersQuery } from "../../slices/ordersApiSlice"
import { dateFormatNoClock } from "../../utils/dateFormat"

const OrdersListPage = () => {
  const { data: ordersList, isLoading, error } = useGetOrdersQuery()

  if (error) {
    return (
      <div className="alert alert-primary" role="alert">
        {error?.data?.message || error.error}
      </div>
    )
  };

  return (
    <div className="py-4 bg-gray-100 dark:bg-gray-800">
      <form
        className="mx-auto justify-center items-center border border-gray-500 bg-white antialiased dark:bg-gray-900 max-w-4xl shadow overflow-hidden sm:rounded-lg"
      >
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-300">
            Orders List
          </h3>
          <p className="mt-1 max-w-4xl text-sm text-gray-500">
            Details and informations about users orders.
          </p>
        </div>
        <div>
          <dl>
            <div className="bg-gray-50 dark:bg-gray-500 px-4 py-5 sm:grid sm:grid-cols-10 sm:gap-4 sm:px-6 border-b-gray-700 border-b-2">
              <dt className="text-sm font-bold sm:col-span-3 flex justify-center text-gray-500 dark:text-gray-300">
                ID & Order Details
              </dt>
              <dt className="text-sm font-bold sm:col-span-2 flex justify-center text-gray-500 dark:text-gray-300">
                Date
              </dt>
              <dt className="text-sm font-bold sm:col-span-1 flex justify-center text-gray-500 dark:text-gray-300">
                TOTAL
              </dt>
              <dt className="text-sm font-bold sm:col-span-2 flex justify-center text-gray-500 dark:text-gray-300">
                PAID
              </dt>
              <dt className="text-sm font-bold sm:col-span-2 flex justify-center text-gray-500 dark:text-gray-300">
                DELIVERED
              </dt>
            </div>
            {isLoading ? (
              <div className="flex justify-center py-2">{SPINNERS.BIG}</div>
            ) : (
              ordersList.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-50 dark:bg-gray-700 px-4 py-2 sm:grid sm:grid-cols-10 sm:gap-4 sm:px-2"
                >
                  <dt className="font-bold dark:bg-gray-800 sm:col-span-3 flex justify-center text-sm text-gray-500 dark:text-gray-300">
                    <Link
                      to={`/order/${order._id}`}
                      className="hover:underline"
                    >
                      {order._id}
                    </Link>
                  </dt>
                  <dt className="text-sm font-bold dark:bg-gray-600 sm:col-span-2 flex justify-center text-gray-500 dark:text-gray-300">
                    {dateFormatNoClock(order.createdAt)}
                  </dt>
                  <dt className="text-sm font-bold dark:bg-gray-800 sm:col-span-1 flex justify-center text-gray-500 dark:text-gray-300">
                    ${order.totalPrice}
                  </dt>
                  <dt className="text-sm font-bold  dark:bg-gray-600 sm:col-span-2 flex justify-center text-gray-500 dark:text-gray-300">
                    {order.isPaid ? (
                      <div className="text-green-500">{dateFormatNoClock(order.paidAt)}</div>
                    ) : (
                      <div className="text-red-500">No</div>
                    )}
                  </dt>
                  <dt className="text-sm font-bold  dark:bg-gray-800 sm:col-span-2 flex justify-center text-gray-500 dark:text-gray-300">
                    {order.isDelivered ? (
                      <div className="text-green-600">{dateFormatNoClock(order.deliveredAt)}</div>
                    ) : (
                      <div className="text-red-600">No</div>
                    )}
                  </dt>
                </div>
              ))
            )}
          </dl>
        </div>
      </form>
    </div>
  )
}

export default OrdersListPage
