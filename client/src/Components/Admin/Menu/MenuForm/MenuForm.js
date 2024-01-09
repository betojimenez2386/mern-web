import React from "react";
import { Form, Dropdown, Input } from "semantic-ui-react"; //  crear formulario
import { useFormik } from "formik";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./MenuForm.form";

const menuController = new Menu();

export function MenuForm(props) {
  const { onClose, onReload, menu } = props;
  const { accesToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(menu), // pasar los datos de menu
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = {
          title: formValue.title,
          path: `${formValue.protocol}${formValue.path}`,
          order: formValue.order,
          active: formValue.active,
        };

        if (menu) {
          data.path = formValue.path;
          await menuController.updateMenu(accesToken, menu._id, data); //actualizar menu
        } else {
          await menuController.createMenu(accesToken, data);
        }

        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths={"equal"}>
        <Form.Input
          name="title"
          placeholder="título"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <Form.Input
          name="order"
          type="number"
          placeholder="order"
          onChange={formik.handleChange}
          value={formik.values.order}
          error={formik.errors.order}
        />
      </Form.Group>

      <Input
        name="path"
        placeholder="URL"
        fluid
        onChange={formik.handleChange}
        value={formik.values.path}
        error={formik.errors.path}
        label={
          !menu ? (
            <Dropdown
              options={options}
              onChange={(_, data) =>
                formik.setFieldValue("protocol", data.value)
              }
              value={formik.values.protocol}
              error={formik.errors.protocol}
            />
          ) : null
        }
      />

      <Form.Group />

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {menu ? "Actualizar menú" : "Crear menu"}
      </Form.Button>
    </Form>
  );
}

const options = [
  { key: "https://", text: "https://", value: "https://" },
  { key: "http://", text: "http://", value: "http://" },
  { key: "/", text: "/", value: "/" },
];
