const Menu = require("../models/menu");

async function createMenu(req, res) {
  const menu = new Menu(req.body);

  try {
    const menuStored = await menu.save();
    console.log(menuStored);
    res.status(200).send(menuStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el menu" });
    console.log(error);
  }
}

async function getMenus(req, res) {
  const { active } = req.query;

  let response = null;

  if (active === undefined) {
    response = await Menu.find().sort({ order: "asc" });
  } else {
    response = await Menu.find({ active });
  }

  if (!response) {
    res.status(400).send({ msg: "No se ha enctrado ningun menu" });
  } else {
    res.status(200).send(response);
  }
}

async function updateMenu(req, res) {
  const { id } = req.params;
  const menuData = req.body;

  try {
    const response = await Menu.findByIdAndUpdate({ _id: id }, menuData);
    console.log(response);
    res.status(200).send({ msg: "Actualizacion correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar el menu" });
    console.log(error);
  }
}

async function deleteMenu(req, res) {
  const { id } = req.params;

  try {
    const response = await Menu.findByIdAndDelete({ _id: id });
    console.log(response);
    res.status(200).send({ msg: "Menu eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar menu" });
    console.log(error);
  }
}

module.exports = {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
};
