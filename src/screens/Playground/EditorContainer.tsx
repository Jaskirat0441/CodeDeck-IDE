import React, { useState,useContext } from "react";
import { BiEditAlt, BiExport, BiFullscreen, BiImport } from "react-icons/bi";
import styled from "styled-components";
import CodeEditor from "./CodeEditor";
import Select from "react-select";
import { ModalContext } from "../../context/ModalContext";
import { langMap } from "../../context/PlaygroundContext";
import { DarkModeContext } from "../../context/DarkModeContext";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const StyledEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;



const UpperToolbar = styled.div`
  background: white;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  h3 {
    font-size: 1.3rem;
  }
  button {
    background: transparent;
    font-size: 1.3rem;
    border: 0;
    outline: 0;
  }
`;

const LowerToolbar = styled.div`
  background: white;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  button,label   {
    background: transparent;
    outline: 0;
    border: 0;
    font-size: 1.15rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    svg {
      font-size: 1.4rem;
    }
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;

const RunCode = styled.button`
  padding: 0.8rem 2rem;
  background-color: #0097d7 !important;
  color: white;
  font-weight: 700;
  border-radius: 2rem;
`;

const SaveCode = styled.button`
padding: 0.4rem 1rem;
background-color: #0097d7 !important;
color: white;
font-weight: 700;
border-radius: 2rem;
border: 0;
`;


const SelectBars = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  & > div:nth-of-type(1) {
    width: 10rem;
  }
  & > div:nth-of-type(2) {
    width: 11rem;
  }
`;
interface EditorContProps {
  title: string;
  currLang: string;
  currCode: string;
  setCurrCode : (newCode :string) => void;
  setCurrLang : (newLang:string) => void;
  folderId:string;
  cardId:string;
  saveCode : ()=>void;
  runCode : ()=>void;
}
const EditorContainer: React.FC<EditorContProps> = ({ title, currLang, currCode ,setCurrCode,setCurrLang,cardId,folderId,saveCode,runCode}) => {

  const {openModal} = useContext(ModalContext)!;
  const handle = useFullScreenHandle();
  const languageOptions = [
    { value: "c++", label: "C++" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
  ];

  const themeOptions = [
    { value: "duotoneLight", label: "duotoneLight" },
    { value: "duotoneDark", label: "duotoneDark" },
    { value: "xcodeLight", label: "xcodeLight" },
    { value: "xcodeDark", label: "xcodeDark" },
    { value: "okaidia", label: "okaidia" },
    { value: "githubDark", label: "githubDark" },
    { value: "githubLight", label: "githubLight" },
    { value: "bespin", label: "bespin" },
  ];


  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    for (let i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i].value === currLang) {
        return languageOptions[i];
      }
    }
    return languageOptions[0];

  });

  const [selectedTheme, setSelectedTheme] = useState({ value: "duotoneLight", label: "duotoneLight" });

  const handleLanguage = (selectedOption: any) => {
    setSelectedLanguage(selectedOption);
    setCurrLang(selectedOption.value);
    setCurrCode(langMap[selectedOption.value].defaultCode)

  }
  const handleTheme = (selectedOption: any) => {
    setSelectedTheme(selectedOption);
  }

  const getFile =(e:any)=>{

    const input = e.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0]);
    }

  }
  const placeFileContent = (file: any) => {
    readFileContent(file)
      .then((content) => {
        setCurrCode(content as string);
      })
      .catch((error) => console.log(error));
  };
  function readFileContent(file: any) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event!.target!.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  //  export code
  
  const handleExport = () =>{
    const blob = new Blob([currCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = "New-Document.txt";
    link.href = url;
    link.click();
    

  }
  //  dark mode theme
  const { setMode } = useContext(DarkModeContext)!;
  const { mode } = useContext(DarkModeContext)!;
  const [darkTheme,setDarkTheme] = useState({});
  
  let DarkTheme = {
      color: "white",
      backgroundColor: "rgb(47 47 47)",
      boxShadow: "0px 0px 36px -25px rgb(255 255 255 / 60%)",
      
    }
  let LightTheme = {}
  return (
    <StyledEditorContainer>

      <UpperToolbar style={mode=="light"? LightTheme: DarkTheme }>
        <Title >
          <h3>{title}</h3>
          <button onClick={()=>{
            openModal({
              value:true,
              type:"1",
              identifier:{
                folderId:folderId,
                cardId:cardId,

              }
            })
          }}>
            <BiEditAlt />
          </button>
        </Title>
        {/* dropdown */}
        <SelectBars>
        <SaveCode onClick={ ()=>{
          saveCode();
        }}>Save Code</SaveCode>

          <Select
            value={selectedLanguage}
            options={languageOptions}
            onChange={handleLanguage}
          />
          <Select
            value={selectedTheme}
            options={themeOptions}
            onChange={handleTheme}
          />
        </SelectBars>

      </UpperToolbar>
      <FullScreen handle={handle}>

      <CodeEditor currLang={selectedLanguage.value} currTheme={selectedTheme.value} 
       currCode={currCode}
       setCurrCode ={setCurrCode}
       isFullScreen={handle.active}
       
       />
       </FullScreen>

      {/* lower tool bar */}
      <LowerToolbar  style={mode=="light"? LightTheme: DarkTheme }>
        <ButtonGroup>
          <button  onClick={handle.enter} style={mode=="light"? LightTheme: DarkTheme }>
            <BiFullscreen />
            Full Screen
          </button>
          <label >
            <input type="file" accept=".txt" id="" style={{display:"none"}}   onChange={(e) => {
                getFile(e);
              }}/>
            <BiImport /> Import Code
          </label>
          <button onClick={handleExport}  style={mode=="light"? LightTheme: DarkTheme }>
            <BiExport />
            Export Code
          </button >
        </ButtonGroup>
        <RunCode onClick={()=>{
          runCode();
        }}>Run Code</RunCode>
      </LowerToolbar>
    </StyledEditorContainer>
  )
}

export default EditorContainer