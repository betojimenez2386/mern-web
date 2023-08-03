const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const user = require("../models/user");

function register(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!email) res.send(400).send({ msg: "El email es obligatorio" });
  if (!password) res.send(400).send({ msg: "La contraseña es obligatoria" });

  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: false,
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;
  const saveUser = async () => {
    try {
      await user.save();
      res.status(200).send({ msg: "Se ha creado el Usuario" });
    } catch (error) {
      res.status(400).send({ msg: "Error al crear el Usuario" });
      console.log("error de servidor", error);
    }
  };
  saveUser();
}
async function login(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "El password es obligatorio" });

  const emailLowerCase = email.toLowerCase();

  try {
    const userStore = await User.findOne({ email: emailLowerCase });
    bcrypt.compare(password, userStore.password, (bcryptError, check) => {
      if (bcryptError) {
        res.status(500).send({ msg: "Error del servidor" });
      } else if (!check) {
        res.status(400).send({ msg: "Contraseña incorrecta" });
      } else if (!userStore.active) {
        res.status(401).send({ msg: "Usuario no autorizado o no activo" });
      } else {
        res.status(200).send({
          access: jwt.createAccesToken(userStore),
          refresh: jwt.createRefreshToken(userStore),
        });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function refreshAccesToken(req, res) {
  const { token } = req.body;

  if (!token) res.status(400).send({ msg: "token requerido" });

  const { user_id } = jwt.decode(token);
  try {
    const response = await User.findOne({ _id: user_id });
    console.log(response);
    res.status(200).send({
      accessToken: jwt.createAccesToken(response),
    });
  } catch (error) {
    res.status(500).send({ msg: "Error en el Servidor " });
    console.log(error);
  }
}

/*function login(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "la contraseña es obligatoria" });

  const emailLowercase = email.toLowerCase();

  user.findOne({ email: emailLowercase }, (error, userStore) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      bcrypt.compare(password, userStore.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del servidor" });
        }
      });
    }
  });
}*/

module.exports = {
  register,
  login,
  refreshAccesToken,
};
