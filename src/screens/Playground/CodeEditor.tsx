import React, { useState,useEffect } from 'react'
import CodeMirror from "@uiw/react-codemirror";
// themes
import { duotoneLight, duotoneDark } from "@uiw/codemirror-theme-duotone";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { bespin } from "@uiw/codemirror-theme-bespin";
// languages
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
// configuration
import { indentUnit } from "@codemirror/language";
import { EditorState } from "@codemirror/state";

import styled from "styled-components";
// import { githubDark } from '@uiw/codemirror-theme-github';

const CodeEditorContainer = styled.div<CodeEditorBoxTypes>`
& > div {
  height: 100%;
}
${({ isFullScreen }) =>
  !isFullScreen
    ? `
height: calc(100vh - 12.5rem)
`
    : `
height: 100vh;
`}
`;
interface CodeEditorBoxTypes {
  isFullScreen: boolean;
}

interface CodeEditorProps{
  currLang:string;
  currTheme:string;
  currCode:string;
  setCurrCode :(newCode :string)=>void;
  isFullScreen:boolean;
}
const CodeEditor : React.FC<CodeEditorProps> = ({currLang,currTheme,currCode ,setCurrCode,isFullScreen}) => {

  const [theme, setTheme] = useState<any>(xcodeDark);
  const [lang, setLang] = useState<any>(python);

  //  chnage languge

  useEffect(() => {
     if(currLang === "c++") setLang(cpp);
     if(currLang === "java") setLang(java);
     if(currLang === "javascript") setLang(javascript);
     if(currLang === "python") setLang(python);
  }, [currLang])

  // change theme

  useEffect(() => {
    if(currTheme === "duotoneDark") setTheme(duotoneDark);
    if(currTheme === "duotoneLight") setTheme(duotoneLight);
    if(currTheme === "xcodeLight") setTheme(xcodeLight);
    if(currTheme === "xcodeDark") setTheme(xcodeDark);
    if(currTheme === "okaidia") setTheme(okaidia);
    if(currTheme === "githubDark") setTheme(githubDark);
    if(currTheme === "githubLight") setTheme(githubLight);
    if(currTheme === "darcula") setTheme(darcula);
    if(currTheme === "bespin") setTheme(bespin);
 }, [currTheme])

  
  return (
    <CodeEditorContainer isFullScreen = {isFullScreen}>
      <CodeMirror theme={theme} 
      height="100%"
      value={currCode}
      onChange={(value:string,e:any)=>{
        setCurrCode(value);
      }}
      extensions={[lang,
         indentUnit.of("   "),
        EditorState.tabSize.of(8),
        EditorState.changeFilter.of(() => true),]}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </CodeEditorContainer>
  )
}

export default CodeEditor;