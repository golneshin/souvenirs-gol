import Product from "../components/Product"
import { useGetAllProductsQuery } from "../slices/productsApiSlice"
import { SPINNERS } from "../assets/SVGs"

const HomePage = () => {
  // instead of using useState, useCallback, useEffect and try-catch block:
  // now we just use the hook created by RTK Query.
  const {data: products, isLoading, error} = useGetAllProductsQuery({})
  
  return (
    <div>
      {isLoading 
      ?(
      <div className="flex justify-center items-center m-40 ">
        {SPINNERS.BIG}
      </div>
      ):( 
      error
      )?(
      <div class="alert alert-primary" role="alert">
        {error?.data?.message || error.error}
      </div>
      ):(
      <>
        <div className="justify-center">
          <h1 className="flex justify-center text-gray-300 py-4 font-bold text-5xl">
            Latest Products
          </h1>
        </div>
        <div className="flex flex-wrap justify-center my-6">
          {
            products.map((product) => (
              <div key={product._id} className="p-4">
                <Product product={product}/>
              </div>
            ))
          }
        </div>
      </>
      )}
    </div>
  )
}

export default HomePage
