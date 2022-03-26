const local = require("./local");
const production = require("./production");

const constants = { local, production };

module.exports = constants[process.env.NODE_ENV];
