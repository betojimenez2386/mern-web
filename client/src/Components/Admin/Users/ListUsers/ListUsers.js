import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { UserItem } from "../UserItem";

const userController = new User();

export function ListUsers(props) {
  const { usersActive, reload, onReload } = props;
  const [users, setUsers] = useState(null);
  const { accesToken } = useAuth();

  useEffect(() => {
    (async () => {
      setUsers(null);
      try {
        const response = await userController.getUsers(accesToken, usersActive);
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersActive, reload]); // para recargar los usuarios

  if (!users) return <Loader active inline="centered" />;
  if (size(users) === 0) return "No hay ningun usuario";

  return map(users, (user) => (
    <UserItem key={user._id} user={user} onReload={onReload} />
  ));
}
