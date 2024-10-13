import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { solarizedDarkInit } from '@uiw/codemirror-theme-solarized';
import { loadLanguage, } from '@uiw/codemirror-extensions-langs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateCode } from '@/redux/slices/compilerSlice';



function CodeEditor() {
    const currentLanguage = useSelector((state: RootState) => state.compilerSlice.currentLanguage)
    const code = useSelector((state: RootState) => state.compilerSlice.code)
    const dispatch = useDispatch()

    const onChange = React.useCallback((value: string) => {
        dispatch(updateCode(value))
    }, [dispatch]);


    return <CodeMirror
        value={code[currentLanguage]}
        className='code-editor [&>.cm-editor]:text-[10px] md:[&>.cm-editor]:text-[12px]'
        height="calc(100vh - 60px - 50px)"
        extensions={[loadLanguage(currentLanguage)!]}
        onChange={onChange}
        theme={solarizedDarkInit({
            settings: {
                caret: '#c6c6c6',
                fontFamily: 'monospace',
            }
        })}
    />;
}

export default CodeEditor