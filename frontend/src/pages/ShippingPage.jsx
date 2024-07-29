import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress } from "../slices/cartSlice"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [ address, setAddress ] = useState(shippingAddress?.address || '')
  const [ city, setCity ] = useState(shippingAddress?.city || '')
  const [ postalCode, setPostalCode ] = useState(shippingAddress?.postalCode || '')
  const [ country, setCountry ] = useState(shippingAddress?.country || '')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({
      address,
      city,
      postalCode,
      country,
    }))
    navigate('/payment')
  };

  return (
    <>
      <CheckoutSteps shipStep />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0">
          {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
              SOUVENIRS    
          </a> */}
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 my-1 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Shipping
              </h1>
              
              <form className="space-y-2 md:space-y-3" onSubmit={submitHandler} action='#'>
                {/* address */}
                <div>
                  <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Address
                  </label>
                  <input 
                    name="address" id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="your address" 
                    required=""
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                {/* city */}
                <div>
                  <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  City
                  </label>
                  <input 
                    name="city" id="city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="city" 
                    required=""
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                {/* postalCode */}
                <div>
                  <label htmlFor="postalCode" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Postal Code
                  </label>
                  <input 
                    name="postalCode" 
                    id="postalCode"
                    placeholder="postal code"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required=""
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                {/* country */}
                <div>
                  <label htmlFor="country" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Country
                  </label>
                  <input 
                    name="country" 
                    id="country"
                    placeholder="country"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required=""
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                {/* Remember me & Forgot password */}
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <Link to="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                </div> */}
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Proceed to Payment
                </button>
                {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Have an account already?{' '} 
                  <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login
                  </Link>
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShippingPage
