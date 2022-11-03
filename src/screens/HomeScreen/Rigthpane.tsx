import React, { useEffect,useState, useContext } from 'react'
import styled, { ThemeProvider } from 'styled-components';
import { IoTrashOutline } from "react-icons/io5"
import { BiEdit } from "react-icons/bi"
import { ModalContext } from '../../context/ModalContext';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import { useNavigate } from "react-router-dom";
import "../../styles/toggleButton.css";
import { DarkModeContext } from '../../context/DarkModeContext';
// import { DarkTheme, LightTheme } from '../../styles/global';
// import { DarkMode } from '../../context/DarkModeContext';




interface HeaderProps {
  readonly variant: string;
}
interface HeadingProps {
  readonly size: string;
}
interface modeButtonProps {
  changeTheme: () => void;
}

const StyledRightPane = styled.div`
padding: 2rem;
background:${({ theme }) => theme.paragraph};
position:absolute;
right:0;
top:0;
width:60%;
min-Height:100vh;

`;

const Header = styled.div<HeaderProps>`
display: flex;
align-items: center;
justify-content: space-between;
position:relative;
margin-bottom: ${(props) => (props.variant === "main" ? "2.75rem" : "1.4rem")};
margin-top:35px;


&::after{
position:absolute;
content:"";
bottom:-1.25rem;
width:100%;
height:2px;
background:rgba(0,0,0,0.25);
display: ${(props) => (props.variant === "main" ? "block" : "none")}



}
`;

const Heading = styled.h3<HeadingProps>`
font-weight:400;
font-size: ${(props) => (props.size === "large" ? "1.8rem" : "1.5rem")}

span{
font-weight:700;

}
`;

const AddButton = styled.button`
display:flex;
gap:0.5rem;
align-items:center;
background:transparent;
outline:0;
border:0;
font-size:1.1rem;
cursor:pointer;

span{
font-size:1.75rem;
font-weight:700;

}
transition :all 0.25 ease;
&hover{
scale:1.1;
opacity:0.75;

}
`

const Folder = styled.div`
margin-top:0.5rem;
margin-bottom:2rem;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  row-gap: 2rem;
`;


const PlaygroundCard = styled.div`
display:flex;
align-items:center;
padding:0.6rem;
gap:1rem;
box-shadow:0px 0px 36px -25px rgba(0,0,0,0.6);
cursor: pointer;
  transition: all 0.08s ease;
  
  &:hover {
    opacity: 0.75;
  }

`;

const SmallLogo = styled.img`
width:75px;
`;

const CardContent = styled.div`
flex-grow:1;

h5{
font-weight:400;
font-size:1.2rem;
margin-bottom:0.25rem;

}
`;

const Icons = styled.div`
display:flex;
font-size:1.25rem;
gap:0.5rem;
padding-right:1rem;
cursor:pointer;
`

const FolderButtons = styled.div`
  display: flex;
  align-items: center;
`;

// interface RightPaneprops {
//   mode: string;
//   // toggleMode:()=>void;
// }

const Rigthpane = () => {


  const ModalFeatures = useContext(ModalContext)!;
  const { openModal } = ModalFeatures;
  // global structures

  const PlaygroundFeatures = useContext(PlaygroundContext)!;
  const Folders = PlaygroundFeatures.folders;
  const { deleteFolder, deleteCard } = PlaygroundFeatures;
  // navigate
  const navigate = useNavigate();

  //  dark mode button

  const { setMode } = useContext(DarkModeContext)!;
  const { mode } = useContext(DarkModeContext)!;
  const [darkTheme,setDarkTheme] = useState({});
  let LightTheme={};

  useEffect(() => {
     if(mode=="dark"){
      let DarkTheme = {
        color: "white",
        backgroundColor: "rgb(47 47 47)",
        boxShadow: "rgb(255 255 255 / 60%) 20px 16px 25px -20px",
        
      }
      setDarkTheme(DarkTheme);
     }
  }, [mode])
  
  function toggleMode() {
    if (mode === 'light') {
      // mode.title = "dark";
      document.title = "CodeDeck - Dark Mode"
      let DarkTheme = {
        color: "white",
        backgroundColor: "#37474f",
        boxShadow: "0px 0px 36px -25px rgb(255 255 255 / 60%)",
        
      }
      setDarkTheme(DarkTheme);
      //  setMode(DarkTheme);
      setMode('dark');
    }
    else {
      // mode["title"] = "light";
      document.title = "CodeDeck - Light Mode";
      setMode("light");

    }
    }
  return (
    // <ThemeProvider theme={mode ? DarkTheme : LightTheme}>
    <StyledRightPane style={mode=="light"? LightTheme: darkTheme }>
      <div className='toggleMain'>
        <h5 style={{ "marginRight": "3px", color: 'grey' }}>Light</h5>
        <label className="switch">
          <input type="checkbox" onChange={toggleMode}  checked={mode == "dark"}   />
          <span className="slider round"></span>
        </label>
        <h5 style={{ "marginLeft": "3px", color: 'grey' }}>Dark</h5>
        {/* <label>Enable {mode}Mode</label> */}
      </div>
      <Header variant="main" style={mode=="light"? LightTheme: darkTheme}>
        <Heading size="large">My <span>Playground</span>
        </Heading>
        {/* <div className='toggleMain'> */}


        <AddButton onClick={() => {
          openModal({
            value: true,
            type: "4",
            identifier: {
              folderId: "",
              cardId: "",
            },
          });
        }} style={mode=="light"? LightTheme: darkTheme}> <span>+</span>New Folder</AddButton>
        {/* </div> */}
      </Header>

      {/* folders */}
      {Object.entries(Folders).map(([folderId, folder]: [folderId: string, folder: any]) => (
        <Folder>
          <Header variant="folder">
            <Heading size="small">{folder.title}</Heading>
            <FolderButtons>
              <Icons>
                <IoTrashOutline onClick={() => {
                  deleteFolder(folderId);
                }} />
                <BiEdit
                  onClick={() => {
                    openModal({
                      value: true,
                      type: "2",
                      identifier: {
                        folderId: folderId,
                        cardId: "",
                      },
                    });
                  }}
                />
              </Icons>
              <AddButton onClick={() => {
                openModal({
                  value: true,
                  type: "3",
                  identifier: {
                    folderId: folderId,
                    cardId: "",
                  },
                });
              }
              }  style={mode=="light"? LightTheme: darkTheme}>

                <span>+</span>New PlayGround</AddButton>
            </FolderButtons>

          </Header>

          {/* cards */}
          <CardContainer>
            {Object.entries(folder.items).map(([cardId, card]: [cardId: string, card: any]) => (

              <PlaygroundCard onClick={() => {
                navigate(`/code/${folderId}/${cardId}`);
              }} style={mode=="light"? LightTheme: darkTheme}>
                <SmallLogo src="/logo-small.png" alt="" />
                <CardContent>
                  <h5>{card.title}</h5>
                  <p>Language: {card.language} </p>
                </CardContent>
                <Icons
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <IoTrashOutline onClick={() => {
                    deleteCard(folderId, cardId);
                  }} />
                  <BiEdit onClick={() => {
                    openModal({
                      value: true,
                      type: "1",
                      identifier: {
                        folderId: folderId,
                        cardId: cardId,
                      }
                    })
                  }} />
                </Icons>
              </PlaygroundCard>
            ))}



          </CardContainer>
        </Folder>
      ))}



    </StyledRightPane>
    // </ThemeProvider>

  )
}
export default Rigthpane