const path = require("path");
const QRCode = require("qrcode");

exports.generateQR = async (text) => {
    try {
        const fileName = `qr-code-${Date.now()}.png`;
        const filePath = path.join(__dirname, "..", process.env.QR_CODE_FOLDER, fileName);

        await QRCode.toFile(filePath, text);
        return { status: 1, data: { filePath, fileName } };
    } catch (error) {
        return { status: 0, message: error.message };
    }
};
