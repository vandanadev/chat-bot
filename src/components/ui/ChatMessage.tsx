import React from "react";
import { Chip, Avatar, Box } from "@mui/material";
import { Message } from "../PreConsult/types";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => (
  <Box
    sx={{
      alignSelf: message.type === "bot" ? "flex-start" : "flex-end",
      maxWidth: "80%",
      width: "fit-content",
      mb: 1,
      overflowWrap: "break-word",
      wordBreak: "break-word",
      whiteSpace: "pre-line",
      "& .MuiChip-root": {
        height: "auto",
        alignItems: "flex-start",
      },
      "& .MuiChip-label": {
        whiteSpace: "pre-wrap",
        textOverflow: "unset",
        overflow: "unset",
      },
    }}
  >
    <Chip
      avatar={
        <Avatar
          sx={{
            bgcolor: message.type === "bot" ? "#e3f2fd" : "#1976d2",
            color: message.type === "bot" ? "#1565c0" : "white",
          }}
        >
          {message.type === "bot" ? "🤖" : "🧑"}
        </Avatar>
      }
      label={message.text}
      sx={{
        background: message.type === "bot" ? "#e3f2fd" : "#1976d2",
        color: message.type === "bot" ? "#1565c0" : "white",
        borderRadius: 3,
        fontSize: "1rem",
        boxShadow: 1,
        p: 1.5,
        animation: "fadeIn 0.3s ease",
        wordBreak: "break-word",
        whiteSpace: "pre-line",
        overflowWrap: "anywhere",
      }}
    />
  </Box>
);

export default ChatMessage;
