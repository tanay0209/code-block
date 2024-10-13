import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

function CodeView() {
    const code = useSelector((state: RootState) => state.compilerSlice.code)
    const combinedCode = `
        <html">
            <style>${code.css}</style>
            <body>
                ${code.html}
                </body>
                <script>
                ${code.javascript}
            </script>
        </html>
    `
    const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(combinedCode)}`
    return (
        <div className='w-full bg-white h-full sm:h-[calc(100dvh-60px)]'>
            <iframe title='Compiled code' className='w-full h-full' src={iframeCode}></iframe>
        </div>
    )
}

export default CodeView