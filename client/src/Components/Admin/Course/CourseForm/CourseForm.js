import React, { useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { Course } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
import { initialValues, validationSchema } from "./CourseForm.form";
import "./CourseForm.scss";

const courseController = new Course();

export function CourseForm(props) {
  const { onClose, onReload, course } = props;
  const { accesToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(course),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (!course) {
          await courseController.createCourse(accesToken, formValue);
        } else {
          await courseController.updateCourse(
            accesToken,
            course._id,
            formValue
          );
        }

        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });
  //eslint-disable-next-line
  const onDrop = useCallback((acceptedfiles) => {
    const file = acceptedfiles[0];
    formik.setFieldValue("miniature", URL.createObjectURL(file)); // para mostrar en el formulario
    formik.setFieldValue("file", file); // para subirlo al servidor
  });

  const { getRootProps, getInputProps } = useDropzone({
    //para poder arrastrar las imagenes
    accept: "image/jpeg, image/png",
    onDrop,
  });

  const getMiniature = () => {
    //para subir imagen
    if (formik.values.file) {
      return formik.values.miniature;
    } else if (formik.values.miniature) {
      return `${ENV.BASE_PATH}/${formik.values.miniature}`;
    }
    return null;
  };

  return (
    <Form className="course-form" onSubmit={formik.handleSubmit}>
      <div className="course-form__miniature" {...getRootProps()}>
        <input {...getInputProps()} />
        {getMiniature() ? ( // si no tiene imagen
          <Image size="small" src={getMiniature()} />
        ) : (
          <div>
            <span>Arrastra tu Miniatura</span>
          </div>
        )}
      </div>

      <Form.Input
        name="title"
        placeholder="Nombre del curso"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Input
        name="url"
        placeholder="link del curso"
        onChange={formik.handleChange}
        value={formik.values.url}
        error={formik.errors.url}
      />
      <Form.TextArea
        name="description"
        placeholder="Pequeña descripción del curso"
        onChange={formik.handleChange}
        value={formik.values.description}
        error={formik.errors.description}
      />
      <Form.Group widths="equal">
        <Form.Input
          type="number"
          name="price"
          placeholder="precio del curso"
          onChange={formik.handleChange}
          value={formik.values.price}
          error={formik.errors.price}
        />
        <Form.Input
          type="number"
          name="score"
          placeholder="Puntuación del curso"
          onChange={formik.handleChange}
          value={formik.values.score}
          error={formik.errors.score}
        />
      </Form.Group>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {!course ? "Crear curso" : "Actualizar curso"}
      </Form.Button>
    </Form>
  );
}
