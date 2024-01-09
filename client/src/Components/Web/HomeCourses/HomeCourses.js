import React, { useState, useEffect } from "react";
import { Container, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { Course } from "../../../api";
import { ENV } from "../../../utils";
import "./HomeCourses.scss";

const courseController = new Course();

export function HomeCourses() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses({ limit: 6 });
        setCourses(response.docs);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <Container>
      <h2>Aprende y mejora tus habilidades </h2>
      <div className="home-courses__all-courses">
        {map(courses, (course) => (
          <a key={course.id} href={course.url} rel="_blank">
            <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
            <div>
              <span>{course.title} </span>
              <span>{course.description} </span>
            </div>
          </a>
        ))}
      </div>

      <div className="home-courses__more">
        <Button as={Link} to="/courses" primary>
          ver más
        </Button>
      </div>
    </Container>
  );
}
