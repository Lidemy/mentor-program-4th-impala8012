import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getPosts, getPagination } from "../../WebAPI";
import Pagination from "../../components/Pagination";
import { LoadingContext } from "../../contexts";
import Loading  from "../../components/Loading";
const Root =styled.div`
  width: 80%;
  margin: 0 auto;
`

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0,12,34,0.2);
  padding:16px;
  display:flex;
  align-items: flex-end;
  justify-content: space-between;
`
const PostTitle = styled(Link)`
  font-size:24px;
  color: #333;
  text-decoration:none;
`

const PostDate = styled.div`
  color: rgba(0,0,0,0.8);
`

function Post({post}){
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};


export default function HomePage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([])
  const [pageCount, setPageCount] = useState([]);
  const limit = 5;
  
    useEffect(() => {
      setIsLoading(true);
      getPosts().then((posts) => {
        const allPages = Math.ceil(posts.length / limit);
        setPageCount(Array.from({ length: allPages }, (_, i) => i + 1));
      });
      getPagination(1, limit).then((posts) => {
        setPosts(posts);
      });
      setIsLoading(false);
    }, [setIsLoading]);

  return (
    <Root>
      {isLoading ? (<Loading/>) :(
        <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Pagination
        setPosts={setPosts}
        pageCount={pageCount}
        limit={limit}
      ></Pagination>
      </>
      )}
    </Root>
  );
}

