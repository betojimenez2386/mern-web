import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../Components/Shared";
import { ListMenu, MenuForm } from "../../../Components/Admin/Menu";
import "./Menu.scss";

export function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevstate) => !prevstate); // para abrir el Modal
  const onReload = () => setReload((prevstate) => !prevstate);
  const panes = [
    {
      menuItem: "Menus Activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMenu active={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Menus Inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMenu active={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="menu-page">
        <Button className="menu-page__add" primary onClick={onOpenCloseModal}>
          Nuevo menu
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Crear menu">
        <MenuForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
