import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { SPINNERS } from "../../assets/SVGs";
import { toast } from "react-toastify";

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    refetch,
    isLoading: loadingProduct,
    error: errorProduct,
  } = useGetProductQuery(productId);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");

  // Update state variables when `product` changes
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
      setImage(product.image || "");
      setBrand(product.brand || "");
      setCategory(product.category || "");
      setCountInStock(product.countInStock || "");
    }
  }, [product]); // Triggered whenever `product` changes

  const navigate = useNavigate();

  const [
    updateProduct,
    { isLoading: loadingUpdateProduct, error: errorUpdateProduct },
  ] = useUpdateProductMutation();

  const [
    uploadProductImage, 
    { isLoading: loadingUpload }
  ] =useUploadProductImageMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProduct({
        productId,
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
      }).unwrap();
      console.log(res);

      refetch();
      navigate("/admin/productslist");
      toast.success("Product updated successfully.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const loadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    console.log(e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      // Replace backslashes with forward slashes
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (loadingProduct) {
    return (
      <div className="flex justify-center items-center m-40 ">
        {SPINNERS.BIG}
      </div>
    );
  }

  if (errorProduct) {
    return (
      <div className="alert alert-primary" role="alert">
        {errorProduct?.data?.message || errorProduct.error}
      </div>
    );
  }

  if (errorUpdateProduct) {
    return (
      <div className="alert alert-primary" role="alert">
        {errorUpdateProduct?.data?.message || errorUpdateProduct.error}
      </div>
    );
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto lg:py-2">
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 my-1 sm:p-8">
              <h1 className="text-xl mb-4 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Edit Product
              </h1>
              <form
                className="flex flex-col gap-4"
                onSubmit={submitHandler}
                action="#"
              >
                {/* upload image */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Upload Image
                  </label>
                  <div class="flex items-center gap-4 shrink-0">
                    <img
                      id="preview_img"
                      class="h-16 w-16 object-cover rounded-full"
                      src={image}
                      alt="Current Image"
                    />
                    <input
                      name="image"
                      id="image"
                      type="file"
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-violet-50 file:text-violet-700 file:cursor-pointer
                                  hover:file:bg-violet-100 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={loadImageHandler}
                    />
                  </div>
                  {loadingUpload && SPINNERS.SMALL}
                </div>
                {/* Image URL */}
                <div>
                  <label
                    htmlFor="Image URL"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image URL
                  </label>
                  <input
                    name="Image URL"
                    id="Image URL"
                    placeholder={image}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                {/* name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={name}
                    required=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* price */}
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={price}
                    required=""
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                {/* description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    name="description"
                    id="description"
                    placeholder={description}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {/* brand */}
                <div>
                  <label
                    htmlFor="brand"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Brand
                  </label>
                  <input
                    name="brand"
                    id="brand"
                    placeholder={brand}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                {/* category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <input
                    name="category"
                    id="category"
                    placeholder={category}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                {/* countInStock */}
                <div>
                  <label
                    htmlFor="countInStock"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CountInStock
                  </label>
                  <input
                    name="countInStock"
                    id="countInStock"
                    placeholder={countInStock}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loadingUpdateProduct ? SPINNERS.SMALL : "Update Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductEditPage;
