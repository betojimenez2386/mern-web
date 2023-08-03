const post = require("../models/post");
const Post = require("../models/post");
const image = require("../utils/image");

async function createPost(req, res) {
  const post = new Post(req.body);
  post.created_at = new Date();

  const imagePath = image.getFilePath(req.files.miniature);
  post.miniature = imagePath;

  try {
    const postStored = await post.save();
    console.log(postStored);
    res.status(201).send(postStored);
  } catch (error) {
    res.status(400).send({ msg: " Error al crear el post" });
    console.log(error);
  }
}

async function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_at: "desc" },
  };

  try {
    const postsStored = await Post.paginate({}, options);
    console.log(postsStored);
    res.status(201).send(postsStored);
  } catch (error) {
    res.status(400).send({ msg: " Error al obtener los posts" });
    console.log(error);
  }
}

async function updatePost(req, res) {
  const { id } = req.params;
  const postData = req.body;

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature);
    postData.miniature = imagePath;
  }

  try {
    const response = await Post.findByIdAndUpdate({ _id: id }, postData);
    console.log(response);
    res.status(201).send({ msg: "Actulizacion correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actulizar el post" });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const response = await Post.findByIdAndDelete({ _id: id });
    console.log(response);
    res.status(200).send({ msg: " Post eliminado" });
  } catch (error) {
    res.status(400).send({ msg: " Error al eliminar el post" });
    console.log(error);
  }
}

async function getPost(req, res) {
  const { path } = req.params;

  try {
    const postStoreded = await Post.findOne({ path });
    if (!postStoreded) {
      res.status(400).send({ msg: "No se ha encontrado ningun post" });
    } else {
      console.log(postStoreded);
      res.status(200).send(postStoreded);
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
    console.log(error);
  }
}

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
};
