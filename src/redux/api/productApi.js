import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    latestProducts: builder.query({
      query: () => "latest",
      providesTags: ["products"],
    }),
    allProducts: builder.query({
      query: (id) => `?id=${id}`,
      providesTags: ["products"],
    }),
    categories: builder.query({
      query: () => `categories`,
      providesTags: ["products"],
    }),
    searchProducts: builder.query({
      query: ({ price, search, sort, category, page }) => {
        let base = `search?search=${search}&page=${page} `;

        if (price) base += `&price=${price}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;
        // if(search) base += `&search=${search}`;

        return base;
      },
      providesTags: ["products"],
    }),
    productDetails: builder.query({
      query: (id) => id,
      providesTags: ["products"],
    }),
    newProduct: builder.mutation({
      query: ({ formData, id }) => ({
        url: `?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ formData, userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
