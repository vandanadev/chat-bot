import React from "react";
import { Button, Box } from "@mui/material";

interface QuickRepliesProps {
  replies: string[];
  onReply: (reply: string) => void;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ replies, onReply }) => (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 1,
      p: 1,
      alignItems: "center",
    }}
  >
    {replies.map((reply, idx) => (
      <Button
        key={idx}
        variant="outlined"
        color="primary"
        sx={{ borderRadius: 5, textTransform: "none" }}
        onClick={() => onReply(reply)}
      >
        {reply}
      </Button>
    ))}
  </Box>
);

export default QuickReplies;
