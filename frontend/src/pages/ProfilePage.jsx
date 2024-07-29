import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SPINNERS } from "../assets/SVGs";
import { useProfileMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { dateFormat } from "../utils/dateFormat";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [
    profile,
    { isLoading: loadingUpdateProfile, error: errorUpdateProfile },
  ] = useProfileMutation();

  const {
    data: myOrders,
    isLoading: loadingMyOrders,
    error: errorMyOrders,
  } = useGetMyOrdersQuery();

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const updateProfileSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      toast.error("Passwords don’t match");
      return;
    }

    try {
      const res = await profile({ name, email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      console.log(await userInfo);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  if (errorUpdateProfile) {
    return (
      <div className="alert alert-primary" role="alert">
        {error?.data?.message || error.error}
      </div>
    );
  }

  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-8 bg-gray-100 dark:bg-gray-800">
      <div className="sm:col-span-1">
        <form
          onSubmit={updateProfileSubmit}
          className="  mx-auto my-4 justify-center items-center border border-gray-500 bg-white antialiased dark:bg-gray-900 max-w-2xl shadow overflow-hidden sm:rounded-lg"
        >
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
                  placeholder={userInfo.name}
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
                  placeholder={userInfo.email}
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
            </dl>
            <div className="px-8">
              <button
                type="submit"
                className="w-full m-2 mx-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loadingUpdateProfile ? SPINNERS.SMALL : "Update Profile"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="sm:col-span-2">
        <form className="mx-auto my-4 justify-center items-center border border-gray-500 bg-white antialiased dark:bg-gray-900 max-w-3xl shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 w-full">
            <h3 className="flex text-lg leading-6 font-medium text-gray-900 dark:text-gray-300">
              {!userInfo.isAdmin ? (
                <span className="mr-1">Your</span>
              ) : (
                <div className="font-bold mr-1">{userInfo.name}</div>
              )}
              Orders List
            </h3>

            <p className="flex w-full mt-1 text-sm text-gray-500">
              <span className="mr-1">Details and information about</span>
              {!userInfo.isAdmin ? (
                <span className="mr-1">your</span>
              ) : (
                <div className="font-bold mr-1">{userInfo.name}</div>
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
              {loadingMyOrders ? (
                <div className="flex justify-center py-2">{SPINNERS.BIG}</div>
              ) : (
                myOrders.map((order) => (
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

export default ProfilePage;
