import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const FailedPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f44336; /* Red background color */
  color: white;
`;

const FailedPageTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

const FailedPageMessage = styled.p`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

const FailedIQ = styled.p`
  font-size: 18px;
  text-align: center;
  margin-bottom: 40px;
`;

const FailedPageButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #ffffff; /* White background color */
  color: #f44336; /* Red text color */
  border: 2px solid #ffffff; /* White border */
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #f44336; /* Red background color on hover */
    color: #ffffff; /* White text color on hover */
  }
`;

const FailedPage = () => {
    const [decreasedAmount, setDecreasedAmount] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();

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
                        const IQ = res.data.IQpoint;
                        const MinusPoint = 10;
                        setDecreasedAmount(IQ - MinusPoint);
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

    const updateIqpoint = async (ids) => {
        try {
            await axios
                .post("http://localhost:3000/api/user/update-iq-points", {
                    userId: ids,
                    newIqPoints: decreasedAmount,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            throw error;
        }
    };

    updateIqpoint(id);

    const handleBack = () => {
        navigate("/");
    };

    return (
        <FailedPageContainer>
            <FailedPageTitle>Failed!</FailedPageTitle>
            <FailedPageMessage>
                Sorry, you didn't complete the questions in time.
            </FailedPageMessage>
            <FailedIQ>
                Your Pixel have decreased by 10 to ({decreasedAmount})
            </FailedIQ>
            <FailedPageButton onClick={handleBack}>Back to Home</FailedPageButton>
        </FailedPageContainer>
    );
};

export default FailedPage;
