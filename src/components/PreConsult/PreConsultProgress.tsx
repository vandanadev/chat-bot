import React from "react";
import { LinearProgress } from "@mui/material";

const PreConsultProgress: React.FC<{ value: number }> = ({ value }) => (
  <LinearProgress variant="determinate" value={value} sx={{ height: 4 }} />
);

export default PreConsultProgress;
