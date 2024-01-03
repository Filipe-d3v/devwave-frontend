import React, { useEffect, useState } from "react";
import { Container } from "./userDetails.styled";
import { useParams } from "react-router-dom";
import api from "../../../utils/api";

export default function UserDetails(){
  const {id} = useParams();
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api.get(`/users/userdetails/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
    }
    }).then((response) => {
      setUser(response.data.user)
    })
  }, [id, token])
  return(
    <Container>
      <div>
        <h3>{user.description}</h3>
      <img src={`${process.env.REACT_APP_API_LOCAL}/img/users/${user.image}`} alt={user.name} />
      
      </div>
    </Container>
  )
}