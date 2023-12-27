import React, { useEffect, useState } from "react";
import api from "../services/api";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

const QuestionListContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
`;

const QuestionListHeader = styled.h2`
  color: #333;
`;

const QuestionListItem = styled.li`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuestionListParagraph = styled.p`
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;
`;

const QuestionListStrong = styled.strong`
  font-weight: bold;
  color: #007bff;
`;

const QuestionListHR = styled.hr`
  border: 0;
  border-top: 1px solid #ddd;
  margin: 20px 0;
`;

const QuestionListButton = styled.button`
  padding: 8px 12px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Function to fetch questions from the backend
        const fetchQuestions = async () => {
            try {
                // Make an API request to get the list of questions
                await api
                    .get("/api/quest/questions")
                    .then((response) => {
                        // Assuming the response contains an array of questions
                        const questionsData = response.data;
                        console.log(response);

                        // Update the state with the fetched questions
                        setQuestions(questionsData);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.error("Error fetching questions:", error);
                // Handle error, show error message, etc.
            }
        };

        // Call the fetchQuestions function when the component mounts
        fetchQuestions();
    }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

    const handleDelete = async (questionId) => {
        try {
            // Make an API request to delete the question
            await api
                .delete(`/api/quest/delete-question/${questionId}`)
                .then((res) => {
                    // Update the local state to remove the deleted question
                    setQuestions((prevQuestions) =>
                        prevQuestions.filter((question) => question.id !== questionId)
                    );

                    console.log("Question deleted successfully.");
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    return (
        <QuestionListContainer>
            <QuestionListHeader>
                Question List-({questions.length})
            </QuestionListHeader>
            <ul style={{ listStyle: "none" }}>
                {questions?.map((question) => (
                    <QuestionListItem key={question.id}>
                        <QuestionListParagraph>
                            <QuestionListStrong>Subject:</QuestionListStrong>{" "}
                            {question.subject}
                        </QuestionListParagraph>
                        <QuestionListParagraph>
                            <QuestionListStrong>Question:</QuestionListStrong>{" "}
                            {question.question}
                        </QuestionListParagraph>
                        <QuestionListParagraph>
                            <QuestionListStrong>Choices:</QuestionListStrong>
                            {Object.entries(question?.choices || {}).map(
                                ([choiceKey, choiceValue]) => (
                                    <li key={choiceKey}>{`${choiceKey}: ${choiceValue}`}</li>
                                )
                            )}
                        </QuestionListParagraph>
                        <QuestionListParagraph>
                            <QuestionListStrong>Correct Choice:</QuestionListStrong>{" "}
                            {question.correct_choice}
                        </QuestionListParagraph>
                        <QuestionListButton onClick={() => handleDelete(question?.id)}>
                            Delete
                        </QuestionListButton>
                        <QuestionListHR />
                    </QuestionListItem>
                ))}
            </ul>
        </QuestionListContainer>
    );
};

export default QuestionList;
