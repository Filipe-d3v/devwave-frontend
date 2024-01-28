import { Dialog } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  `;

export const CardQuestion = styled.div`
  width: 70%;
  border: solid 1px #c1c1c1;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding: 1em;
`;

export const DialogStyled = styled(Dialog)`
  position: absolute;
`;