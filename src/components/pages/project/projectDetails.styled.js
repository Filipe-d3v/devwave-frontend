import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;

  h2 {
    text-transform: uppercase;
    background-color: #dedede;
    width: 100%;
  }

  img {
    max-width: 600px;
    display: flex;
    aspect-ratio: 16 / 9;
  }
`;

export const ImgAndDesc = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Skills = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
    margin-top: 10px;
  }
`;