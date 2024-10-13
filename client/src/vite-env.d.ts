/// <reference types="vite/client" />

interface IAppSliceState {
    currentUser: {
        username?: string,
        email?: string,
        picture?: string,
        codes?: ICodeStructure[]
    },
    isLoggedIn: boolean,
    windowWidth: number
}

interface ICodeStructure {
    html: string,
    css: string,
    javascript: string
}

interface ICompilerSliceState {
    code: ICodeStructure
    currentLanguage: "html" | "css" | "javascript",
    isOwner: boolean
}

interface IUserInfo {
    username: string,
    email: string,
    picture: string,
    codes?: ICodeStructure[]
}

interface ILoginCredentials {
    userId: string,
    password: string
}
interface ISignupCredentials {
    username: string,
    email: string
    password: string
}