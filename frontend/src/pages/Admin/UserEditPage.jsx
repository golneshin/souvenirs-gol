import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { useGetOrderByUserIdQuery } from "../../slices/ordersApiSlice";
import { dateFormat } from "../../utils/dateFormat";
import { useGetUserByIdQuery } from "../../slices/usersApiSlice";
import { SPINNERS } from "../../assets/SVGs";

const UserEditPage = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleToggleChange = () => {
    setIsAdmin(!isAdmin);
  };

  const { data: user, isLoading: loadingUser } = useGetUserByIdQuery(userId);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  console.log(user);

  const [updateUser, { isLoading: loadingUpdateUser, error: errorUpdateUser }] =
    useUpdateUserMutation(userId);

  const {
    data: userOrders,
    isLoading: loadingUserOrders,
    error: errorUserOrders,
  } = useGetOrderByUserIdQuery(userId);

  const updateUserSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      toast.error("Passwords don’t match");
      return;
    }

    try {
      await updateUser({ name, email, password, isAdmin, userId }).unwrap();

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  if (errorUpdateUser) {
    return (
      <div className="alert alert-primary" role="alert">
        {errorUpdateUser?.data?.message || errorUpdateUser.error}
      </div>
    );
  }

  if (loadingUser) {
    return SPINNERS.BIG;
  }

  if (errorUserOrders) {
    return (
      <div className="alert alert-primary" role="alert">
        {errorUserOrders?.data?.message || errorUserOrders.error}
      </div>
    );
  }

  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 bg-gray-100 dark:bg-gray-800">
      <div className="sm:col-span-1">
        <form
          onSubmit={updateUserSubmit}
          className="  mx-auto my-4 justify-center items-center border border-gray-500 bg-white antialiased dark:bg-gray-900 max-w-2xl shadow overflow-hidden sm:rounded-lg"
        >
          {loadingUser && SPINNERS.BIG}
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-300">
              Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Details and informations about you.
            </p>
          </div>
          <div>
            <dl>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-300">
                  Full name
                </dt>
                <input
                  name="name"
                  id="name"
                  className="sm:col-span-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={user?.name}
                  required=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="bg-white antialiased dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-300">
                  Email address
                </dt>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="sm:col-span-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={user?.email}
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className=" flex items-center text-sm font-medium text-gray-500 dark:text-gray-300">
                  Password
                </dt>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="sm:col-span-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="bg-white antialiased dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-300">
                  Confirm Password
                </dt>
                <input
                  type="password"
                  name="confirm Password"
                  id="confirm Password"
                  placeholder="••••••••"
                  className="sm:col-span-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </div>
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-300">
                  Admin
                </dt>
                <label className="inline-flex border-gray-100 items-center justify-center">
                  <input
                    type="checkbox"
                    className="sr-only peer border-2 border-gray-100"
                    checked={isAdmin}
                    onChange={handleToggleChange}
                  />
                  <div className="relative cursor-pointer border-blue-700 border-2 flex items-center w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {isAdmin ? "Yes" : "No"}
                  </span>
                </label>
              </div>
            </dl>
            <div className="px-8">
              <button
                type="submit"
                className="w-full m-2 mx-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loadingUpdateUser ? SPINNERS.SMALL : "Update Profile"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="sm:col-span-2">
        <form className="mx-auto my-4 justify-center items-center border border-gray-500 bg-white antialiased dark:bg-gray-900 max-w-3xl shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 w-full">
            <h3 className="flex text-lg leading-6 font-medium text-gray-900 dark:text-gray-300">
              {!user?.isAdmin ? (
                <span className="mr-1">Your</span>
              ) : (
                <div className="font-bold mr-1">{user?.name}</div>
              )}
              Orders List
            </h3>

            <p className="flex w-full mt-1 text-sm text-gray-500">
              <span className="mr-1">Details and information about</span>
              {!user.isAdmin ? (
                <span className="mr-1">your</span>
              ) : (
                <div className="font-bold mr-1">{user.name}</div>
              )}
              orders.
            </p>
          </div>
          <div>
            <dl>
              <div className="bg-gray-200 dark:bg-gray-500 px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6">
                <dt className="font-bold sm:col-span-3 flex justify-center text-sm text-gray-500 dark:text-gray-300">
                  ID
                </dt>
                <dt className="text-sm sm:col-span-3 font-bold flex justify-center text-gray-500 dark:text-gray-300">
                  Date
                </dt>
                <dt className="text-sm sm:col-span-1 font-bold flex justify-center text-gray-500 dark:text-gray-300">
                  TOTAL
                </dt>
                <dt className="text-sm sm:col-span-1 font-bold flex justify-center text-gray-500 dark:text-gray-300">
                  PAID
                </dt>
                <dt className="text-sm sm:col-span-1 font-bold flex justify-center text-gray-500 dark:text-gray-300">
                  DELIVERED
                </dt>
              </div>
              {loadingUserOrders ? (
                <div className="flex justify-center py-2">{SPINNERS.BIG}</div>
              ) : (
                userOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6"
                  >
                    <dt className="font-bold sm:col-span-3 flex justify-center text-sm text-gray-500 dark:text-gray-300">
                      <Link
                        to={`/order/${order._id}`}
                        className="hover:underline"
                      >
                        {order._id}
                      </Link>
                    </dt>
                    <dt className="text-sm sm:col-span-3 font-bold flex justify-center text-gray-500 dark:text-gray-300">
                      {dateFormat(order.createdAt)}
                    </dt>
                    <dt className="text-sm sm:col-span-1 font-bold flex justify-center text-gray-500 dark:text-gray-300">
                      ${order.totalPrice}
                    </dt>
                    <dt className="text-sm sm:col-span-1 font-bold flex justify-center text-gray-500 dark:text-gray-300">
                      {order.isPaid ? (
                        <div className="text-green-600">
                          {dateFormat(order.paidAt)}
                        </div>
                      ) : (
                        <div className="text-red-600">No</div>
                      )}
                    </dt>
                    <dt className="text-sm sm:col-span-1 font-bold flex justify-center text-gray-500 dark:text-gray-300">
                      {order.isDelivered ? (
                        <div className="text-green-600">
                          {dateFormat(order.deliveredAt)}
                        </div>
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
    </div>
  );
};

export default UserEditPage;
