import React, { useContext, useState } from "react";
import { Context } from "../../../context/UserContext";
import { Container, Form, Span, TextFieldStyled, Logodm, ButtonStyled } from "./login.styled";
import { FacebookRounded, Google } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import Logo from '../../../assets/dmcuter.png'

export default function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext( Context );
  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(user);
  }

  const customText = {
    color: '#000000',
    fontWeight: 'bold'
  }

  const customLabel = {
    color: '#ffffff'
  }

  return (
    <Container>
      

      <Form onSubmit={handleSubmit}>
      <Logodm src={Logo} alt="DevMasters" />
        <h1>LOGIN</h1>
        <TextFieldStyled className="text-field" sx={{ marginBottom: "6px"}}
          type="email"
          size="small"
          name='email'
          label='E-mail'
          variant="outlined"
          placeholder="Digite o email"
          onChange={handleChange}
          InputProps={{style: customText}}
          InputLabelProps={{style: customLabel}}
        />
        <TextFieldStyled style={{ marginBottom: "10px" }}
          type="password"
          size="small"
          name="password"
          label='Senha'
          placeholder="Digite a Senha"
          variant="outlined"
          onChange={handleChange}
          InputProps={{style: customText}}
          InputLabelProps={{style: customLabel}}
        />
        <p style={{
           marginTop: 0,
           marginBottom: '10px',
           fontSize: '13px',
        }}>
          Esqueceu sua senha? <Span>Clique aqui</Span> </p>
        <ButtonStyled
          type="submit"
          variant="contained"
        >
          Entrar
        </ButtonStyled>
        <p onClick={() => navigate("/register")}
        >Ainda não tem conta? <Span>Clique aqui</Span> </p>
      </Form>
      <div>
        <FacebookRounded style={{ fontSize: "40px", color: "#0404f4" }} />
        <Google style={{ fontSize: "40px", color: "#fc0010" }} />
      </div>

    </Container>
  );
}
