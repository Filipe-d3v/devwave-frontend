import React, { useEffect, useState } from 'react';
import { Container, CardQuestion, DialogStyled } from './forum.styled';
import api from '../../../utils/api';
import CodeDisplay from '../../../utils/CodeDisplay';
import { Button, DialogContent, DialogContentText, DialogTitle, TextField, TextareaAutosize } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from "notistack";

export default function Forum() {
  const [questions, setQuestions] = useState([]);
  const [token] = useState(localStorage.getItem('token'));
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [questionId, setQuestionId] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    text: '',
    code: '',
    question: ''
  });

  useEffect(() => {
    api.get('/questions/getall', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setQuestions(response.data.questions);
    });
  }, [token]);

  const handleTextChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const getQuestionId = (questionId) => {
    setQuestionId(questionId);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newData = {
      text: formData.text,
      code: formData.code,
      question: questionId,
    }

    try {
      const rs = await api.post('/responses/create', newData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
      enqueueSnackbar(rs.data.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
    }
  }

  const handleClickOpen = (questionId) => {
    setQuestionId(questionId);
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  // Filtra a pergunta específica com base no questionId
  const selectedQuestion = questions.find(question => question._id === questionId);

  return (
    <Container>
      {questions?.map((question) => (
        <CardQuestion key={question._id}>
          <img style={{ width: '80px' }} src={`${process.env.REACT_APP_API_LOCAL}/img/users/${question.owner.image}`} alt={question.owner.name} />
          {`${question.owner.name} ${question.owner.surname}`}<br />
          {question.text}<br />
          <CodeDisplay code={question.code} language='javascript' />
          <button
            onClick={() => handleClickOpen(question._id)}
          >
            comentar
          </button>
        </CardQuestion>
      ))}
      <DialogStyled
        maxWidth='xl'
        fullWidth={true}
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Responder a pergunta: </DialogTitle>
        {selectedQuestion && (
          <div key={selectedQuestion._id}>
            <img style={{ width: '80px' }} src={`${process.env.REACT_APP_API_LOCAL}/img/users/${selectedQuestion.owner.image}`} alt={selectedQuestion.owner.name} />
            {`${selectedQuestion.owner.name} ${selectedQuestion.owner.surname}`}<br />
            {selectedQuestion.text}<br />
            <CodeDisplay code={selectedQuestion.code} language='javascript' />
          </div>
        )}
        <DialogContent>
          <DialogContentText sx={{display: 'flex', flexDirection: 'column'}}>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
              <TextField
                type='text'
                variant='outlined'
                size='small'
                label='Resposta'
                placeholder='Digite sua resposta'
                onChange={(e) => handleTextChange(e, 'text')}
              />
              <TextareaAutosize style={{minHeight: '300px'}}
                placeholder='Digite o código'
                onChange={(e) => handleTextChange(e, 'code')}
              />

              <Button
                type='submit'
                size='small'
                variant='contained'
              >
                enviar
              </Button>
              <Button
                onClick={handleClose}
                size='small'
                variant='contained'
                color='error'
              >
                Cancelar
              </Button>
            </form>
          </DialogContentText>
        </DialogContent>
      </DialogStyled>
    </Container>
  );
}
