import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL
      }),
      keepUnusedDataFor: 5
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`
      }),
      keepUnusedDataFor: 5
    })
  })
});

export const { useGetAllProductsQuery, useGetProductQuery } = productsApiSlice;