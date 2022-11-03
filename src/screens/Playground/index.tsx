import React, { useState, useContext } from 'react'
import EditorContainer from './EditorContainer'
import InputConsole from './InputConsole'
import Navbar from './Navbar'
import OutputConsole from './OutputConsole'
import { Await, useParams } from "react-router-dom"
import { langMap, PlaygroundContext } from '../../context/PlaygroundContext'
import { Buffer } from "buffer";


import styled from "styled-components";
import { ModalContext } from '../../context/ModalContext'
import Modal from '../../components/Modal'
import axios from 'axios'
import { DarkModeContext } from '../../context/DarkModeContext'

const MainApp = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: calc(100vh - 4.5rem);
`;

const Consoles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
`;
const Playground = () => {
    const { folderId, playgroundId } = useParams();

    // isOpen
    const { isOpen, openModal, closeModal} = useContext(ModalContext)!;

    // 
    const { folders, saveCodePlayground } = useContext(PlaygroundContext)!;
    const { title, language, code } =
        folders[folderId as string].items[playgroundId as string];

    // 
    const [currCode, setCurrCode] = useState(code);
    const [currInput, setCurrInput] = useState("");
    const [currLang, setCurrLang] = useState(language);
    const [currOutput, setCurrOutput] = useState("");

    // save the code

    const saveCode = () => {
        saveCodePlayground(folderId as string, playgroundId as string, currCode, currLang);
    }

    // encode f/n
    // it converts normal string to  base 64 encoded string
    const encode = (str: string) => {
        return Buffer.from(str, "binary").toString("base64");
    }
    // decode
    const decode = (str: string) => {
        return Buffer.from(str, "base64").toString();
    }
    // post submisssion return token
    const postSubmission = async (
        lang_id: number,
        source_code: string,
        stdin: string,
    ) => {
        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: { base64_encoded: 'true', fields: '*' },
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': '7cd700c021msha6e16640ab4353ap1afb5djsn55c9b2a00dcd',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            data: JSON.stringify({
                lang_id: lang_id,
                source_code: source_code,
                stdin: stdin,
            })
        };

        const res = await axios.request(options);
        return res.data.token;

    };

    //  o/p
    const getOutput: (token: string) => any = async (token: string) => {
        const options = {
            method: 'GET',
            url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
            params: { base64_encoded: 'true', fields: '*' },
            headers: {
                'X-RapidAPI-Key': '7cd700c021msha6e16640ab4353ap1afb5djsn55c9b2a00dcd',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
        };
        const res = await axios.request(options);
        if (res.data.status_id <= 2) {
          const res2 = await getOutput(token);
          return res2.data;
        }
        return res.data;

    }
    // run the code
    const runCode = async () => {
           console.log("fjhdcn");
        // loading
        openModal({
            value: true,
            type: "6",
            identifier: {
              folderId: "",
              cardId: "",
            },
          });
        const lang_id = langMap[currLang].id;
        const source_code = encode(currCode);
        const stdin = encode(currInput);

        // pass data to api
        const token = await postSubmission(lang_id, source_code, stdin);
        console.log(token);

        const res = await getOutput(token);

        const status_name = res.status.description;
        const decoded_output = decode(res.stdout ? res.stdout : "");
        const decoded_compile_output = decode(
          res.compile_output ? res.compile_output : ""
        );
        const decoded_stderr = decode(res.stderr ? res.stderr : "");

        // 
        let finalOutput = "";
        if(res.status_id !==3){
            if (decoded_compile_output === "") {
                finalOutput = decoded_stderr;
              } else {
                finalOutput = decoded_compile_output;
              }
            } else {
              finalOutput = decoded_output;
            }

            setCurrOutput(status_name + "\n\n" + finalOutput);
            closeModal();

        }

      


    return (
        <div>
            <Navbar/>
            <MainApp >
                <EditorContainer title={title}
                    currLang={currLang}
                    currCode={currCode}
                    setCurrCode={setCurrCode}
                    setCurrLang={setCurrLang}
                    // code={code}
                    folderId={folderId as string} cardId={playgroundId as string}
                    saveCode={saveCode}
                    runCode={runCode}
                />
                <Consoles>
                    <InputConsole currInput={currInput} setCurrInput={setCurrInput}/>
                    <OutputConsole currOutput={currOutput} />
                </Consoles>
            </MainApp>
            {isOpen?.value === true ? <Modal /> : <></>}

        </div>
    )
}


export default Playground