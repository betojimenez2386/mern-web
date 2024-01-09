import { ENV } from "../utils";

export class Course {
  baseApi = ENV.BASE_API;

  async createCourse(accesToken, data) {
    try {
      const formData = new FormData(); // para iterar y sacar el valor de cada Key
      Object.keys(data).forEach((Key) => {
        formData.append(Key, data[Key]);
      });

      if (data.file) {
        formData.append("miniature", data.file);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.COURSES}`; // use la const courses para crear curso
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
    } catch (error) {
      throw error;
    }
  }

  async getCourses(params) {
    try {
      const pageFilter = `page=${params?.page || 1}`;
      const limitFilter = `limit=${params?.limit || 10}`;
      const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}?${pageFilter}&${limitFilter} `;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateCourse(accesToken, idCourse, data) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((Key) => {
        formData.append(Key, data[Key]);
      });

      if (data.file) {
        formData.append("miniature", data.file);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.COURSES}/${idCourse}`;
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

  async deleteCourse(accesToken, idCourse) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.COURSES}/${idCourse}`;
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
