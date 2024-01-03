import React, { useEffect, useState } from "react";
import { Container, CreatePost, HeaderPost, ImgProfile, ImgProject, NewPost } from "./feedP.styled";
import api from "../../../utils/api";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, ListItemButton,
  Rating, TextareaAutosize, useMediaQuery, useTheme } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

export default function FeedP() {
  const [posts, setPosts] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
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
      const response = await api.post('posts/create', newData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        },
      });

      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  }

  function cancelPost(){
    setNameProject(null);
    setSelectedProjectId(null);
    formData.subtitle = '';
  }

  return (

    <Container>
      <CreatePost>
        <form onSubmit={handleSubmit}>
          <Button onClick={handleClickOpen}
            variant="contained"
            size="small"
          >Add projeto</Button>
          <p>{nameProject}</p>
          <TextareaAutosize style={{ marginBottom: '10px', marginTop: '10px', minHeight: '40px', maxHeight: '60px' }}
            placeholder="Digite uma legenda"
            value={formData.subtitle}
            onChange={(e) => handleTextChange(e, 'subtitle')}
          />
          <Button
            variant="contained"
            type="submit"
            color="success"
            size="small"
          >Postar</Button>
          <Button onClick={() => cancelPost()} sx={{marginTop: '5px'}}
            variant="contained"
            size="small"
            color="error"
          >cancelar</Button>
        </form>
      </CreatePost>

      {posts.map((post) => (
        <NewPost key={post._id}>
          <HeaderPost >
            <ImgProfile src={`${process.env.REACT_APP_API_LOCAL}/img/users/${post.user.image}`} alt={post.user.name} />
            <p><Link to={`/userdetails/${post.user._id}`}>{`${post.user.name} ${post.user.surname}`}</Link></p>
            <Link to={`/projectdetails/${post.project._id}`}>{post.project.name}</Link>
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