//Importación de módulos y configuración inicial
const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;

//Sincronización de la base de datos
conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {  //Inicio del servidor Express
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
