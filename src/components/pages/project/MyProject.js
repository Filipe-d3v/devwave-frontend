import React, { useState, useEffect } from "react";
import {
 Button, Dialog, DialogContent, DialogContentText, DialogTitle,
 TextField, TextareaAutosize
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import api from "../../../utils/api";
import { useSnackbar } from "notistack";
import { ActionContent, Container, DescContent, ImageContent, ProjectContent } from "./myprojects.styled";

export default function MyProject() {
 const [dialog, setDialog] = useState(false);
 const theme = useTheme();
 const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
 const [token] = useState(localStorage.getItem('token') || '');
 const { enqueueSnackbar } = useSnackbar();
 const [projetcs, setProjects] = useState([]);
 const [formData, setFormData] = useState({
  name: '',
  desc: '',
  image: null,
  docs: null,
  link: '',
  skills: [],
 });

 useEffect(() => {
  api.get('/projects/alluserprojects', {
   headers: {
       Authorization: `Bearer ${JSON.parse(token)}`
   }
})
   .then((response) => {
       setProjects(response.data.projects)
   })
}, [token])

 const handleFileChange = (event, fieldName) => {
  setFormData({
   ...formData,
   [fieldName]: event.target.files[0],
  });
 };

 const handleTextChange = (event, fieldName) => {
  setFormData({
   ...formData,
   [fieldName]: event.target.value,
  });
 };

 const handleSubmit = async (event) => {
  event.preventDefault();

  const newdata = new FormData();
  newdata.append('image', formData.image);
  newdata.append('docs', formData.docs);
  newdata.append('name', formData.name);
  newdata.append('desc', formData.desc);
  newdata.append('link', formData.link);
  newdata.append('skills', formData.skills);


  try {
   const response = await api.post('projects/create', newdata, {
    headers: {
     Authorization: `Bearer ${JSON.parse(token)}`,
     'Content-Type': 'multipart/form-data',
    },
   });

   enqueueSnackbar(response.data.message, { variant: 'success' });
  } catch (error) {
   enqueueSnackbar(error.response.data.message, { variant: 'error' });
  }
 };

 const handleClickOpen = () => {
  setDialog(true);
 };

 const handleClose = () => {
  setDialog(false);
 };

 return (
  <Container>
   <h2>MEUS PROJETOS</h2>
   <Button onClick={handleClickOpen} variant="contained" color="success">
    Criar Novo Projeto
   </Button>

   <div>
    {projetcs.length > 0 && (
     projetcs.map((project) => (
      <ProjectContent key={project._id}>
       
       <ImageContent>
       <h3>{project.name}</h3>
       <img src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${project.image}`} alt={`${project.name}`}
        style={{height: '200px'}}
       />
       <a href={`${project.link}`} >{project.link}</a>
       </ImageContent>

       <DescContent>
       {project.desc}
       </DescContent>

      <ActionContent>
       <Button
       variant="contained"
       > Editar</Button>
       <Button
       variant="contained"
       color="error"
       >Excluir</Button>
      </ActionContent>
      </ProjectContent>
     ))
    )}
   </div>

   <Dialog
    fullScreen={fullScreen}
    open={dialog}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
   >
    <DialogTitle id="responsive-dialog-title">Criar novo projeto</DialogTitle>
    <DialogContent>
     <DialogContentText>
      <form onSubmit={handleSubmit} fullWidth>
       <TextField
        autoFocus
        fullWidth
        margin="dense"
        label="Nome do projeto"
        type="text"
        variant="outlined"
        size="small"
        value={formData.name}
        onChange={(e) => handleTextChange(e, 'name')}
       />
       <TextField
        autoFocus
        fullWidth
        margin="dense"
        label="Link do Projeto"
        type="text"
        variant="outlined"
        size="small"
        value={formData.link}
        onChange={(e) => handleTextChange(e, 'link')}
       />
       <TextField
        autoFocus
        fullWidth
        margin="dense"
        label="Skills"
        type="text"
        variant="outlined"
        size="small"
        value={formData.skills}
        onChange={(e) => handleTextChange(e, 'skills')}
       />
       Descrição do projeto
       <TextareaAutosize
        id="textarea"
        value={formData.desc}
        onChange={(e) => handleTextChange(e, 'desc')}
        style={{ width: '100%', minHeight: '60px' }}
       />
       <TextField
        margin="dense"
        type="file"
        variant="outlined"
        size="small"
        label="Foto do projeto"
        onChange={(e) => handleFileChange(e, 'image')}
        InputLabelProps={{
         shrink: true,
        }}
       />
       <TextField
        margin="dense"
        type="file"
        variant="outlined"
        size="small"
        label="Documentação do projeto"
        onChange={(e) => handleFileChange(e, 'docs')}
        InputLabelProps={{
         shrink: true,
        }}
       /><br />
       <Button
        variant="contained"
        type="submit"
        color="success"
       >
        Criar</Button>

       <Button onClick={handleClose} autoFocus
        variant="contained"
        color="error"
       >
        Cancelar
       </Button>

      </form>
     </DialogContentText>
    </DialogContent>
   </Dialog>
  </Container>
 );
};
