import * as yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
    conditionAccepted: false,
  };
}

export function validationSchema() {
  return yup.object({
    email: yup
      .string()
      .email("El email no es valido")
      .required("Campo obligatorio"),
    password: yup.string().required("Campo obligatorio"),
    repeatPassword: yup
      .string()
      .required("Campo obligatorio")
      .oneOf([yup.ref("password"), "Las contraseñas deben de ser iguales"]),
    conditionAccepted: yup.bool().isTrue(true),
  });
}
