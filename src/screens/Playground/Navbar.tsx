import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DarkModeContext } from "../../context/DarkModeContext";

const NavbarContainer = styled.div`
  height: 4.5rem;
  background: #241f21;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavbarContent = styled.button`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  background: transparent;
  border: 0;
  outline: 0;
  margin: 0 auto;

`;

const Logo = styled.img`
  width: 45px;
`;

const MainHeading = styled.h1`
  font-size: 1.9rem;
  font-weight: 400;
  color: white;

  span {
    font-weight: 700;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { setMode } = useContext(DarkModeContext)!;
  const { mode } = useContext(DarkModeContext)!;
  const [darkTheme,setDarkTheme] = useState({});
  let LightTheme={};
  function toggleMode() {
    if (mode === 'light') {
      // mode.title = "dark";
      document.title = "CodeDeck - Dark Mode"
      let DarkTheme = {
        color: "white",
        backgroundColor: "rgb(47 47 47)",
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
    <NavbarContainer>
      <NavbarContent
        onClick={() => {
          navigate("/");
        }}
      >
        <Logo src='/logo.png' alt='' />
        <MainHeading>
          <span>Code</span> Deck
        </MainHeading>
      </NavbarContent>
      <div className='toggleMain'>
        <h5 style={{ "marginRight": "3px", color: 'grey' }}>Light</h5>
        <label className="switch">
          <input type="checkbox" onChange={toggleMode} checked={mode == "dark"}   />
          <span className="slider round"></span>
        </label>
        <h5 style={{ "marginLeft": "3px", color: 'grey' }}>Dark</h5>
        {/* <label>Enable {mode}Mode</label> */}
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
