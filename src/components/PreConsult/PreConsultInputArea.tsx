import React from "react";
import { Box, TextField, Button } from "@mui/material";
import PreConsultDatePicker from "./PreConsultDatePicker";
import QuickReplies from "../ui/QuickReplies";

interface PreConsultInputAreaProps {
  quickReplies: string[];
  step: string;
  input: string;
  inputDisabled: boolean;
  handleQuickReply: (reply: string) => void;
  handleInputSend: () => void;
  setInput: (val: string) => void;
}

const PreConsultInputArea: React.FC<PreConsultInputAreaProps> = ({
  quickReplies,
  step,
  input,
  inputDisabled,
  handleQuickReply,
  handleInputSend,
  setInput,
}) => (
  <Box
    sx={{
      background: "white",
      borderTop: "1px solid #e0e0e0",
      position: "sticky",
      bottom: 0,
    }}
  >
    {quickReplies.length > 0 && (
      <QuickReplies replies={quickReplies} onReply={handleQuickReply} />
    )}
    {step !== "completed" && (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          border: "1px solid #e0e0e0",
          p: 2,
          position: "relative",
        }}
      >
        {step === "dob" ? (
          <PreConsultDatePicker
            value={input}
            onChange={setInput}
            disabled={inputDisabled}
          />
        ) : (
          <TextField
            fullWidth
            placeholder={
              step === "name" ? "Enter your full name" : "Type your message..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !inputDisabled) handleInputSend();
            }}
            disabled={inputDisabled}
            sx={{
              "& .MuiInputBase-input": {
                padding: "16px 10px",
              },
              "& .MuiInputBase-root": {
                borderRadius: 5,
              },
            }}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 5, minWidth: 60 }}
          onClick={handleInputSend}
          disabled={inputDisabled || !input.trim()}
          endIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path d="M2 21l21-9-21-9v7l15 2-15 2v7z" fill="currentColor" />
            </svg>
          }
        >
          Send
        </Button>
      </Box>
    )}
  </Box>
);

export default PreConsultInputArea;
