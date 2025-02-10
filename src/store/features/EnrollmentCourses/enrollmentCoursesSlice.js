import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
};

const enrollmentCoursesSlice = createSlice({
  name: "enrollmentCourses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courseList.push(action.payload);
    },
    setCourses: (state, action) => {
      state.courseList = [...action.payload];
    },
  },
});

export const { addCourse, setCourses } = enrollmentCoursesSlice.actions;

export default enrollmentCoursesSlice.reducer;
