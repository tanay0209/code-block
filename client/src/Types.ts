
export type CompilerSliceStateType = {
    code: {
        html: string,
        css: string,
        javascript: string,
    }
    currentLanguage: "html" | "css" | "javascript",
}