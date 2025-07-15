export interface Message {
  type: "bot" | "user";
  text: string;
}

export interface PatientInfo {
  name: string;
  dob: string;
  gender: string;
}

export interface Question {
  id: number;
  question: string;
  options?: string[];
}

export interface QuestionResponse {
  questionId: number;
  question: string;
  answer: string;
}
