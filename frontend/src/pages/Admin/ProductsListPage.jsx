import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../../components/Message";

import { BUTTONS, SPINNERS } from "../../assets/SVGs";
import {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useRemoveProductMutation,
} from "../../slices/productsApiSlice";
import Pagination from "../../components/Pagination";

const ProductsListPage = () => {
  const { pageNumber, keyword } = useParams();
  const navigate = useNavigate();

  const {
    data,
    refetch,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useGetAllProductsQuery({ pageNumber, keyword });

  const [
    createProduct,
    { isLoading: loadingCreateProduct, error: errorCreateProduct },
  ] = useCreateProductMutation();

  const [removeProduct, { isLoading: loadingRemoveProduct }] =
    useRemoveProductMutation();

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

  const removeProductHandler = async (productId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await removeProduct(productId);
        refetch();
        toast.success("Product removed successfuly");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const onPageChange = (pageNumber) => {
    // navigate(`/admin/productslist/${pageNumber}`);
    navigate(
      keyword
        ? `/admin/search/${keyword}/productslist/${pageNumber}`
        : `/admin/productslist/${pageNumber}`
    );
  };

  if (loadingCreateProduct || loadingRemoveProduct) {
    return (
      <div className="flex justify-center items-center m-40 ">
        {SPINNERS.BIG}
      </div>
    );
  }

  if (errorCreateProduct) {
    return (
      <div className="alert alert-primary" role="alert">
        {errorCreateProduct?.data?.message || errorCreateProduct.error}
      </div>
    );
  }

  return (
    <div className="py-4 bg-gray-100 dark:bg-gray-800">
      <form className="mx-auto justify-center items-center border border-gray-500 bg-white antialiased dark:bg-gray-900 max-w-4xl shadow overflow-hidden sm:rounded-lg">
        <div className="flex  justify-between px-4 py-5 sm:px-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-300">
              Products List
            </h3>
            <p className="mt-1 max-w-4xl text-sm text-gray-500">
              Details and informations about products.
            </p>
          </div>
          <div>
            <button
              className="flex w-full mb-2 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={createProductHandler}
            >
              Create Product
            </button>
          </div>
        </div>
        <div>
          <dl>
            <div className="bg-gray-50 dark:bg-gray-500 px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6 border-b-gray-700 border-b-2">
              <dt className="text-sm font-bold sm:col-span-3 flex justify-center text-gray-600 dark:text-gray-900">
                ID & Order Details
              </dt>
              <dt className="text-sm font-bold sm:col-span-2 flex justify-center text-gray-400 dark:text-gray-200">
                Name
              </dt>
              <dt className="text-sm font-bold sm:col-span-1 flex justify-center text-gray-600 dark:text-gray-900">
                Price
              </dt>
              <dt className="text-sm font-bold sm:col-span-1 flex justify-center text-gray-400 dark:text-gray-200">
                Category
              </dt>
              <dt className="text-sm font-bold sm:col-span-1 flex justify-center text-gray-600 dark:text-gray-900">
                Brand
              </dt>
              <dt className="text-sm font-bold sm:col-span-1 flex justify-center text-gray-400 dark:text-gray-200"></dt>
            </div>
            {loadingProducts ? (
              <div className="flex justify-center py-2">{SPINNERS.BIG}</div>
            ) : errorProducts ? (
              <Message>{error}</Message>
            ) : (
              data.products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-50 dark:bg-gray-700 px-4 py-2 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-2"
                >
                  <dt className="text-xs font-bold sm:col-span-3 flex justify-center items-center text-gray-500 dark:text-gray-400">
                    <Link
                      to={`/product/${product._id}`}
                      className="hover:underline"
                    >
                      {product._id}
                    </Link>
                  </dt>
                  <dt className="text-xs  sm:col-span-2 flex justify-start items-center text-gray-500 dark:text-gray-200">
                    {product.name}
                  </dt>
                  <dt className="text-xs font-bold sm:col-span-1 flex justify-center items-center text-gray-500 dark:text-gray-400">
                    ${product.price}
                  </dt>
                  <dt className="text-xs sm:col-span-1 flex justify-center items-center text-gray-500 dark:text-gray-200">
                    {product.category}
                  </dt>
                  <dt className="text-xs font-bold  sm:col-span-1 flex justify-start items-center text-gray-500 dark:text-gray-400">
                    {product.brand}
                  </dt>
                  <dt className="sm:col-span-1 flex gap-4 pr-2 justify-center items-center">
                    <div className="text-xs font-bold text-blue-700 dark:text-blue-400 cursor-pointer hover:underline">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        Edit
                      </Link>
                    </div>
                    <button
                      onClick={() => removeProductHandler(product._id)}
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
      {loadingProducts ? (
        SPINNERS.BIG
      ) : (
        <div className="my-2">
          <Pagination
            currentPage={data?.page}
            totalPages={data?.pages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsListPage;
