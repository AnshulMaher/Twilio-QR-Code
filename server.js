if (process.env.NODE_ENV !== "production") require("dotenv").config();
const fs = require("fs");
const path = require("path");

const { port, publicFolder, qrCodesFolder } = require("./constants");
const app = require("./app");

if (!fs.existsSync(publicFolder)) fs.mkdirSync(publicFolder);

const qrCodesFolderPath = path.join(__dirname, publicFolder, qrCodesFolder);
if (!fs.existsSync(qrCodesFolderPath)) fs.mkdirSync(qrCodesFolderPath);

app.listen(port, (error) => {
    if (error) throw error;
    console.log(`listening on port ${port}...`);
});
