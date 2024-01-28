import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(0,0,0);
    background: linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(116,116,116,1) 50%, rgba(236,236,236,1) 100%);
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 100px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: -3px 3px 8px -2px #000000;
    background: rgb(0,0,0);
    background: linear-gradient(225deg, rgba(0,0,0,1) 0%, rgba(116,116,116,1) 50%, rgba(236,236,236,1) 100%);

    p {
        color: #000000;
    }

    h1 {
        color: #ffffff;
    }
`;

export const TextFieldStyled = styled(TextField)`
    bottom: 3;
    width: 350px;
    margin-bottom: 6px;
    background-color: #787878;
    color: #d2d2d2;
`;

export const Span = styled.span`
    cursor: pointer;
    color: blue;
    &&:hover {
        text-decoration: underline;
    }
`;


export const Logodm = styled.img`
    width: 350px;
`;

export const ButtonStyled = styled(Button)`
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(116,116,116,1) 50%, rgba(236,236,236,1) 100%);
`;