import React, { useState, useEffect } from "react";
import {
  Button, Dialog, DialogContent, DialogContentText, DialogTitle,
  ListItemButton,
  TextField, TextareaAutosize
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import api from "../../../utils/api";
import { useSnackbar } from "notistack";
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { ActionContent, CardNewProject, Container, ImageContent, ListSkills, ProjectContent, ProjectsCard, ButtonStyled } from "./myprojects.styled";
import { Add, Check, Close, Delete, Edit, PhotoCamera, SentimentVeryDissatisfied } from '@mui/icons-material';
import { pdfjs } from 'react-pdf';
import Vazio from '../../../assets/vazio.png'

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function MyProject() {
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [token] = useState(localStorage.getItem('token') || '');
  const { enqueueSnackbar } = useSnackbar();
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [thumbImgUrl, setThumbImgUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: null,
    docs: null,
    link: '',
    projectSkills: [],
  });

  useEffect(() => {
    api.get('/skills/getall').then((response) => {
      setSkills(response.data.skills)
    })
  }, []);

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
    const selectedFile = event.target.files[0];
  
    if (fieldName === 'image') {
      setFormData({
        ...formData,
        image: selectedFile,
      });
  
      setSelectedFileName(selectedFile.name);
  
      const readerimg = new FileReader();
      readerimg.onload = () => {
        setThumbImgUrl(readerimg.result);
      };
      readerimg.readAsDataURL(selectedFile);
    } 
    /*
    

      else if (fieldName === 'docs') {
      setFormData({
        ...formData,
        docs: selectedFile,
      });
  
      setSelectedPdfName(selectedFile.name);
  
      const readerpdf = new FileReader();
      readerpdf.onload = () => {
        setPdfUrl(readerpdf.result);
      };
      readerpdf.readAsDataURL(selectedFile);
    }




    */
  };

  const handleTextChange = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleSkillClick = (skill) => {
    const isSkillSelected = formData.projectSkills.some((selectedSkill) => selectedSkill._id === skill._id);

    if (isSkillSelected) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        projectSkills: prevFormData.projectSkills.filter((selectedSkill) => selectedSkill._id !== skill._id),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        projectSkills: [...prevFormData.projectSkills, skill],
      }));
    }
  };

  const renderSkillItem = (skill) => {
    const isSkillSelected = formData.projectSkills.some((selectedSkill) => selectedSkill._id === skill._id);



    return (
      <div key={skill._id} onClick={() => handleSkillClick(skill)}>
        <ListItemButton selected={isSkillSelected}>
          {isSkillSelected ? <CheckIcon /> : <RadioButtonUncheckedIcon />}
          {skill.name}
        </ListItemButton>
      </div>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newdata = new FormData();
    newdata.append('image', formData.image);
    newdata.append('docs', formData.docs);
    newdata.append('name', formData.name);
    newdata.append('desc', formData.desc);
    newdata.append('link', formData.link);
    newdata.append('projectSkills', JSON.stringify(formData.projectSkills));

    try {

      console.log('formData.projectSkills:', formData.projectSkills);

      const response = await api.post('projects/create', newdata, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      enqueueSnackbar(response.data.message, { variant: 'success' });
      setDialog(false);
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
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

      <ProjectsCard>
        
      <CardNewProject>
        <h3>NOVO PROJETO</h3>
        <img src={Vazio} alt="vazio" />
        <ButtonStyled onClick={() => handleClickOpen()}
        ><Add sx={{color: '#ffffff'}}/></ButtonStyled>
      </CardNewProject>

        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectContent key={project._id}>

              <ImageContent>
                <h3>{project.name}</h3>
                <img src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${project.image}`} alt={`${project.name}`}
                  style={{ height: '200px' }}
                />
              </ImageContent>

              <ActionContent>
                <Button
                sx={{
                  width: '100%',
                  marginRight: '5px'
                }}
                  variant="contained"
                  size="small"
                  color="warning"
                > <Edit /></Button>
                <Button
                sx={{
                  width: '100%',
                  marginLeft: '5px'
                }}
                  variant="contained"
                  size="small"
                  color="error"
                ><Delete /></Button>
              </ActionContent>
            </ProjectContent>
          ))
        ) : (
          <>
            <h1>Nenhum projeto cadastrado ainda!</h1>
            <p><SentimentVeryDissatisfied style={{ fontSize: '10em', opacity: '30%' }} /></p>
          </>
        )}
      </ProjectsCard>

      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{ textAlign: 'center', textTransform: 'uppercase' }} id="responsive-dialog-title">Criar novo projeto</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ display: 'flex' }}>
            <form onSubmit={handleSubmit} fullWidth>
              <label>

              </label>
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
              Descrição do projeto
              <TextareaAutosize
                id="textarea"
                value={formData.desc}
                onChange={(e) => handleTextChange(e, 'desc')}
                style={{ width: '100%', minHeight: '60px' }}
              />
              Foto do projeto:
              {selectedFileName && (
                <p style={{ marginTop: '5px', width: '100%', height: '20px', backgroundColor: '#c1c1c1' }}>{selectedFileName}</p>
              )}
              <label
                for="imgInput"
                style={{
                  padding: '5px',
                  backgroundColor: '#555',
                  color: '#fff',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  display: 'block',
                  marginTop: '10px',
                  cursor: 'pointer',
                }}
              > <PhotoCamera sx={{ verticalAlign: 'middle' }} />   ADD FOTO </label>
              {thumbImgUrl && (
                <div style={{ marginTop: '5px' }}>
                  <img src={thumbImgUrl} alt="image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>
              )}

              <input
                type="file"
                id="imgInput"
                name="imgInput"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'image')}
                style={{ display: 'none' }}
              />
              {/*
              Documentação:
              {selectedPdfName && (
                <p style={{ marginTop: '5px', width: '100%', height: '20px', backgroundColor: '#c1c1c1' }}>{selectedPdfName}</p>
              )}
               
                <label
                for="pdfInput"
                style={{
                  padding: '5px',
                  backgroundColor: '#555',
                  color: '#fff',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  display: 'block',
                  marginTop: '10px',
                  cursor: 'pointer',
                }}
              > <DocumentScannerOutlined sx={{ verticalAlign: 'middle' }} />   ADD DOCUMENTAÇÂO </label>
              {pdfUrl && (
                <div style={{ marginTop: '5px' }}>
                  <Document file={pdfUrl} onLoadSuccess={(documentInfo) => console.log('PDF loaded:', documentInfo)}>
                    <Page pageNumber={1} width={100} />
                  </Document>
                </div>
              )}
              <input
                type="file"
                id="pdfInput"
                name="pdfInput"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, 'docs')}
                style={{ display: 'none' }}
              />              
              */}

              <br />
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button
                variant="contained"
                type="submit"
                color="success"
                size="large"
                sx={{margin: 0, borderRadius: '50%'}}
              >
                <Check />
                </Button>

              <Button onClick={handleClose} autoFocus
                variant="contained"
                color="error"
                size="large"
                sx={{margin: 0, borderRadius: '50%'}}
              >
                <Close />
              </Button>
              </div>

            </form>

            <ListSkills>
              {skills.map((skill) => renderSkillItem(skill))}
            </ListSkills>

          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
