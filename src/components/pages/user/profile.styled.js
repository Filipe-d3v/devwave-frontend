import styled from "styled-components";

export const ImageProfile = styled.img`
    border-radius: 50%;
    height: 10em;
    border: solid 2px #444444;
    position: relative;
    width: 10em;
`;

export const InfoUser = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    padding-bottom: 20px;
    align-items: center;

    p {
        font-size: large;
        margin-bottom: 7px;
        margin-top: 0;
        padding: 0;
        font-weight: 700;
        text-transform: uppercase;
        color: #555555;
    }

    h3 {
        margin-top: 5px;
        margin-bottom: 5px;
        color: #555555;
        text-transform: uppercase;
    }
`;

export const AlterImage = styled.div`
    margin-top: -22px;
    position: relative;
    margin-right: -120px;
    label {
        color: #333333;
        border-radius: 45%;
        vertical-align: middle;
        cursor: pointer;
    }
`;

export const Social = styled.div`
    a { &:hover{
        scale: 1.2;
    }}
    a.git{
        color: #222222;
        margin-left: 10px;
    }
    a.in{
        color: blue;
        margin-right: 10px;
    }
    a.insta{
        color: #E6495F;
        margin-left: 20px;
    }
`;

export const Container = styled.div`
    display: flex;
`;

export const InfoPersonal = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 3em;
    text-align: left;
    margin-top: 5px;
    p {
        margin-top: 10px;
        margin-bottom: 0;
        color: #333333;
        font-weight: 500;
    }
    i {
        vertical-align: middle;
        color: #999999;
    }
`;

export const Skill = styled.div`
    margin-left: 10px;
    text-align: center;
    transition: 0.2s;
    height: auto;

    p {
        font-size: 10px;
        margin: 0;
    }

    &:hover {
        scale: 1.1;
    }
`;

export const SkillsPainel = styled.div`
    display: flex;
    padding: 20px;
    i {
        color: #059862;
        cursor: pointer;
        transition: 0.2s;
        height: 50px;
        width: 50px;
    }
    i{ &:hover{
        scale: 1.2;
    }}

    img {
        height: 60px;
        border-radius: 25%;
    }
`;

export const SkillSelector = styled.div`
    margin: 10px;
    max-height: 500px;
`;