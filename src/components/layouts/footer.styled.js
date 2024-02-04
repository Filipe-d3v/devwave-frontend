import styled from "styled-components";

export const Container = styled.footer`
    background-color: #000000;
    bottom: 0;
    width: 100%;
    height: 20em;
    display: flex;
`;

export const Logo = styled.img`
    height: 40px;
`;

export const Slogan = styled.div`
align-items: center;
display: flex;
flex-direction: column;
  p {
    color: #cccccc;
    font-size: 25px;
    font-family: 'Caveat', cursive;
    margin: 10px, 0, 0, 0;
  }
`;

export const About = styled.div`
  margin: 30px;
  color: #cccccc;
  display: flex;
  font-family: 'Libre Baskerville', serif;
  font-weight: 300;
  p {
    margin: 0;
    font-size: large;
  }
`;