import React from "react";
import { Box } from "@mui/material";
import ChatMessage from "../ui/ChatMessage";
import TypingIndicator from "../ui/TypingIndicator";
import { Message } from "./types";

interface PreConsultChatAreaProps {
  messages: Message[];
  showTyping: boolean;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
}

const PreConsultChatArea: React.FC<PreConsultChatAreaProps> = ({
  messages,
  showTyping,
  chatEndRef,
}) => (
  <Box
    sx={{
      flex: 1,
      p: 2,
      background: "#f8f9fa",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      overflowY: "auto",
      scrollbarWidth: "thin",
      maxHeight: { xs: "50vh", sm: "55vh", md: "60vh" },
    }}
  >
    {messages.map((msg, idx) => (
      <ChatMessage key={idx} message={msg} />
    ))}
    <TypingIndicator show={showTyping} />
    <div ref={chatEndRef} />
  </Box>
);

export default PreConsultChatArea;
