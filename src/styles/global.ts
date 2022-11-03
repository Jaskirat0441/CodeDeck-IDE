
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin:0;
        padding:0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Play', sans-serif;
    }
    a,button,svg{
        cursor:pointer !important;
        transition: all 0.1s ease
    }
    a:hover,button:hover,svg:hover{
        opacity:0.8;
        scale(1.05);
    }
   ; `
//     ;
// export const DarkTheme = {
//     color : '#191919',
//     card : '#2C3639',
//     shadow : 'rgba(100, 100, 100, 0.09) 0px 3px 12px',
//     mainHeading : '#F9F9F9',
//     sideHeading : '#DDDDDD',
//     paragraph : '#EFEFEF',
//     buttonText : '#FEFBF6'
//   }
// export const LightTheme = {
//     body : '#F9F9F9',
//     card : '#EFEFEF',
//     shadow : 'rgba(0, 0, 0, 0.09) 0px 3px 12px',
//     mainHeading : '#000000',
//     sideHeading : '#000000',
//     paragraph : '#000000',
//     buttonText : '#000000'
//   }