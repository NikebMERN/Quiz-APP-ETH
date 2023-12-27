import React from "react";
import { Link, Navigate } from "react-router-dom";
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
`;

const DashboardHeader = styled.h2`
  color: #333;
`;

const DashboardNav = styled.nav`
  margin-top: 20px;
`;

const DashboardNavItem = styled.li`
  margin-bottom: 10px;
`;

const DashboardLink = styled(Link)`
  text-decoration: none;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  padding: 8px 12px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const Dashboard = () => {
  // Check if the user is authenticated (assuming the presence of an admin token)
  const isAdminAuthenticated = !!localStorage.getItem("adminToken");

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('adminToken');

    // Redirect to the login page
    // You may use the Navigate component if you're using React Router
    window.location.href = '/login';
    // return <Navigate to="/login" />;
  };

  // If not authenticated, redirect to the login page
  if (!isAdminAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the dashboard
  return (
    <DashboardContainer>
      <DashboardHeader>Admin Dashboard</DashboardHeader>
      <DashboardNav>
        <ul>
        <DashboardNavItem>
            <DashboardLink  to="/user/list">Users List</DashboardLink>
          </DashboardNavItem>
          <DashboardNavItem>
            <DashboardLink  to="/question/list">Question List</DashboardLink>
          </DashboardNavItem>
          <DashboardNavItem>
            <DashboardLink  to="/upload">Upload Questions</DashboardLink>
          </DashboardNavItem>
        </ul>
      </DashboardNav>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </DashboardContainer>
  );
};

export default Dashboard;
