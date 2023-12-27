import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  text-align: center;
  margin: 100px auto;
`;

const NotFoundHeading = styled.h1`
  font-size: 4em;
  color: #f00;
`;

const NotFoundMessage = styled.p`
  font-size: 1.2em;
  color: #333;
`;

const NotFoundLink = styled(Link)`
  text-decoration: none;
  color: #0b72e0;
  font-size: 18px;

  &:hover {
    color: #033061;
    text-decoration: underline;
  }
`;

const NotFound = () => {
  return (
    <>
      {localStorage.getItem("x-auth-token") ? (
        <NotFoundContainer>
          <NotFoundHeading>404</NotFoundHeading>
          <NotFoundMessage>Page Not Found.</NotFoundMessage>
          <NotFoundMessage>
            Also this error can occur when the page doesn't load the Server Side
            JS! <strong>Please reload the page or open it in New Tab.</strong>
          </NotFoundMessage>
        </NotFoundContainer>
      ) : (
        <NotFoundContainer>
          <NotFoundHeading>404</NotFoundHeading>
          <NotFoundMessage>Page Not Found</NotFoundMessage>
          <NotFoundLink to="/login">Login</NotFoundLink>
        </NotFoundContainer>
      )}
    </>
  );
};

export default NotFound;
