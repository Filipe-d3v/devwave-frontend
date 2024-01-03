import * as React from 'react';
import { Container } from './main.styled';

export default function Main({ children }) {
  return (
    <>
      <Container>
        {children}
      </Container>
    </>
  )
}