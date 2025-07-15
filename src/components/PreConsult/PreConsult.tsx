import React, { useEffect, useRef, useState } from "react";
import { Container, Paper } from "@mui/material";
import { getRandomQuestions } from "./questions";
import PreConsultHeader from "./PreConsultHeader";
import PreConsultProgress from "./PreConsultProgress";
import PreConsultChatArea from "./PreConsultChatArea";
import PreConsultInputArea from "./PreConsultInputArea";
import { Message, PatientInfo, Question, QuestionResponse } from "./types";

const PreConsult: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [inputDisabled, setInputDisabled] = useState(true);
  const [step, setStep] = useState<
    | "welcome"
    | "consent"
    | "name"
    | "dob"
    | "gender"
    | "questions"
    | "completed"
  >("welcome");
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: "",
    dob: "",
    gender: "",
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionResponses, setQuestionResponses] = useState<
    QuestionResponse[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuestions(getRandomQuestions(5));
    setTimeout(() => {
      addBotMessage(
        "Hello! I'm your PreConsult Assistant. I would like to ask you some questions before you visit the doctor. Do you agree?"
      );
      setQuickReplies(["Yes", "No"]);
      setStep("consent");
      setInputDisabled(true);
    }, 500);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showTyping]);

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { type: "bot", text }]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { type: "user", text }]);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
    setQuickReplies([]);
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      processResponse(reply);
    }, 1000);
  };

  const handleInputSend = () => {
    if (!input.trim()) return;
    addUserMessage(input);
    setInput("");
    setInputDisabled(true);
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      processResponse(input);
    }, 1000);
  };

  const processResponse = async (response: string) => {
    switch (step) {
      case "consent": {
        const normalized = response.trim().toLowerCase();
        if (
          normalized === "yes" ||
          normalized === "i'm ready" ||
          normalized === "im ready"
        ) {
          addBotMessage(
            "Great! Let's start with some basic information. What is your name?"
          );
          setStep("name");
          setInputDisabled(false);
          setInput("");
        } else {
          addBotMessage(
            "I understand. Please let me know when you're ready to begin."
          );
          setQuickReplies(["I'm Ready"]);
        }
        break;
      }
      case "name":
        if (response.trim().length < 2) {
          addBotMessage(
            "Please enter your full name (at least 2 characters). "
          );
          setInputDisabled(false);
        } else {
          setPatientInfo((prev) => ({ ...prev, name: response.trim() }));
          addBotMessage(
            `Nice to meet you, ${response.trim()}! Now, what is your date of birth?`
          );
          setStep("dob");
          setInputDisabled(false);
          setInput("");
        }
        break;
      case "dob":
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(response.trim())) {
          addBotMessage(
            "Please enter your date of birth in DD/MM/YYYY format (e.g., 15/03/1990). "
          );
          setInputDisabled(false);
        } else {
          setPatientInfo((prev) => ({ ...prev, dob: response.trim() }));
          addBotMessage("Thank you! What is your gender?");
          setStep("gender");
          setQuickReplies(["Male", "Female", "Other", "Prefer not to say"]);
        }
        break;
      case "gender":
        setPatientInfo((prev) => ({ ...prev, gender: response }));
        addBotMessage(
          `Perfect! Now I'll ask you ${questions.length} medical questions to better understand your health. Let's begin:`
        );
        // Ensure we start at the first question
        setCurrentQuestionIndex(0);
        setTimeout(() => {
          askNextQuestion();
        }, 800);
        break;
      case "questions": {
        const q = questions[currentQuestionIndex];
        setQuestionResponses((prev) => [
          ...prev,
          {
            questionId: q.id,
            question: q.question,
            answer: response,
          },
        ]);
        if (currentQuestionIndex < questions.length - 1) {
          // Move to next question and ask it
          const nextIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextIndex);
          setTimeout(() => {
            // Only ask the next question, do not repeat the current one
            const nextQ = questions[nextIndex];
            addBotMessage(
              `Question ${nextIndex + 1}/${questions.length}: ${nextQ.question}`
            );
            setStep("questions");
            if (nextQ.options) {
              setQuickReplies(nextQ.options);
              setInputDisabled(true);
            } else {
              setQuickReplies([]);
              setInputDisabled(false);
              setInput("");
            }
          }, 500);
        } else {
          addBotMessage(
            "Thank you for answering all the questions! Let me submit your responses..."
          );
          setStep("completed");
          // Mock API call
          try {
            await mockApiCall({
              patientContext: patientInfo,
              userResponses: [
                ...questionResponses,
                {
                  questionId: q.id,
                  question: q.question,
                  answer: response,
                },
              ],
            });
            setTimeout(() => {
              addBotMessage(
                "✅ Thank you! Your responses have been securely stored and will be reviewed by your doctor. 🔒 Your information is secure and confidential."
              );
            }, 1500);
          } catch (error) {
            addBotMessage(
              "Sorry, there was an error submitting your responses. Please try again."
            );
          }
        }
        break;
      }
      default:
        break;
    }
  };

  const askNextQuestion = () => {
    const q = questions[0];
    addBotMessage(`Question 1/${questions.length}: ${q.question}`);
    setStep("questions");
    if (q.options) {
      setQuickReplies(q.options);
      setInputDisabled(true);
    } else {
      setQuickReplies([]);
      setInputDisabled(false);
      setInput("");
    }
  };

  // Progress calculation
  const getProgress = () => {
    const totalSteps = 3 + questions.length;
    let current = 0;
    if (step === "consent") current = 1;
    else if (step === "name") current = 2;
    else if (step === "dob") current = 3;
    else if (step === "gender") current = 4;
    else if (step === "questions") current = 4 + currentQuestionIndex + 1;
    else if (step === "completed") current = totalSteps;
    return Math.round((current / totalSteps) * 100);
  };

  const mockApiCall = async (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Data submitted:", data);
        resolve(true);
      }, 1000);
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper
        elevation={6}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PreConsultHeader />
        <PreConsultProgress value={getProgress()} />
        <PreConsultChatArea
          messages={messages}
          showTyping={showTyping}
          chatEndRef={chatEndRef}
        />
        <PreConsultInputArea
          quickReplies={quickReplies}
          step={step}
          input={input}
          inputDisabled={inputDisabled}
          handleQuickReply={handleQuickReply}
          handleInputSend={handleInputSend}
          setInput={setInput}
        />
      </Paper>
    </Container>
  );
};

export default PreConsult;
