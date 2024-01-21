import React, { useState, useEffect } from "react";
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

const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: -20px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: absolute;
  width: 100%;
  background-color: #fff;
  z-index: 1;
`;

const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
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
    const [serverSubjects, setServerSubjects] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const token = localStorage.getItem("adminToken");
    const navigate = useNavigate();

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await api.get("/api/quest/questions");
            const uniqueSubjects = [
                ...new Set(response.data.map((item) => item.subject)),
            ];
            setServerSubjects(uniqueSubjects);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name && name.includes("choice")) {
            const choiceKey = name.slice(-1);
            setFormData({
                ...formData,
                choices: {
                    ...formData.choices,
                    [choiceKey]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        // Filter suggestions based on the input value
        const filteredSuggestions = serverSubjects.filter((subject) =>
            subject.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSubjectSelect = (subject) => {
        setFormData({
            ...formData,
            subject,
        });
        setSuggestions([]); // Clear suggestions when a subject is selected
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await api.post("/api/quest/add-question", {
                questions: [formData],
                adminId: token,
            });

            console.log("Question created/updated successfully");
            navigate("/");
        } catch (error) {
            console.error("Error creating/updating question:", error);
        }
    };

    return (
        <QuestionFormContainer>
            <QuestionFormHeader>Question Form</QuestionFormHeader>
            <form onSubmit={handleSubmit}>
                <QuestionFormLabel style={{ position: "relative" }}>
                    Subject:
                    <QuestionFormInput
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        autoComplete="off" // Disable browser autocomplete
                    />
                    {/* Render suggestions */}
                    {suggestions.length > 0 && (
                        <SuggestionsList>
                            {suggestions.map((subject) => (
                                <SuggestionItem
                                    key={subject}
                                    onClick={() => handleSubjectSelect(subject)}
                                >
                                    {subject}
                                </SuggestionItem>
                            ))}
                        </SuggestionsList>
                    )}
                </QuestionFormLabel>
                <br />
                <QuestionFormLabel>
                    Question:
                    <QuestionFormTextarea
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                    />
                </QuestionFormLabel>
                <br />

                {Object.entries(formData.choices).map(([choiceKey, choiceValue]) => (
                    <div key={choiceKey}>
                        <QuestionFormLabel htmlFor={`choice${choiceKey}`}>
                            {`Choice ${choiceKey}:`}
                        </QuestionFormLabel>
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
