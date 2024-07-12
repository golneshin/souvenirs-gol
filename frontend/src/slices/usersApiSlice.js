import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // this will send the request to the 
    // backend and set the cookie for token.
    login: builder.mutation({
      query: (data) => ({
          url: `${USERS_URL}/login`,
          method: 'POST',
          body: data,
      }),
      keepUnusedDataFor: 5,
    })
  })
});

export const { useLoginMutation } = usersApiSlice
