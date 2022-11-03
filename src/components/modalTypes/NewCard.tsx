import React, { useState, useContext } from "react";
import { RiCloseFill } from 'react-icons/ri'
import { PlaygroundContext } from "../../context/PlaygroundContext";
import { CloseButton, Header, Input, ModalProps } from "../Modal";
import Select from "react-select";

import styled from "styled-components";

const InputSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  row-gap: 1rem;
  column-gap: 1rem;
  margin-top: 1.2rem;
  align-items: center;
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

const NewCard = ({ closeModal, identifier }: ModalProps) => {
  const { folderId} = identifier;

  const { folders, createNewPlayground } = useContext(PlaygroundContext)!;

  const langOption = [
    { value: "c++", label: "C++" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
  ];
  const [title, setTitle] = useState("");
  const [lang, setlang] = useState(langOption[0]);

  const handleLagChange = (selectedOption:any) => {
    setlang(selectedOption);

  } 
    return (
    <div> 
      <Header>
    <h2>Create New Playrgound</h2>
    <CloseButton
      onClick={() => {  
        closeModal();
      }}
    >
      <RiCloseFill />
    </CloseButton>
  </Header>
  <InputSelect>
    <input
      type='text'
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
      }}
    />
    <Select options={langOption} value={lang} onChange={handleLagChange}/>
    <button
      onClick={() => {
        createNewPlayground(folderId,title,lang.value);
        closeModal();
      }}
    >
      Create Playground
    </button>
  </InputSelect>
    </div>
  );
};

export default NewCard;