import jwtDecode from "jwt-decode";

export const hashExpiredTokenv = (token) => {
  const { exp } = jwtDecode(token);
  const currentData = new Date().getTime();

  if (exp <= currentData) {
    return true;
  }

  return false;
};
