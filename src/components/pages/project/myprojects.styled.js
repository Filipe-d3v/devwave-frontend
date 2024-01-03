import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const ProjectContent = styled.div`
  display: flex;
  border-bottom: solid 2px #d2d2d2;
  padding: 20px;
`;

export const ImageContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  img {
    border: solid 1px #444444;
    border-radius: 3px;
    box-shadow: -3px 6px 9px -4px #000000;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 1em;
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
  flex-direction: column;
  height: 100%;
  width: 70px;
`;