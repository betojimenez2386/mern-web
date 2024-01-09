import React, { useState } from "react";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { BasicModal } from "../../../Shared";
import { ENV } from "../../../../utils";
import { UserForm } from "../UserForm";
import "./UserItem.scss";

const userController = new User();

export function UserItem(props) {
  const { user, onReload } = props;
  const { accesToken } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMesage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onOpenUpdateUser = () => {
    setTitleModal(`Actualizar ${user.email}`);
    onOpenCloseModal(); // actualizar usuarios
  };

  const openDesactivateActivateConfirm = () => {
    setIsDelete(false);
    setConfirmMessage(
      user.active
        ? `Desactivar usuario ${user.email}`
        : `Activar usuario ${user.email}`
    );
    onOpenCloseConfirm();
  };

  const onActivateDesactivate = async () => {
    // activar usuarios
    try {
      await userController.updateUser(accesToken, user._id, {
        active: !user.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      throw error;
    }
  };

  const openDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Eliminar usuario ${user.email}`);
    onOpenCloseConfirm();
  };

  const onDelete = async () => {
    try {
      await userController.deleteUser(accesToken, user._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="user-item">
        <div className="user-item__info">
          <Image
            avatar
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
          />
          <div>
            <p>
              {user.firstname} {user.lastname}
            </p>
            <p>{user.email} </p>
          </div>
        </div>
        <div>
          <Button icon primary onClick={onOpenUpdateUser}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={user.active ? "orange" : "teal"}
            onClick={openDesactivateActivateConfirm}
          >
            <Icon name={user.active ? "ban" : "check"} />
          </Button>
          <Button icon color="red" onClick={openDeleteConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <UserForm close={onOpenCloseModal} onReload={onReload} user={user} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDelete : onActivateDesactivate}
        content={confirmMesage}
        size="mini"
      />
    </>
  );
}
