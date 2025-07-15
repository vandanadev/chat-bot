import type { NextPage } from "next";
import Head from "next/head";
import PreConsult from "../components/PreConsult/PreConsult";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const Home: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>PreConsult - Medical Pre-Consultation Questionnaire</title>
        <meta
          name="description"
          content="Answer some questions before your doctor visit"
        />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PreConsult />
      </Container>
    </ThemeProvider>
  );
};

export default Home;
