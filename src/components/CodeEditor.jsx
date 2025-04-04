import { Editor } from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';

const CodeEditor = () => {
    const editorRef = useRef();
    const [value, setValue] = useState("");
    const [language, setLanguage] = useState("javascript");

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    const onSelect = (language) => {
        setLanguage(language);
        setValue(CODE_SNIPPETS[language]);
    }

    return (
        <div className="flex flex-col lg:flex-row h-full gap-6">
            <div className="w-full lg:w-1/2 flex flex-col relative">
                <LanguageSelector language={language} onSelect={onSelect} />
                <div className="flex-grow">
                    <Editor
                        height="75vh"
                        theme="vs-dark"
                        language={language}
                        defaultValue={CODE_SNIPPETS[language]}
                        onMount={onMount}
                        value={value}
                        onChange={(value) => setValue(value)}
                        className="border border-gray-300 rounded"
                    />
                </div>
            </div>
            <Output editorRef={editorRef} language={language} className="w-full lg:w-1/2" />
        </div>
    );
}

export default CodeEditor;
