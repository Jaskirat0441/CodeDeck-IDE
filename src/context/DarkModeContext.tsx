import { createContext, useState, useContext } from "react";

interface DarkModeType {
    mode: any;
    setMode :(newState :any) => void;
    // setMode :any;
}


export const DarkModeContext = createContext<DarkModeType | null>(null);

export const DarkModeProvider = ({ children }: { children: any }) =>{
    const initialValue = {
        title:"light",
    };
    const [mode,setMode]= useState("light");
  

    const ThemeValues :DarkModeType ={
        mode:mode,
        setMode:setMode
    }
// const toggleMode = () => {
//   if (mode === 'light') {
//       setMode('dark');
//       document.body.style.backgroundColor = 'grey';
//       document.title = "TextTools - Dark Mode"

//   }
//   else {
//       setMode('light');
//       document.body.style.backgroundColor = 'white';
//       document.title = "TextTools - Light Mode"


//   }
// };


    return (
        <DarkModeContext.Provider value={ThemeValues}>
          {children}
        </DarkModeContext.Provider>
      );

}

