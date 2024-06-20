import { Link, NavLink } from "react-router-dom"
import { BsHandbag } from "react-icons/bs";
import { TbPhoneCall } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";

const Header = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-green-900">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
              {/* Logo */}
              <Link to="https://flowbite.com" className="flex flex-row items-center space-x-3 rtl:space-x-reverse">
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
                <div className="flex items-center gap-1">
                  <BsHandbag className="text-2xl" />
                  <Link to="#" className="text-sm  text-gray-500 dark:text-white hover:underline">
                    Cart
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  <IoPersonOutline className="text-2xl" />
                  <Link to="#" className="text-sm  text-blue-900 dark:text-blue-400 hover:underline">
                    Login
                  </Link>
                </div>
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
