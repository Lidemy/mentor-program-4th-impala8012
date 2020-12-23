import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { addPost } from "../../WebAPI";
import { LoadingContext } from "../../contexts";
import Loading from "../../components/Loading";

const PostForm = styled.form`
  margin: 20px auto 0 auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  width: 80%;
`;
const PostContainer = styled.div`
  margin: 20px auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  label {
    margin: 10px 0;
  }
  input {
    width: 30%;
    padding: 5px 13px;
  }
  textarea {
    height: 200px;
    padding: 8px 13px;
    font-size: 16px;
  }
`;

const PostHeader = styled.div`
  text-align:center;
  border-bottom: 1px solid #ccc;

  h1{
    padding-top:15px;
  }
`

const SubmitButton = styled.button`
  width: 200px;
  margin: 16px;
  text-align: center;

  border-radius: 5px;
  outline: none;
  cursor: pointer;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  color:red;
`;

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    addPost(title, body).then((res) => {
      if (res.ok !== 1) {
        setIsLoading(false);
        return setErrorMessage(res.message);
      }
      setIsLoading(false);
      history.push("/");
    });
  }
  return (
    <div>
      <PostForm onSubmit={handleSubmit}>
        <PostHeader>
          <h1>發表新文章</h1>
        </PostHeader>
        <PostContainer>
          <label>標題</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          <label>內容</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </PostContainer>
        {isLoading ? (
          <Loading/>
        ) : (
          <SubmitButton>送出文章</SubmitButton>
        )}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </PostForm>
    </div>
  );
}
