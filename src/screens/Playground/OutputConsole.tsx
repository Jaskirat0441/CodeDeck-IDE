import React,{useState,useContext} from 'react'
import styled from "styled-components";
import { BiExport } from "react-icons/bi";
import { DarkModeContext } from '../../context/DarkModeContext';

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
    background:transparent;
    outline:0;
    border:0;
    svg {
      font-size: 1.5rem;
    }
  }
`;

const OutputArea = styled.textarea`
  background: #e7e7e7;
  flex-grow: 1;
  padding-top:0.5rem;
  padding:0.25rem;
`;
interface OutputConsoleProps {
  currOutput: string;
  // setCurrInput: (newInput: string) => void;
}
const OutputConsole :React.FC<OutputConsoleProps>= ({currOutput}) => {
  // dark mode
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
    <Console>
      <Header style={mode=="light"? LightTheme: DarkTheme }>
        Output:
        <button style={mode=="light"? LightTheme: DarkTheme }>
          <BiExport />
          Export Output
        </button>
      </Header>
      <OutputArea value={currOutput} disabled style={mode=="light"? LightTheme: DarkTheme }></OutputArea>
    </Console>
  )
}

export default OutputConsole