import { configureStore } from "@reduxjs/toolkit";
import enrollmentCoursesSlice from "./features/EnrollmentCourses/enrollmentCoursesSlice";

export const store = configureStore({
  reducer: {
    enrollmentCourses: enrollmentCoursesSlice,
  },
});
