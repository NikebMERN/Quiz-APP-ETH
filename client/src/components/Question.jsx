import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Timer from "./Timer";
import Congratulation from "./Congratulation";

const QuestionPageContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const QustionNO = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const QuestionText = styled.p`
  font-size: 18px;
`;

const ChoicesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ChoiceItem = styled.li`
  margin-bottom: 10px;
`;

const Div = styled.div`
  display: flex;
`;

const ChoicesText = styled.p``;

const QuestionListStrong = styled.strong`
  font-weight: bold;
  margin: 17px 15px 0 5px;
  color: black;
`;

const NextButton = styled.button`
  background-color: #007bff;
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

const QuestionPage = () => {
    const { subject } = useParams();
    const { id } = useParams();
    const [correctQuestions, setCorrectQuestions] = useState([]);
    const [wrongQuestions, setWrongQuestions] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const navigate = useNavigate();

    // Fetch questions for the subject (Replace with your actual API call)
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                await axios
                    .get("http://localhost:3000/api/quest/questions")
                    .then((res) => {
                        // console.log(res);
                        let filteredQuestions = res.data.filter(
                            (question) => question.subject === subject
                        );
                        for (let i = filteredQuestions.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [filteredQuestions[i], filteredQuestions[j]] = [
                                filteredQuestions[j],
                                filteredQuestions[i],
                            ];
                        }
                        let filteredFourty = filteredQuestions.slice(0, 60);
                        setQuestions(filteredFourty);
                        setTimeLeft(3600);
                        // console.log(filteredQuestions.slice(0, 40));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                throw error;
            }
        };

        fetchQuestions();
    }, [subject]);

    const handleTimerEnd = () => {
        // Logic to handle time running out
        // For example, set the wrongAnswers, show a message, and navigate back to the home page after 10 seconds
        setWrongCount(40 - correctCount); // Assuming there are 40 questions
        setTimeout(() => {
            navigate(`/fail/${id}`);
        }, 1000);
    };

    const handleChoiceSelect = (choice) => {
        setSelectedChoice(choice);
    };

    const handleNextQuestion = () => {
        // Check if a choice is selected
        if (selectedChoice !== null) {
            // Move to the next question if available
            if (currentQuestionIndex < questions.length) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setSelectedChoice(null); // Reset selected choice for the next question
            }
            // Assume correctChoice is the correct answer received from your backend
            const correctChoice = questions[currentQuestionIndex].correct_choice;

            if (selectedChoice === correctChoice) {
                setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
                setCorrectQuestions((prevCorrectQuestions) => [
                    ...prevCorrectQuestions,
                    { ...currentQuestion, correctChoice },
                ]);
            } else {
                setWrongCount((prevWrongCount) => prevWrongCount + 1);
                setWrongQuestions((prevWrongQuestions) => [
                    ...prevWrongQuestions,
                    { ...currentQuestion, selectedChoice, correctChoice },
                ]);
            }
        }
    };

    if (questions.length === 0) {
        // Add loading logic if needed
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    // console.log(currentQuestionIndex, currentQuestion);
    return (
        <QuestionPageContainer>
            {!(currentQuestionIndex === questions.length) ? (
                <>
                    <h2>{subject} Questions</h2>

                    {currentQuestion && (
                        <QuestionContainer>
                            <Timer duration={timeLeft} onTimerEnd={handleTimerEnd} />
                            <Div>
                                <QustionNO>{currentQuestionIndex + 1}. </QustionNO>
                                <QuestionText>{currentQuestion.question}</QuestionText>
                            </Div>
                            <ChoicesList>
                                <ChoicesList>
                                    {Object.entries(currentQuestion.choices || {}).map(
                                        ([choiceKey, choiceValue]) => (
                                            <ChoiceItem key={choiceKey}>
                                                <Div>
                                                    <input
                                                        type="radio"
                                                        id={`choice${choiceKey}`}
                                                        name="choices"
                                                        value={choiceValue}
                                                        checked={choiceValue === selectedChoice}
                                                        onChange={() => handleChoiceSelect(choiceValue)}
                                                    />
                                                    <QuestionListStrong htmlFor={`choice${choiceKey}`}>
                                                        {choiceKey}:{" "}
                                                    </QuestionListStrong>
                                                    <ChoicesText>{`${choiceValue}`}</ChoicesText>
                                                </Div>
                                            </ChoiceItem>
                                        )
                                    )}
                                </ChoicesList>
                            </ChoicesList>

                            <NextButton
                                onClick={handleNextQuestion}
                                disabled={!selectedChoice}
                            >
                                Next Question
                            </NextButton>
                        </QuestionContainer>
                    )}
                </>
            ) : (
                <div>
                    <Congratulation
                        correctCounts={correctCount}
                        correctQuestion={correctQuestions}
                        wrongCounts={wrongCount}
                        wrongQuestion={wrongQuestions}
                        id={id}
                        duration={timeLeft}
                        onTimerEnd={handleTimerEnd}
                    />
                </div>
            )}
        </QuestionPageContainer>
    );
};

export default QuestionPage;
