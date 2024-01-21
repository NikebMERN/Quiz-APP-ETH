import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CongratulationsText = styled.h2`
  color: green;
  font-size: 24px;
`;

const QuestionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const QuestionItem = styled.li`
  margin-bottom: 20px;
`;

const CorrectQuestionText = styled.p`
  color: green;
  margin-bottom: 8px;
`;

const WrongQuestionText = styled.p`
  color: red;
  margin-bottom: 8px;
`;

const AnswerText = styled.p`
  font-weight: bold;
`;

const Div = styled.div`
  display: flex;
`;

const IncreasedAmount = styled.p`
  color: #00bf06;
`;

const CurrentAmount = styled.p`
  color: #401e01;
  font-size: 30px;
  margin-left: 35px;
`;

const BackButton = styled.button`
  background-color: #b00505;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
`;

const Congratulation = ({
    correctCounts,
    correctQuestion,
    wrongCounts,
    wrongQuestion,
    id,
}) => {
    const [iqPoint, setIqPoint] = useState("");
    const [increasedAmount, setIncreasedAmount] = useState(0);
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
                        const addedPoint = (correctCounts / 60) * 20;
                        setIncreasedAmount(addedPoint);
                        setIqPoint(IQ + addedPoint);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                throw error;
            }
        };

        userData();
    }, [correctCounts]);

    const updateIqpoint = async (ids) => {
        try {
            await axios
                .post("http://localhost:3000/api/user/update-iq-points", {
                    userId: ids,
                    newIqPoints: iqPoint,
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
        <div>
            {/* Display results or redirect to a results page */}
            <CongratulationsText>
                Congratulations! You've completed all questions in minutes.
            </CongratulationsText>
            <div>
                <h2>Correct Questions ({correctCounts}/60):</h2>
                <QuestionList>
                    {correctQuestion.map((question) => (
                        <QuestionItem key={question.id}>
                            <CorrectQuestionText>- {question.question}</CorrectQuestionText>
                            <AnswerText>Correct Answer: {question.correctChoice}</AnswerText>
                        </QuestionItem>
                    ))}
                </QuestionList>

                <h2>Wrong Questions ({wrongCounts}/60):</h2>
                <QuestionList>
                    {wrongQuestion.map((question) => (
                        <QuestionItem key={question.id}>
                            <WrongQuestionText>- {question.question}</WrongQuestionText>
                            <AnswerText>Your Answer: {question.selectedChoice}</AnswerText>
                            <AnswerText>Correct Answer: {question.correctChoice}</AnswerText>
                        </QuestionItem>
                    ))}
                </QuestionList>

                <Div>
                    <CurrentAmount>Current Pixel ({iqPoint})</CurrentAmount>
                    <IncreasedAmount>+{increasedAmount}</IncreasedAmount>
                </Div>
            </div>
            <BackButton onClick={handleBack}>Back to Home</BackButton>
        </div>
    );
};

export default Congratulation;
