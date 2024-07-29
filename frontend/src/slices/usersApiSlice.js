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
    }),
    register: builder.mutation({
      query: (data) => ({
          url: `${USERS_URL}`,
          method: 'POST',
          body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    logout: builder.mutation({
      query: () => ({
          url: `${USERS_URL}/logout`,
          method: 'POST',
      }),
      keepUnusedDataFor: 5,
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      })
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    removeUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      })
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data
      })
    }),
  })
});

export const { 
  useLoginMutation, 
  useLogoutMutation, 
  useRegisterMutation,
  useProfileMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useRemoveUserMutation,
  useUpdateUserMutation,
} = usersApiSlice
