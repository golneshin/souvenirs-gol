import { useNavigate, useParams } from "react-router-dom";
import { SPINNERS } from "../assets/SVGs";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import {
  useGetAllProductsQuery,
  useGetTopProductsQuery,
} from "../slices/productsApiSlice";
import ProductCarousel from "../components/ProductsCarousel"; // Corrected import statement

const HomePage = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetAllProductsQuery({
    pageNumber,
    keyword,
  });

  const { data: topProducts, isLoading: loadingTopProducts } =
    useGetTopProductsQuery();

  console.log(topProducts);

  const navigate = useNavigate();

  const onPageChange = (pageNumber) => {
    navigate(
      keyword ? `/search/${keyword}/page/${pageNumber}` : `/page/${pageNumber}`
    );
  };

  return (
    <div>
      <>
        {/* Carousel */}
        {!keyword && (
          <div className="px-14">
            {loadingTopProducts ? (
              <div className="flex justify-center items-center m-40 ">
                {SPINNERS.BIG}
              </div>
            ) : (
              <ProductCarousel products={topProducts?.slice(0, 5)} />
            )}
          </div>
        )}
      </>
      {isLoading ? (
        <div className="flex justify-center items-center m-40 ">
          {SPINNERS.BIG}
        </div>
      ) : error ? (
        <div className="alert alert-primary" role="alert">
          {error?.data?.message || error.error}
        </div>
      ) : (
        <>
          {/* Latest products */}
          <div>
            <div className="justify-center">
              <h1 className="flex justify-center text-gray-300 py-4 font-bold text-5xl">
                Latest Products
              </h1>
            </div>
            <div className="flex flex-wrap justify-center my-6">
              {data.products.map((product) => (
                <div key={product._id} className="p-4">
                  <Product product={product} />
                </div>
              ))}
            </div>
            <div className="my-2">
              <Pagination
                currentPage={data?.page}
                totalPages={data?.pages}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
