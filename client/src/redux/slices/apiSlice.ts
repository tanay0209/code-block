
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "https://code-block-anfg.onrender.com",
        credentials: "include"
    }),
    tagTypes: ["user-codes", "all-codes"],
    endpoints: (builder) => ({
        saveCode: builder.mutation<{ id: string }, { code: ICodeStructure, title: string }>({
            query: (code) => ({
                url: "/compiler/save",
                method: "POST",
                body: code
            }),
            invalidatesTags: ["user-codes", "all-codes"]
        }),
        getCode: builder.mutation<{ code: ICodeStructure, isOwner: boolean }, string>({
            query: (id) => ({
                url: `/compiler/get-code/${id}`,
                method: "GET"
            })
        }),
        login: builder.mutation<IUserInfo, ILoginCredentials>({
            query: (body) => ({
                url: "/user/login",
                method: "POST",
                body: body,
                credentials: "include"
            })
        }),
        signup: builder.mutation<IUserInfo, ISignupCredentials>({
            query: (body) => ({
                url: "/user/signup",
                method: "POST",
                body: body
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/user/logout",
                method: "GET"
            })
        }),
        getUserDetails: builder.query<IUserInfo, void>({
            query: () => ({
                url: "/user/user-details",
                cache: "no-store"
            })
        }),
        getUserCode: builder.query<{ codes: Array<{ title: string, _id: string }> }, void>({
            query: () => "/user/my-codes",
            providesTags: ["user-codes"]
        }),
        deleteCode: builder.mutation<void, string>({
            query: (id) => ({
                url: `/compiler/delete-code/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["user-codes", "all-codes"]
        }),
        editCode: builder.mutation<void, { id: string, body: ICodeStructure }>({
            query: ({ id, body }) => ({
                url: `/compiler/update-code/${id}`,
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["user-codes"]
        }),
        getAllCodes: builder.query<{ codes: Array<{ title: string, username: string, _id: string }> }, void>({
            query: () => ({
                url: "/compiler/get-all-codes",
                cache: "no-store"
            }),
            providesTags: ["all-codes"]
        })
    })
})

export const {
    useSaveCodeMutation,
    useGetCodeMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetUserDetailsQuery,
    useSignupMutation,
    useGetUserCodeQuery,
    useDeleteCodeMutation,
    useEditCodeMutation,
    useGetAllCodesQuery
} = api