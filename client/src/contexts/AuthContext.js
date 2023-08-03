import { useEffect, useState, createContext } from "react";
import { User, Auth } from "../api";
import { hashExpiredTokenv } from "../utils";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  /*eslint-disable */
  useEffect(() => {
    (async () => {
      const accesToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();

      if (!accesToken || !refreshToken) {
        logout();
        setLoading(false);
        return;
      }

      if (hashExpiredTokenv(accesToken)) {
        if (hashExpiredTokenv(refreshToken)) {
          logout();
        } else {
          await reLogin(refreshToken);
        }
      } else {
        await login(accesToken);
      }
      setLoading(false);
    })();
  }, []);

  const reLogin = async (refreshToken) => {
    try {
      const { accesToken } = await authController.refreshAccessToken(
        refreshToken
      );
      authController.setAccessToken(accesToken);
      await login(accesToken);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (accesToken) => {
    try {
      const response = await userController.getMe(accesToken);
      delete response.password;

      setUser(response);
      setToken(accesToken);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };

  const data = {
    accesToken: token,
    user,
    login,
    logout,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children} </AuthContext.Provider>;
}
