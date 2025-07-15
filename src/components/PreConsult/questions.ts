export const medicalQuestions = [
  {
    id: 1,
    question:
      "Do you have any allergies to medications? If yes, please specify.",
    type: "text",
  },
  {
    id: 2,
    question: "Are you currently taking any medications? Please list them.",
    type: "text",
  },
  {
    id: 3,
    question: "Have you had any surgeries in the past? If yes, please specify.",
    type: "text",
  },
  {
    id: 4,
    question: "Do you smoke? If yes, how many cigarettes per day?",
    type: "text",
  },
  {
    id: 5,
    question: "Do you consume alcohol? If yes, how often?",
    type: "text",
  },
  {
    id: 6,
    question:
      "Do you have any chronic conditions (e.g., diabetes, hypertension)?",
    type: "text",
  },
  {
    id: 7,
    question: "Have you experienced any unusual symptoms recently?",
    type: "text",
  },
  {
    id: 8,
    question: "Is there a history of cancer in your family?",
    type: "text",
  },
  {
    id: 9,
    question: "Have you been hospitalized in the past year? If yes, why?",
    type: "text",
  },
  {
    id: 10,
    question: "Do you exercise regularly? If yes, how often?",
    type: "text",
  },
];

// Pick unique questions
export const getRandomQuestions = (count: number = 5) => {
  const usedIds = new Set<number>();
  const result = [];
  const questionsCopy = [...medicalQuestions];
  while (result.length < count && questionsCopy.length > 0) {
    const idx = Math.floor(Math.random() * questionsCopy.length);
    const q = questionsCopy[idx];
    if (!usedIds.has(q.id)) {
      result.push(q);
      usedIds.add(q.id);
    }
    questionsCopy.splice(idx, 1);
  }
  return result;
};
