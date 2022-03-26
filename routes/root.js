const Router = require("express").Router();

Router.get("/", (_, res) => {
    res.status(200).json({ status: 1, message: "Hello World" });
});

module.exports = Router;
