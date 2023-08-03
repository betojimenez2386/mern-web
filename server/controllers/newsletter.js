const Newsletter = require("../models/newsletter");

async function suscribeEmail(req, res) {
  const { email } = req.body;

  if (!email) res.status(400).send({ msg: " Email obligatorio" });

  const newsletter = new Newsletter({
    email: email.toLowerCase(),
  });

  try {
    const response = await newsletter.save();
    console.log(response);
    res.status(200).send({ msg: "Email registrado" });
  } catch (error) {
    res.status(400).send({ msg: "El email ya esta registrado" });
    console.log(error);
  }
}

async function getEmails(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const emailsStored = await Newsletter.paginate({}, options);
    console.log(emailsStored);
    res.status(200).send(emailsStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los emails" });
  }
}

async function deleteEmail(req, res) {
  const { id } = req.params;

  try {
    const response = await Newsletter.findByIdAndDelete(id);
    console.log(response);
    res.status(200).send({ msg: " Eliminación correcta" });
  } catch (error) {
    res.status(400).send({ msg: " Error al eliminar el registro" });
    console.log(error);
  }
}

module.exports = {
  suscribeEmail,
  getEmails,
  deleteEmail,
};
