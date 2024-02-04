import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import { Container, ImgAndDesc, Skills } from "./projectDetails.styled";

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
      <img src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${project.image}`} alt={project.name} />
      <Skills>
        {project.skills?.map((skill, index) => (
          <div style={{width: '100%'}} key={index}>
            <img src={`${process.env.REACT_APP_API_LOCAL}/img/skills/${skill.icon}`} alt={skill.name} />
          </div>
        ))}
      </Skills>
    </Container>
  )
}