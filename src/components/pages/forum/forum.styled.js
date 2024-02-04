import { Dialog } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  `;

export const CardQuestion = styled.div`
  width: 70%;
  border: solid 1px #222222;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding: 1em;
  background-color: #777777;
`;

export const DialogStyled = styled(Dialog)`
  position: absolute;
`;

export const Button = styled.button`
  height: 40px;
  color: #ffff;
  background-color: #d177ff;
  box-shadow: none;
`;

export const CodeCard = styled.div`
  background-color: #e0e0e0;
`;