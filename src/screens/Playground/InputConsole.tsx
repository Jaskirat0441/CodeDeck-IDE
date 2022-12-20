import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BiImport } from "react-icons/bi";
import { DarkModeContext } from "../../context/DarkModeContext";

const Console = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  height: 4rem;
  background: #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.16);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 1.25rem;
  font-weight: 700;

  button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 1rem;
    font-weight: 400;
    background: transparent;
    outline: 0;
    border: 0;

    svg {
      font-size: 1.5rem;
    }
  }
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  resize: none;
  border: 0;
  outline: 0;
  font-size: 1.1rem;
  padding: 0.25rem;
  padding-top: 0.5rem;
`;

interface InputConsoleProps {
  currentInput: string;
  setCurrentInput: (newInput: string) => void;
}

const InputConsole: React.FC<InputConsoleProps> = ({
  currentInput,
  setCurrentInput,
}) => {
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
    <Console style={mode=="light"? LightTheme: DarkTheme }>
    <Header style={mode=="light"? LightTheme: DarkTheme }>
      Input:
      <button style={mode=="light"? LightTheme: DarkTheme }>
        <BiImport />
        Import Input
      </button>
    </Header>
    <TextArea value={currentInput} onChange={(e)=> {setCurrentInput(e.target.value);}} style={mode=="light"? LightTheme: DarkTheme }></TextArea>
  </Console>
  );
};

export default InputConsole;
