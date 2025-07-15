import React from "react";
import { Box, Typography } from "@mui/material";

const PreConsultHeader: React.FC = () => (
  <Box
    sx={{
      background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
      color: "white",
      py: 2,
      textAlign: "center",
      boxShadow: 2,
    }}
  >
    <Typography variant="h5" fontWeight={700}>
      🏥 PreConsult Assistant
    </Typography>
    <Typography variant="body2" sx={{ opacity: 0.9 }}>
      Your personal medical consultation helper
    </Typography>
  </Box>
);

export default PreConsultHeader;
