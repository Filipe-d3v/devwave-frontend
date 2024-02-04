import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding-top: 50px;
  padding-left:20px;
  padding-right: 20px;
  flex-wrap: wrap;
`;

export const ProjectContent = styled.div`
  display: flex;
  width: 15%;
  padding: 10px;
  flex-direction: column;
  background-color: #cccccc;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ImageContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  img {
    border: solid 1px #444444;
    border-radius: 3px;
    box-shadow: -3px 6px 9px -4px #000000;
    max-width: 150px;
    max-height: 75px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  h3 {
    margin: 0;
    padding: 0;
  }
`;

export const DescContent = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  border-left: 1px solid #d2d2d2;
  border-right: 1px solid #d2d2d2;
`;

export const ActionContent = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const ListSkills = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px #c2c2c2;
  margin-left: 2em;
  max-height: 600px;
`;

export const ProjectsCard = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px ;
  width: 100%;
  
  h1 {
    opacity: 30%;
    text-transform: uppercase;
    margin-top: 10%;
  }
`;

export const CardNewProject = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  border: solid 1px #222222;
  padding: 10px;
  text-align: center;
  background-color: #cccccc;
  align-items: center;
  margin-right: 10px;

  img {
    height: 100px;
    width: auto;
  }

  h3 {
    margin: 0;
    padding: 0;
    color: #222222;
  }

  button {
    margin-top: 4px;
    background-color: #04aa6d;
    border: none;
    border-radius: 4px;
    width: 90%;
    transition: 0.2s;
    box-shadow: 1px 1px 4px 0px rgba(0,0,0,0.54);

    &:hover {
      scale: 1.1;
      border: none;
    }
  }
`;

export const ButtonStyled = styled.button`
height: 2.5em;
`;