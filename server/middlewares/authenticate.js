const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    res
      .status(403)
      .send({ msg: "la peticion no tiene la cabecera DE autenticacion" });
  }
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const payload = jwt.decode(token);

    const { exp } = payload;
    const currentData = new Date().getTime();

    if (exp <= currentData) {
      return res.status(400).send({ msg: "el Token ha expirado" });
    }

    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "token invalido" });
  }
}

module.exports = {
  asureAuth,
};
