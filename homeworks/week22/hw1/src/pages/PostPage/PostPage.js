import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../WebAPI";
import { LoadingContext } from "../../contexts";
import Loading from "../../components/Loading";
import styled from "styled-components";

const PostContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 16px;
`;

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
`
const PostTitle = styled.div`
  font-size: 32px;
  font-weight:bold;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const PostContent = styled.div`
  margin-top: 10px;
  white-space: pre-line;
  word-break: break-word;
`;
export default function PostPage() {
  const [post, setPost] = useState("");
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  let { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPost(id).then((post) => setPost(post[0]));
    setIsLoading(false);
  }, [id, setIsLoading]);

  return (
    <div>
      {(!isLoading && post) ? 
      (<PostContainer>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
        </PostHeader>
        <PostContent>{post.body}</PostContent>
      </PostContainer>)
      :( <Loading/>)}
    </div>
  );
}
