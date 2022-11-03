import { useState,useContext } from "react";

import ModalProvider from './context/ModalContext';
import PlaygroundProvider from './context/PlaygroundContext';
import HomeScreen from './screens/HomeScreen';
import Playground from './screens/Playground';
import GlobslStyles from "./styles/global";
import {Route,Routes,Navigate,BrowserRouter} from "react-router-dom";
import Page from './screens/Error404/Page';
import { ThemeContext, ThemeProvider } from "styled-components";
import { DarkModeContext } from "./context/DarkModeContext";
function App() {

  // const  {mode} = useContext(DarkModeContext)!;
  // console.log(mode);


  return (
    // <ThemeProvider theme={mode}>
    <PlaygroundProvider>
      <ModalProvider>
      <GlobslStyles/>
      {/* <HomeScreen/> */}
      {/* <Playground/> */}
      <BrowserRouter>
      <Routes>
            <Route path="/" element={<HomeScreen />}/>
            <Route path="/code/:folderId/:playgroundId" element={<Playground/>}/>
            <Route path="*" element={<Page/>}/>

      </Routes>
      </BrowserRouter>
    </ModalProvider>
    </PlaygroundProvider>
      // </ThemeProvider>
  );

}

export default App;
