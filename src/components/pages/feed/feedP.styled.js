import styled from "styled-components";

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

export const NewPost = styled.div`
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 10px;
    width: 600px;
    background-color: #dbdbdb;
    margin-top: 20px;
    box-shadow: 0px 3px 8px -2px #000000;
`;

export const HeaderPost = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    h6 {
        right: 0;
    }
`;

export const ImgProfile = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid 1px #222222;
`;

export const ImgProject = styled.img`
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
`;

export const CreatePost = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    padding: 15px;
    border: solid 1px #cccccc;
    border-radius: 5px;
    width: 600px;
    background-color: #ededed;

    form {
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    form p{
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 18px;
        font-weight: 600;
    }
`;
