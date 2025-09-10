import { configureStore } from "@reduxjs/toolkit";
import examReducer from "./examSlice"; // Exam state management
import userReducer from "./userSlice";

// Create Redux Store
export const store = configureStore({
  reducer: {
    user: userReducer, // Handles user authentication & profile
    exam: examReducer, // Manages exam-related state
  },
});
