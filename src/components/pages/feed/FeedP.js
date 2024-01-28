import React, { useEffect, useState } from "react";
import { Container, CreatePost, HeaderPost, ImgProfile, ImgProject, NewPost } from "./feedP.styled";
import api from "../../../utils/api";
import {
  Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, ListItemButton,
  Rating, TextareaAutosize, useMediaQuery, useTheme
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

export default function FeedP() {
  const [posts, setPosts] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [nameProject, setNameProject] = useState(null);
  const [formData, setFormData] = useState({
    subtitle: '',
    project: ''
  });


  useEffect(() => {
    api.get('/posts/getall', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => {
        setPosts(response.data.posts)
      })
  }, [token])

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

  const handleClose = () => {
    setSelectedProjectId(null);
    setDialog(false);
  };

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
    setDialog(false);
  };

  const handleClick = (name) => {
    setNameProject(name);
  }

  const handleTextChange = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newData = {
      subtitle: formData.subtitle,
      project: selectedProjectId
    }

    try {
      const res = await api.post('posts/create', newData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        },
      });

      enqueueSnackbar(res.data.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.res.data.message, { variant: 'error' });
    }
  }

  function cancelPost() {
    setNameProject(null);
    setSelectedProjectId(null);
    formData.subtitle = '';
  }

  return (

    <Container>
      <CreatePost>
        <form onSubmit={handleSubmit}>
          <div style={{ width: '100%', display: 'flex' }}>
            <Button sx={{ width: '30%' }} onClick={handleClickOpen}
              variant="contained"
              size="small"
            >Add projeto</Button>
            <h4>
              {!nameProject ? (
                <span>X</span>
              ) : (
                <span>{`${nameProject} `}<h5>V</h5></span>
              )}
            </h4>

          </div>
          <TextareaAutosize style={{ marginBottom: '10px', marginTop: '10px', minHeight: '40px', maxHeight: '60px' }}
            placeholder="Digite uma legenda"
            value={formData.subtitle}
            onChange={(e) => handleTextChange(e, 'subtitle')}
          />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Button sx={{ width: '30%' }}
              variant="contained"
              type="submit"
              color="success"
            >Postar</Button>
            <Button onClick={() => cancelPost()} sx={{ width: '30%' }}
              variant="contained"
              color="error"
            >cancelar</Button>
          </div>
        </form>
      </CreatePost>

      {posts.map((post) => (
        <NewPost key={post._id}>
          <HeaderPost >
            <ImgProfile src={`${process.env.REACT_APP_API_LOCAL}/img/users/${post.user.image}`} alt={post.user.name} />
            <p style={{}}><Link style={{ textDecoration: 'none' }} to={`/userdetails/${post.user._id}`}>{`${post.user.name} ${post.user.surname}`}</Link></p>
            <h4> <Link style={{ textDecoration: 'none', textTransform: 'uppercase' }} to={`/projectdetails/${post.project._id}`}>{post.project.name}</Link></h4>
            <h6>{post.date}</h6>
          </HeaderPost>
          <Divider />
          <div>
            <h3>{post.subtitle}</h3>
          </div>
          <Divider />
          <ImgProject src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${post.project.image}`} alt={post.project.name} />
          <Divider />
          <Rating name="aprovation-level" precision={0.5} defaultValue={0} size="large" max={10} />
        </NewPost>
      ))}

      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Escolha um projeto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {projects.map((project) => (
              <div onClick={() => handleClick(project.name)} key={project._id}>
                <ListItemButton onClick={() => handleProjectClick(project._id)}>
                  {project.name}
                </ListItemButton>
              </div>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>

  )
}