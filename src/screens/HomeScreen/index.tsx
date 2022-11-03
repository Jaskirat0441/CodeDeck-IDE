import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import Modal from '../../components/Modal';
import { ModalContext } from '../../context/ModalContext';
import LeftPane from './LeftPane'
import Rigthpane from './Rigthpane'

const HomeScreenContainer = styled.div`
        position:relative;
        width:100%;
        height:100vh;
        `

// interface RightPaneprops {
//   title: string;
//   currLang: string;
// }
const HomeScreen = () => {
  // const [isOpen,setIsOpen] = useState(true);

  const ModalFeatures = useContext(ModalContext)!;
  const isOpen = ModalFeatures?.isOpen;

  // const [mode, setMode] = useState("light");


  return (
    <HomeScreenContainer>
      <LeftPane />
      <Rigthpane  />
      {isOpen?.value === true ? <Modal /> : <></>}
    </HomeScreenContainer>
  )
}

export default HomeScreen