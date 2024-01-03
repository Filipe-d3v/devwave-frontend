import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { ImageProfile, InfoUser, Container, Social, AlterImage, InfoPersonal, SkillsPainel, Skill, SkillSelector } from "./profile.styled";
import {
  Cake, Email, Flag, FlipCameraIos, GitHub, Instagram, LinkedIn, LocationCity, Map,
  Transgender, WhatsApp
} from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, ListItemButton, TextField } from "@mui/material";
import Avatar from '../../../assets/avatar.jpg';
import { useSnackbar } from "notistack";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Profile() {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem('token') || "");
  const [levels, setLevels] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [skills, setSkills] = useState([]);
  const [skillId, setSkillId] = useState('');
  const [skillName, setSkillName] = useState('');
  const [formData, setFormData] = useState({
    proficiency: undefined,
    technology: ''
  });

  useEffect(() => {
    api.get('/skills/getall', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setSkills(response.data.skills)
    })
  }, [token])


  const handleTextChange = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newData = {
      proficiency: formData.proficiency,
      technology: skillId
    }

    try {
      const response = await api.post('levels/create', newData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        },
      });



      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  }

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  
  function getSkillId(id_skill, name_skill) {
    setSkillId(id_skill);
    setSkillName(name_skill);
  }


  useEffect(() => {
    api.get('/users/checkuser/profile', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setUser(response.data)
    })
  }, [token]);

  useEffect(() => {
    api.get('/levels/getuserskills', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setLevels(response.data.levels)
    })
  }, [token])


  function onFileChange(e) {
    //setPreview(e.target.files[0])
    setUser({ ...user, [e.target.name]: e.target.files[0] })
  };

  /*async function handleSubmit(e) {
    e.preventDefault()

    const formaData = new FormData()

    await Object.keys(user).forEach((key) => {
        formaData.append(key, user[key])
    })

    const data = await api.patch(`/users/update/${user._id}`, formaData, {
        headers: {
            Authorizatio: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'muitipart/form-data'
        }
    }).then((response) => {
        return response.data
    }).catch((err) => {
        return err.response.data
    })
}*/

  return (
    <>

      <Container>
        <div style={{ minWidth: '640px', display: 'flex' }}>
          <InfoUser>
            <p>{user.description}</p>
            {user.image ? (<ImageProfile src={`${process.env.REACT_APP_API_LOCAL}/img/users/${user.image}`} alt={user.name} />) : (
              (<ImageProfile src={Avatar} alt={`${user.name}`} />)
            )}

            <AlterImage>
              <label htmlFor='photo'> <FlipCameraIos /> </label>
              <input
                id='photo'
                type='file'
                name="image"
                onChange={onFileChange}
                style={{
                  display: 'none'
                }}
              />
            </AlterImage>

            <h3>{`${user.name} ${user.surname}`}</h3>

            <Social>
              <a className="in" href={`${user.linkedin}`} target="_blank" rel="noopener noreferrer"><LinkedIn sx={{ fontSize: '30px' }} /></a>
              <a className='git' href={`${user.github}`} target="_blank" rel="noopener noreferrer"><GitHub sx={{ fontSize: '30px' }} /></a>
              <a className='insta' href={`${user.github}`} target="_blank" rel="noopener noreferrer"><Instagram sx={{ fontSize: '30px' }} /></a>
            </Social>
          </InfoUser>

          <InfoPersonal>
            <p><i><Email /> </i>{user.email}</p>
            <p><i><WhatsApp /> </i> {user.phone}</p>
            <p><i><Flag /> </i>{user.nationality}</p>
            <p><i><Cake /> </i>{user.birth}</p>
            <p><i><Transgender /> </i>{user.gender}</p>
            <p><i><Map /></i> {user.address}</p>
            <p><i><LocationCity /></i> {`${user.cep} ${user.city}-${user.uf}`}</p>
          </InfoPersonal>
        </div>

        <SkillsPainel>
          {levels.map((level) => (
            <Skill key={level._id}>
              <img src={`${process.env.REACT_APP_API_LOCAL}/img/skills/${level.technology.icon}`} alt={level.technology.name} /><br />
              {level.technology.name}
              <div style={{ width: '100%', height: '10px', border: 'solid 1px #999999' }}>
                <div style={{ width: `${level.proficiency}%`, backgroundColor: 'green', height: '10px' }}>
                </div>
              </div>
              <p>{level.proficiency}%</p>
            </Skill>
          ))}

          <Button onClick={() => handleClickOpen()}
            variant="contained"
          >abrir</Button>
        </SkillsPainel>

      </Container>
      <Divider />

      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ textAlign: 'center' }}>Criar nova skill</DialogTitle>

        <DialogContent sx={{ display: 'flex' }}>
          <SkillSelector>
            {skills?.map((skill) => (
              <div key={skill._id}>
                <ListItemButton onClick={() => getSkillId(skill._id, skill.name)}>
                  {skill.name}
                </ListItemButton>
              </div>
            ))}
          </SkillSelector>

          <DialogContentText >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField sx={{ width: '150px', marginTop: '20px' }}
                type="number"
                variant="outlined"
                label='Proficiência'
                size="small"
                value={formData.proficiency}
                onChange={(e) => handleTextChange(e, 'proficiency')}
              />
              <Button sx={{ width: "100%" }}
                type="submit"
                size="small"
                variant="contained"
                color="success"
              >salvar</Button>
            </form>
            <p>{skillName}</p>
          </DialogContentText>
        </DialogContent>


      </Dialog>
    </>
  );
};