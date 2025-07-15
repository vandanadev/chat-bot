import React from "react";
import { Box, Fade } from "@mui/material";
import { GlobalStyles } from "@mui/material";

const TypingIndicator: React.FC<{ show: boolean }> = ({ show }) => (
  <>
    <GlobalStyles
      styles={{
        "@keyframes typing": {
          "0%": { opacity: 0.2 },
          "20%": { opacity: 1 },
          "100%": { opacity: 0.2 },
        },
        "@keyframes blinkText": {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        "@keyframes blinkDots": {
          "0%": { opacity: 0.2 },
          "20%": { opacity: 1 },
          "100%": { opacity: 0.2 },
        },
        ".typing-text": {
          animation: "blinkText 1.2s steps(1, end) infinite",
        },
        ".typing-dots": {
          animation: "blinkDots 1.4s infinite",
        },
      }}
    />
    <Fade in={show}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          background: "#e3f2fd",
          borderRadius: 3,
          px: 2,
          py: 1,
          maxWidth: 160,
        }}
      >
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              bgcolor: "#1976d2",
              borderRadius: "50%",
              animation: "typing 1.4s infinite",
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              bgcolor: "#1976d2",
              borderRadius: "50%",
              animation: "typing 1.4s infinite 0.2s",
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              bgcolor: "#1976d2",
              borderRadius: "50%",
              animation: "typing 1.4s infinite 0.4s",
            }}
          />
        </Box>
        <Box
          sx={{
            ml: 1,
            fontWeight: 500,
            fontSize: 14,
            color: "#1976d2",
            letterSpacing: 1,
            position: "relative",
            minWidth: 70,
          }}
        >
          <span className="typing-text">Typing</span>
          <span className="typing-dots">...</span>
        </Box>
      </Box>
    </Fade>
  </>
);

export default TypingIndicator;
