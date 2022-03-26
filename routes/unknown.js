const Router = require("express").Router();
const AppError = require("../utils/app-error");

Router.all("*", (req) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

module.exports = Router;
