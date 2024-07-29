import { BsHandbag } from "react-icons/bs";
import { TbPhoneCall } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
// internal imports
import SearchBox from "./SearchBox";
import { BUTTONS, SPINNERS } from "../assets/SVGs";
import { removeCredentials } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logout, { isLoading: loadingLogOut }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);

  const dropdownRef = useRef(null);
  const adminDropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const adminToggleDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };
  const adminHandleClickOutside = (event) => {
    if (
      adminDropdownRef.current &&
      !adminDropdownRef.current.contains(event.target)
    ) {
      setAdminDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", adminHandleClickOutside);
    return () => {
      document.removeEventListener("mousedown", adminHandleClickOutside);
    };
  }, []);

  const logOutHandler = async () => {
    try {
      await logout().unwrap(); // The unwrap method is used to handle the resolved data or throw an error if the promise is rejected.
      dispatch(removeCredentials());
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-green-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-row items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Souvenirs Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Souvenirs
            </span>
          </Link>
          {/* phone & cart & login */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {/* phone */}
            <div className="flex items-center gap-1">
              <TbPhoneCall className="text-2xl" />
              <Link
                to="tel:+989305338961"
                className="text-sm text-gray-500 dark:text-white hover:underline"
              >
                (+98) 930-533-8961
              </Link>
            </div>
            {/* cart */}
            <Link
              to="/cart"
              className="flex items-center px-2 gap-1 text-sm font-medium text-center text-white rounded-lg hover:underline focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <div className="relative inline-flex items-center p-1">
                <BsHandbag className="text-2xl" />
                {cartItems.length > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </div>
                )}
              </div>
              Cart
            </Link>
            {/* login & dropdown */}
            {userInfo ? (
              <div
                className="relative inline-block text-left"
                ref={dropdownRef}
              >
                <div>
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:underline`}
                    id="menu-button"
                    aria-expanded={dropdownVisible}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                    {userInfo.name}
                    {BUTTONS.DROPDOWN}
                  </button>
                </div>

                {dropdownVisible && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-46 origin-top-right border rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      <Link
                        to="/profile"
                        className="block hover:underline px-4 py-2 text-sm text-gray-700 dark:text-white"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logOutHandler}
                        className="block hover:underline w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-white"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-3"
                      >
                        {loadingLogOut ? SPINNERS.SMALL : "Log Out"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 text-sm text-blue-900 dark:text-blue-400 hover:underline"
              >
                <IoPersonOutline className="text-2xl" />
                Log In
              </Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <div
                className="relative inline-block text-left"
                ref={adminDropdownRef}
              >
                <div>
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:underline`}
                    id="menu-button"
                    aria-expanded={adminDropdownVisible}
                    aria-haspopup="true"
                    onClick={adminToggleDropdown}
                  >
                    Admin Panel
                    {BUTTONS.DROPDOWN}
                  </button>
                </div>

                {adminDropdownVisible && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-46 origin-top-right border rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      <Link
                        to="/admin/productslist"
                        className="block hover:underline px-4 py-2 text-sm text-gray-700 dark:text-white"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        Products
                      </Link>
                      <Link
                        to="/admin/userslist"
                        className="block hover:underline px-4 py-2 text-sm text-gray-700 dark:text-white"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        Users
                      </Link>
                      <Link
                        to="/admin/orderslist"
                        className="block hover:underline px-4 py-2 text-sm text-gray-700 dark:text-white"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        Orders
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        {/* nav bar */}
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-between">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <NavLink
                  to="#"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Company
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Team
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Features
                </NavLink>
              </li>
            </ul>
            {/* SEARCH BOX */}
            <SearchBox />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
