const {Router} = require("express");
const {getDriversHandler} = require("../handlers/getDrivHandler");
const {getIdHandler} = require("../handlers/getIdHandler");
const {createDriversHandler} = require("../handlers/postDrivHandler");

const driversRouter = Router();

driversRouter.get("/", getDriversHandler);
driversRouter.get("/:id", getIdHandler);
driversRouter.post("/", createDriversHandler);


module.exports = driversRouter;