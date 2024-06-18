import products from "../products"
import Product from "../components/Product"

const HomePage = () => {
  return (
    <div>
      <div className="justify-center">
        <h1 className="flex justify-center text-gray-500 py-4 font-bold text-5xl">
          Latest Products
        </h1>
      </div>
      <div className="flex flex-wrap justify-center my-6">
        {
          products.map((product) => (
            <div className="p-2">
              <Product key={product._id} product={product}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default HomePage
