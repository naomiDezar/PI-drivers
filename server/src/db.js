//Configuración de las variables de entorno Sequelize
require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

//Creación de la instancia de Sequelize

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`, {
  logging: false, 
  native: false, 
});
const basename = path.basename(__filename);

const modelDefiners = [];

//Carga de modelos

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

//Definición de los modelos en Sequelize

modelDefiners.forEach(model => model(sequelize));

//Transformación de nombres de modelos en formato camelCase

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Driver, Team } = sequelize.models;
// Aca vendrian las relaciones
// Product.hasMany(Reviews);


//Definición de relación entre modelos

Driver.belongsToMany(Team, { through: 'DriverTeam' });
Team.belongsToMany(Driver, { through: 'DriverTeam' });

//Exportación de modelos y la conexión Sequelize

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};