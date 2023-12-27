import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubjectList from "./SubjectList";
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  list-style-type: armenian;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SubjectsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SubjectItem = styled.li`
  margin-bottom: 10px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0; /* Adjust the background color as needed */
`;

const UserName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const IQPointContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IQPoint = styled.p`
  font-size: 20px;
  font-weight: bolder;
  margin-left: 5px;
`;

const Home = () => {
    const [iqPoint, setIqPoint] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("x-auth-token");
        navigate("/login");
    };

    useEffect(() => {
        const userData = async () => {
            try {
                await axios
                    .get("http://localhost:3000/api/user/user-info", {
                        headers: {
                            "x-auth-token": localStorage.getItem("x-auth-token"),
                        },
                    })
                    .then((res) => {
                        console.log(res);
                        setName(res.data.name);
                        setIqPoint(res.data.IQpoint);
                        setId(res.data.id);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                throw error;
            }
        };

        userData();
    }, []);

    return (
        <HomeContainer>
            <UserInfo>
                <UserInfoContainer>
                    <UserName>{name},</UserName>
                    <IQPointContainer>
                        <p>Pixel: </p>
                        <IQPoint>{iqPoint}</IQPoint>
                    </IQPointContainer>
                    {/* <HelpOutlineIcon fontSize="small" /> */}
                </UserInfoContainer>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </UserInfo>

            <h3>Subjects:</h3>
            <SubjectsList>
                <SubjectItem>
                    <SubjectList name="History" link="Chemo" id={id} />
                </SubjectItem>
                <SubjectItem>
                    <SubjectList name="Math" link="Math" id={id} />
                </SubjectItem>
            </SubjectsList>
        </HomeContainer>
    );
};

export default Home;
