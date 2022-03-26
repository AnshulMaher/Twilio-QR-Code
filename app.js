const path = require("path");
const express = require("express");
const cors = require("cors");

const { publicFolder } = require("./constants");
const RootRouter = require("./routes/root");
const SendCodeRouter = require("./routes/send-code");
const UnownRouter = require("./routes/unknown");
const app = express();

/* implement cors */
app.use(cors());
app.options("*", cors());

/* body parser, parse data from body into req.body */
app.use(express.json({ limit: "10kb" }));

/* parses incoming requests with urlencoded payloads into req.body */
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/* serving static files */
app.use(express.static(path.join(__dirname, publicFolder)));

/* initialize routes */
app.use(RootRouter);
app.use(SendCodeRouter);
app.use(UnownRouter);

/* global error handler */
app.use((error, req, res, next) => {
    if (error.isOperational) return res.status(error.statusCode).json({ status: 0, message: error.message });
    res.status(500).json({ status: 0, message: error.message || "Internal Server Error" });
});

module.exports = app;
