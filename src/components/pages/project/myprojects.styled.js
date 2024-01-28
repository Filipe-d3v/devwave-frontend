import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  display: flex;
  padding-top: 50px;
  flex-wrap: wrap;
`;

export const ProjectContent = styled.div`
  display: flex;
  border-bottom: solid 2px #d2d2d2;
  padding: 10px;
  flex-direction: column;
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
  border: solid 1px #d4d4d4;
  display: flex;
  flex-direction: column;
  max-width: 17%;
  align-items: center;
  margin-left: 10px ;
  
  h1 {
    opacity: 30%;
    text-transform: uppercase;
    margin-top: 10%;
  }
`;

export const CardNewProject = styled.div`
  display: flex;
  flex-direction: column;
  width: 17%;
  border: solid 1px #c4c4c4;
  padding: 10px;

  img {
    height: 75px;
    width: auto;
  }

  h3 {
    margin: 0;
    padding: 0;
  }
`;