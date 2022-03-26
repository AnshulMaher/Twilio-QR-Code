const path = require("path");
const QRCode = require("qrcode");

const { apiUrl, publicFolder, qrCodesFolder } = require("../constants");

exports.generateQR = async (text) => {
    try {
        const fileName = `qr-code-${Date.now()}.png`;
        const filePath = path.join(__dirname, "..", publicFolder, qrCodesFolder, fileName);
        const fileUrl = `${apiUrl}/${qrCodesFolder}/${fileName}`;

        await QRCode.toFile(filePath, text);

        return { status: 1, data: { fileUrl, fileName } };
    } catch (error) {
        return { status: 0, message: error.message };
    }
};
