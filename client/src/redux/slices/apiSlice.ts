
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { url } from "inspector"

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        credentials: "include"
    }),
    tagTypes: ["user-codes"],
    endpoints: (builder) => ({
        saveCode: builder.mutation<{ id: string }, { code: ICodeStructure, title: string }>({
            query: (code) => ({
                url: "/compiler/save",
                method: "POST",
                body: code
            }),
            invalidatesTags: ["user-codes"]
        }),
        getCode: builder.mutation<{ code: ICodeStructure }, string>({
            query: (id) => ({
                url: `/compiler/get-code/${id}`,
                method: "GET"
            })
        }),
        login: builder.mutation<IUserInfo, ILoginCredentials>({
            query: (body) => ({
                url: "/user/login",
                method: "POST",
                body: body
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
        getUserCode: builder.query<{ codes: Array<{ code: ICodeStructure, title: string, _id: string }> }, void>({
            query: () => "/user/my-codes",
            providesTags: ["user-codes"]
        }),
        deleteCode: builder.mutation<void, string>({
            query: (id) => ({
                url: `/compiler/delete-code/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["user-codes"]
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
    useDeleteCodeMutation
} = api