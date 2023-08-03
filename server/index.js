const mongoose = require("mongoose");
const app = require("./app");
const {
  DB_PASSWORD,
  DB_HOST,
  DB_USER,
  IP_SERVER,
  API_VERSION,
} = require("./constant");

const PORT = process.env.POST || 3977;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}/`
  )
  .then(() => {
    console.log("Conexión exitosa a MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB Atlas", error);
  });

app.listen(PORT, () => {
  console.log("####################");
  console.log("##### API REST #####");
  console.log("###################");
  console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
});
