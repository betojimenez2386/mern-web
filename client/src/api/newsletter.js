import { ENV } from "../utils";

export class Newsletter {
  baseApi = ENV.BASE_API;

  async getEmails(accesToken, page = 1, limit = 10) {
    try {
      const pageFilter = `page=${page}`;
      const limitFilter = `limit=${limit}`;
      const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}?${pageFilter}&${limitFilter}`;
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

  async deleteEmail(accesToken, idEmail) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}/${idEmail}`;
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

  async registerEmail(email) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
