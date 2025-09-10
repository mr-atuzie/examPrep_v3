import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSubject: null,
  selectedYear: null,
  questions: [],
  currentQuestionIndex: 0,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setExamDetails: (state, action) => {
      state.selectedSubject = action.payload.selectedSubject;
      state.selectedYear = action.payload.selectedYear;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.currentQuestionIndex = 0;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
  },
});

export const { setExamDetails, setQuestions, nextQuestion, previousQuestion } =
  examSlice.actions;
export default examSlice.reducer;
