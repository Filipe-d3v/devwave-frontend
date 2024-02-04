import * as React from 'react';
import { Container, Logo, Slogan, About } from './footer.styled';
import Logotipo from '../../assets/dmcuter.png';
import { Instagram, Twitter } from '@mui/icons-material';
import { Divider } from '@mui/material';

export default function Footer() {
  return (
    <Container>
      <div style={{display: 'flex'}}>
      <Slogan style={{ margin: '30px' }}>
        <Logo src={Logotipo} alt='ArtDev' />
        <p>Desenvolver, também é arte.</p>
        <p style={{marginTop: '0'}}>
          <Instagram sx={{ marginRight: '10px', cursor: 'pointer' }} />
          <Twitter sx={{ marginLeft: '10px', cursor: 'pointer' }} />
        </p>
      </Slogan>
      <About>
        <div style={{ margin: '30px' }}>
          <p>Quem Somos?</p>
          <h5>
            Somos uma plataforma que te proporciona uma galeria de projetos de sofwares, onde os usuários exibem
            suas obras e habilidades artísticas em desenvolvimento. Porque desenvolver, também é arte.
          </h5>
        </div>
        <div style={{ margin: '30px' }}>
          <p>Missão</p>
          <h5>
            Dar ao dev a opção de ir alem do currículo e expor sua verdadeiras habilidades em um ambiente interativo e sofisticado.
          </h5>
        </div>
      </About>
      </div>
      <Divider sx={{backgroundColor: '#cccccc'}}/>

    </Container>
  )
}