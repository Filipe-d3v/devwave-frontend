import { TextField } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: solid 1px #d3d3d3;
    margin-top: 100px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: -3px 3px 8px -2px #000000;
    background-color: #333333;
`;

export const TextFieldStyled = styled(TextField)`
    margin-bottom: 5px;
    width: 400px;
`;

export const Logodm = styled.img`
    width: 350px;
`;