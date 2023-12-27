import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SubjectListContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 2px;
`;

const SubjectItem = styled.div`
  margin-bottom: 5px;
`;

const SubjectLink = styled(Link)`
  text-decoration: none;
  color: #0b72e0;
  font-size: 18px;

  &:hover {
    color: #033061;
    text-decoration: underline;
  }
`;

const SubjectList = ({ name, link, id }) => {
  return (
    <SubjectListContainer>
      <SubjectItem>
        <SubjectLink to={`/question/${link}/${id}`}>{name}</SubjectLink>
      </SubjectItem>
    </SubjectListContainer>
  );
};

export default SubjectList;
