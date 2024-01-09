import React from "react";
import {
  Banner,
  HomeCourses,
  HowMyCoursesWork,
  Reviews,
} from "../../../Components/Web";
export function Home() {
  return (
    <div>
      <Banner />
      <HomeCourses />
      <HowMyCoursesWork />
      <Reviews />
    </div>
  );
}
