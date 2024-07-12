import { Link, NavLink } from "react-router-dom"
import { BsHandbag } from "react-icons/bs";
import { TbPhoneCall } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-green-900">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
              {/* Logo */}
              <Link to="/" className="flex flex-row items-center space-x-3 rtl:space-x-reverse">
                  <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Souvenirs Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Souvenirs</span>
              </Link>
              {/* phone & login */}
              <div className="flex items-center space-x-6 rtl:space-x-reverse">
                <div className="flex items-center gap-1">
                  <TbPhoneCall className="text-2xl" />
                  <Link to="tel:+989305338961" className="text-sm  text-gray-500 dark:text-white hover:underline">
                    (+98) 930-533-8961
                  </Link>
                </div>
                <Link to="/cart" className="flex items-center px-2 gap-1 text-sm font-medium text-center text-white rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-green-700 dark:focus:ring-blue-800">
                  <div className="relative inline-flex items-center p-1 ">
                    <BsHandbag className="text-2xl" />
                    {cartItems.length > 0 && 
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </div>}
                  </div>
                    Cart
                </Link>
                <Link to="/login" className=" flex items-center gap-1 text-sm  text-blue-900 dark:text-blue-400 hover:underline">
                  <IoPersonOutline className="text-2xl" />
                  {userInfo ? userInfo.name : 'Login'}
                </Link>
              </div>
          </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
          {/* nav bar */}
          <div className="max-w-screen-xl px-4 py-3 mx-auto">
              <div className="flex items-center">
                  <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                      <li>
                          <NavLink to="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</NavLink>
                      </li>
                      <li>
                          <NavLink to="#" className="text-gray-900 dark:text-white hover:underline">Company</NavLink>
                      </li>
                      <li>
                          <NavLink to="#" className="text-gray-900 dark:text-white hover:underline">Team</NavLink>
                      </li>
                      <li>
                          <NavLink to="#" className="text-gray-900 dark:text-white hover:underline">Features</NavLink>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    </>
  )
}

export default Header
