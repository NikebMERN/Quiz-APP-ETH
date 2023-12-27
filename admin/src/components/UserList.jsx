import React, { useEffect, useState } from "react";
import api from "../services/api";
import styled from "styled-components";

const UserListContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
`;

const UserListHeader = styled.h2`
  color: #333;
`;

const UserListItem = styled.li`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserListParagraph = styled.p`
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;
`;

const UserListStrong = styled.strong`
  font-weight: bold;
  color: #007bff;
`;

const UserListHR = styled.hr`
  border: 0;
  border-top: 1px solid #ddd;
  margin: 20px 0;
`;

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await api
                    .get("/api/user/users-info")
                    .then((response) => {
                        const usersData = response.data;
                        setUsers(usersData);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <UserListContainer>
            <UserListHeader>User List-({users.length})</UserListHeader>
            <ul style={{ listStyle: "none" }}>
                {users?.map((user) => (
                    <UserListItem key={user.id}>
                        <UserListParagraph>
                            <UserListStrong>Email:</UserListStrong> {user.email}
                        </UserListParagraph>
                        <UserListParagraph>
                            <UserListStrong>Registration Number:</UserListStrong>{" "}
                            {user.registration_number}
                        </UserListParagraph>
                        <UserListParagraph>
                            <UserListStrong>Name:</UserListStrong> {user.name}
                        </UserListParagraph>
                        <UserListParagraph>
                            <UserListStrong>Woreda Number:</UserListStrong>{" "}
                            {user.woreda_number}
                        </UserListParagraph>
                        <UserListParagraph>
                            <UserListStrong>School:</UserListStrong> {user.school_name}
                        </UserListParagraph>
                        <UserListParagraph>
                            <UserListStrong>City:</UserListStrong> {user.city}
                        </UserListParagraph>
                        <UserListParagraph>
                            <UserListStrong>Age:</UserListStrong> {user.age}
                        </UserListParagraph>
                        <UserListParagraph>
                            <UserListStrong>Gender:</UserListStrong> {user.gender}
                        </UserListParagraph>
                        <UserListParagraph>
                            <UserListStrong>Pixel:</UserListStrong> {user.IQpoint}
                        </UserListParagraph>
                        {/* Add other user details as needed */}
                        <UserListHR />
                    </UserListItem>
                ))}
            </ul>
        </UserListContainer>
    );
};

export default UserList;
