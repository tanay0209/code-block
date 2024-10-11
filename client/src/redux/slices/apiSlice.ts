
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        credentials: "include"
    }),
    endpoints: (builder) => ({
        saveCode: builder.mutation<{ id: string }, { code: ICodeStructure, title: string }>({
            query: (code) => ({
                url: "/compiler/save",
                method: "POST",
                body: code
            })
        }),
        getCode: builder.mutation<{ code: ICodeStructure }, void>({
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
        })
    })
})

export const {
    useSaveCodeMutation,
    useGetCodeMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetUserDetailsQuery,
    useSignupMutation
} = api