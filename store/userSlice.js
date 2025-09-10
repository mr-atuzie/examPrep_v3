import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  name: null,
  email: null,
  image: null,
  country: null,
};

// Async thunk to load user from AsyncStorage
export const loadUserFromStorage = createAsyncThunk(
  "user/loadUserFromStorage",
  async (_, { rejectWithValue }) => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue !== null) {
        const user = JSON.parse(jsonValue);
        return user;
      } else {
        return rejectWithValue("No user found");
      }
    } catch (error) {
      console.log("Error loading user from AsyncStorage:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.country = action.payload.country;

      // Save to AsyncStorage
      AsyncStorage.setItem("user", JSON.stringify(action.payload)).catch(
        (err) => console.log("Error saving user:", err)
      );
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.image = null;

      // Remove from AsyncStorage
      AsyncStorage.removeItem("user").catch((err) =>
        console.log("Error removing user:", err)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserFromStorage.fulfilled, (state, action) => {
      const { name, email, image } = action.payload;
      state.name = name;
      state.email = email;
      state.image = image;
    });
  },
});

// Exports
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
