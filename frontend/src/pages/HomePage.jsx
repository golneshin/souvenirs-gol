import { useCallback, useEffect, useState } from "react"
import axios from 'axios'

import Product from "../components/Product"

const HomePage = () => {
  const [products, setProducts] = useState([])

  const getProductsAPI =useCallback(async () => {
    try {
      const {data} = await axios.get('/api/products')
      setProducts(data)
      
    } catch (error) {
      console.error(error)
    }
  },[])

  useEffect(() => {
    getProductsAPI()
  }, [getProductsAPI])
  
  return (
    <div>
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
    </div>
  )
}

export default HomePage
