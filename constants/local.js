const port = process.env.PORT || 8000;

module.exports = {
    port,
    apiUrl: `http://localhost:${port}`,
    publicFolder: "public",
    qrCodesFolder: "qr-codes",
};
