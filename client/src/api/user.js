import { ENV } from "../utils";

export class User {
  baseApi = ENV.BASE_API;

  async getMe(accesToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createUser(accesToken, data) {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append("avatar", data.fileAvatar);
      }
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUsers(accesToken, active = undefined) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USERS}?active=${active}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(accesToken, idUser, userData) {
    // actualizar usuario
    try {
      const data = userData;
      if (!data.password) {
        delete data.password;
      }

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append("avatar", data.fileAvatar);
      }

      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER}/${idUser}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
        body: formData,
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(accesToken, idUser) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER}/${idUser}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accesToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
