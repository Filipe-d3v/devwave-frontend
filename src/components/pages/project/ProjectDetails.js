import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import { Container, ImgAndDesc } from "./projectDetails.styled";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api.get(`/projects/getbyid/${id}`, {
      headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
      }
   }).then((response) => {
      setProject(response.data.project)
    })
  }, [id, token])
  return (
    <Container>
    <h2>{project.name}</h2>
    <ImgAndDesc>
    <img src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${project.image}`} alt={project.name} />
    
    </ImgAndDesc>
  
    {project.skills?.map((skill, index) => (
      <div key={index}>
        Skill: {skill.name}
      </div>
    ))}
    </Container>
  )
}