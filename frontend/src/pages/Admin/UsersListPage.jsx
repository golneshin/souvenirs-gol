import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Message from "../../components/Message";
import { BUTTONS, SPINNERS } from "../../assets/SVGs";
import { dateFormatNoClock } from "../../utils/dateFormat";
import {
  useGetAllUsersQuery,
  useRemoveUserMutation,
} from "../../slices/usersApiSlice";

const UsersListPage = () => {
  const {
    data: users,
    refetch,
    isLoading: loadingUsers,
    error: errorUsers,
  } = useGetAllUsersQuery();

  const [removeUser, { isLoading: loadingRemoveUser }] =
    useRemoveUserMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const removeUserHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await removeUser(userId);
        refetch();
        toast.success("User removed successfuly");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (loadingRemoveUser) {
    return (
      <div className="flex justify-center items-center m-40 ">
        {SPINNERS.BIG}
      </div>
    );
  }

  return (
    <div className="py-4 bg-gray-100 dark:bg-gray-800">
      <form className="mx-auto justify-center items-center border border-gray-500 bg-white antialiased dark:bg-gray-900 max-w-4xl shadow overflow-hidden sm:rounded-lg">
        <div className="flex  justify-between px-4 py-5 sm:px-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-300">
              Users List
            </h3>
            <p className="mt-1 max-w-4xl text-sm text-gray-500">
              Details and informations about users.
            </p>
          </div>
          <div>
            <button
              className="flex w-full mb-2 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={createProductHandler}
            >
              Create User
            </button>
          </div>
        </div>
        <div>
          <dl>
            <div className="bg-gray-50 dark:bg-gray-500 px-4 py-5 sm:grid sm:grid-cols-10 sm:gap-4 sm:px-6 border-b-gray-700 border-b-2">
              <dt className="text-sm font-bold sm:col-span-3 flex justify-center text-gray-600 dark:text-gray-900">
                ID & User Info
              </dt>
              <dt className="text-sm font-bold sm:col-span-2 flex justify-start text-gray-400 dark:text-gray-200">
                Email
              </dt>
              <dt className="text-sm font-bold sm:col-span-1 flex justify-start text-gray-600 dark:text-gray-900">
                Name
              </dt>
              <dt className="text-sm font-bold sm:col-span-1 flex justify-center text-gray-400 dark:text-gray-200">
                isAdmin
              </dt>
              <dt className="text-sm font-bold sm:col-span-1 flex justify-center text-gray-600 dark:text-gray-900">
                Created
              </dt>
              <dt className="text-sm font-bold sm:col-span-1 flex justify-center text-gray-600 dark:text-gray-900">
                Updated
              </dt>
              <dt className="text-sm font-bold sm:col-span-1 flex justify-center text-gray-400 dark:text-gray-200"></dt>
            </div>
            {loadingUsers ? (
              <div className="flex justify-center py-2">{SPINNERS.BIG}</div>
            ) : errorUsers ? (
              <Message>{error}</Message>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className="bg-gray-50 dark:bg-gray-700 px-4 py-2 sm:grid sm:grid-cols-10 sm:gap-4 sm:px-2"
                >
                  {/* ID */}
                  <dt className="text-xs font-bold underline sm:col-span-3 flex justify-center items-center text-blue-500 dark:text-blue-400">
                    <Link
                      to={`/admin/user/${user._id}`}
                      className="hover:underline"
                    >
                      {user._id}
                    </Link>
                  </dt>
                  {/* email */}
                  <dt className="text-xs  sm:col-span-2 flex justify-start items-center text-gray-500 dark:text-gray-200">
                    {user.email}
                  </dt>
                  {/* name */}
                  <dt className="text-xs font-bold sm:col-span-1 flex justify-start items-center text-gray-500 dark:text-gray-400">
                    {user.name}
                  </dt>
                  {/* isAdmin */}
                  <dt className="text-xs font-bold sm:col-span-1 flex justify-center items-center text-gray-500 dark:text-gray-400">
                    {user.isAdmin ? (
                      <div className="text-green-500">Yes</div>
                    ) : (
                      <div className="text-red-500">No</div>
                    )}
                  </dt>
                  {/* created at */}
                  <dt className="text-xs font-bold  sm:col-span-1 flex justify-center items-center text-gray-500 dark:text-gray-400">
                    {dateFormatNoClock(user.createdAt)}
                  </dt>
                  {/* updated at */}
                  <dt className="text-xs font-bold  sm:col-span-1 flex justify-center items-center text-gray-500 dark:text-gray-400">
                    {dateFormatNoClock(user.updatedAt)}
                  </dt>
                  <dt className="sm:col-span-1 flex gap-4 pr-2 justify-center items-center">
                    <div className="text-xs font-bold text-blue-700 dark:text-blue-400 cursor-pointer hover:underline">
                      <Link to={`/admin/user/${user._id}`}>Edit</Link>
                    </div>
                    <button
                      onClick={() => removeUserHandler(user._id)}
                      className="text-xs font-bold text-red-600 dark:text-red-500 cursor-pointer p-1 hover:bg-gray-500 hover:rounded-lg"
                    >
                      {BUTTONS.TRASH}
                    </button>
                  </dt>
                </div>
              ))
            )}
          </dl>
        </div>
      </form>
    </div>
  );
};

export default UsersListPage;
