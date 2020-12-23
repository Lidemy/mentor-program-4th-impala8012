import { useState } from "react";
import styled from "styled-components";
import { getPagination } from "../../WebAPI";

const PaginationContainer = styled.div`
  margin: 20px auto;
  text-align: center;
`;
const PageButton = styled.button`
  border: 0.5px solid #ddd;
  font-size: 16px;
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 8px;
  outline: none;
  background: ${(props) => props.color};
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;


export default function Pagination({ pageCount, limit, setPosts}) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page) =>{
    getPagination(page, limit).then((posts) => setPosts(posts))
    setCurrentPage(page)
  }
  return (
  <PaginationContainer>
    {pageCount.map(page => (
    <PageButton
      key={page}
      color={currentPage === page ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.1)"}
      onClick={() => handlePageClick(page)}
    >{page}</PageButton>
    ))}</PaginationContainer>
  )
}

