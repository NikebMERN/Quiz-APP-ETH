import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const QuestionFormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
`;

const QuestionFormHeader = styled.h2`
  color: #333;
`;

const QuestionFormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #333;
`;

const QuestionFormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
`;

const QuestionFormTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
`;

const QuestionFormButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuestionForm = () => {
    const [formData, setFormData] = useState({
        subject: "",
        question: "",
        choices: {
            A: "",
            B: "",
            C: "",
            D: "",
        },
        correctChoice: "",
    });
    const token = localStorage.getItem("adminToken");
    const navigate = useNavigate();
    
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name.startsWith("choice")) {
            // If the field is a choice, update the choices object
            const choiceKey = name.slice(-1); // Extract the choice key (A, B, C, D)
            setFormData({
                ...formData,
                choices: {
                    ...formData.choices,
                    [choiceKey]: value,
                },
            });
        } else {
            // If not a choice, update the form data
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        try {
            // Make an API request to create or update a question
            await api
                .post("/api/quest/add-question", {
                    questions: [formData],
                    adminId: token,
                })
                .then((response) => {
                    // Handle success, e.g., show a success message or redirect
                    console.log("Question created/updated successfully:", response.data);
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.error("Error creating/updating question:", error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <QuestionFormContainer>
            <QuestionFormHeader>Question Form</QuestionFormHeader>
            <form onSubmit={handleSubmit}>
                <QuestionFormLabel>
                    Subject:
                    <QuestionFormInput
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </QuestionFormLabel>
                <br />
                <QuestionFormLabel>
                    Question:
                    <QuestionFormTextarea
                        name="question"
                        value={formData.question}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </QuestionFormLabel>
                <br />

                {Object.entries(formData.choices).map(([choiceKey, choiceValue]) => (
                    <div key={choiceKey}>
                        <QuestionFormLabel
                            htmlFor={`choice${choiceKey}`}
                        >{`Choice ${choiceKey}:`}</QuestionFormLabel>
                        <QuestionFormInput
                            type="text"
                            id={`choice${choiceKey}`}
                            name={`choice${choiceKey}`}
                            value={choiceValue}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                <br />
                <QuestionFormLabel>
                    Correct Choice:
                    <QuestionFormInput
                        type="text"
                        name="correctChoice"
                        value={formData.correctChoice}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </QuestionFormLabel>
                <br />
                <QuestionFormButton type="submit">Submit</QuestionFormButton>
            </form>
        </QuestionFormContainer>
    );
};

export default QuestionForm;
