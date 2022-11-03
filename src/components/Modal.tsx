import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { RiCloseFill } from "react-icons/ri"
import { ModalContext } from '../context/ModalContext';
import { PlaygroundContext } from '../context/PlaygroundContext';
import EditFolderTitle from './modalTypes/EditFolderTitle';
import NewCard from './modalTypes/NewCard';
import NewFolder from './modalTypes/NewFolder';
import EditCardTitle from './modalTypes/EditCardTitle';
import NewFolderAndPlayground from './modalTypes/NewFolderAndPlayground';
import Loading from './modalTypes/Loading';


export const ModalConatiner = styled.div`
width:100%;
height:100vh;
position:fixed;
top:0;
left:0;
z-index:2;
display: flex;
  align-items: center;
  justify-content: center;
`
export const ModalContent = styled.div`
background:white;
width:35%;
padding:2rem;
border-radius:10px;
`;
// export const LoadingMain = styled.div`
// background:white;
// width:35%;
// border-radius:10px;
// `;

export const Header = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
`;

export const CloseButton = styled.button`
background : transparent;
outline:0;
border:0;
font-size:2rem;
cursor:pointer;
`;
export const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  gap: 2rem;
  padding-bottom: 0;

  input {
    flex-grow: 1;
    height: 2rem;
  }
  button {
    background: #241f21;
    height: 2rem;
    color: white;
    padding: 0 2rem;
  }
`;
// const EditCardModal = ({ closeModal,isOpen }: { closeModal : ()=> void,
//   isOpen: any; }) => {
//     const PlaygroundFeatures = useContext(PlaygroundContext)!;
//     const folders = PlaygroundFeatures.folders;
//     console.log(isOpen);
  
//     const currentFolder = folders[isOpen.identifier.folderId];
//     console.log(currentFolder.items);
//     const currentCard = currentFolder.items[isOpen.identifier.cardId];
//   return (
//     <>
//       <Header><h2>Edit CArd Title</h2>
//         <CloseButton onClick={() => {
//        closeModal()
//         }}>
//           <RiCloseFill />
//         </CloseButton>

//       </Header>
//       <Input>
//         <input type='text' value={currentCard.title} />
//         <button>Update Title</button>
//       </Input>
//     </>
//   )
// }


export interface ModalProps {
  closeModal: () => void;
  identifier: {
    folderId: string;
    cardId: string;
  };
}
const Modal = () => {

  const ModalFeatures = useContext(ModalContext)!;
  const {closeModal} = ModalFeatures;
  const isOpen = ModalFeatures.isOpen;

  return (
    <ModalConatiner>
      <ModalContent>
        {/* <Header>Update Folder Name
            <CloseButton onClick={()=>{
              if(isOpen){
                isOpen({
                   value:false,
                  type:"",
                  identifier : {
                    folderId:"",
                    cardId:"",
               }
               })
              }
            }}>
                <RiCloseFill/>
            </CloseButton>
            
            </Header> */}
          {isOpen.type === "1" && (
          <EditCardTitle closeModal={closeModal} identifier={isOpen.identifier} />
        )}
        {isOpen.type === "2" && (
          <EditFolderTitle
            closeModal={closeModal}
            identifier={isOpen.identifier}
          />
        )}
        {isOpen.type === "3" && (
          <NewCard closeModal={closeModal} identifier={isOpen.identifier} />
        )}
        {isOpen.type === "4" && (
          <NewFolder closeModal={closeModal} identifier={isOpen.identifier} />
        )} 
        {isOpen.type === "5" && (
          <NewFolderAndPlayground closeModal={closeModal} identifier={isOpen.identifier} />
        )}
     

           {isOpen.type === "6" && (
              <Loading/>
        )}
      </ModalContent>
    </ModalConatiner>
  )
}

export default Modal