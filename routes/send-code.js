const Router = require("express").Router();
const AppError = require("../utils/app-error");

const { validate } = require("../utils/validate-data");
const { getMessageText } = require("../utils/get-message");

const { generateQR } = require("../services/qr-code");
const { sendMessage } = require("../services/sms");

Router.post("/send-qr-code", (req, res, next) =>
    (async (req, res) => {
        const validationResult = validate(req.body, ["first_name", "last_name", "email", "phone_number"]);
        if (validationResult.status === 0) throw new AppError(validationResult.message, 400);

        const message = getMessageText(req.body);

        const codeResponse = await generateQR(message);
        if (codeResponse.status === 0) throw new AppError(codeResponse.message);

        // twilio will fail if mediaUrl is not reachable, for local environment sending placeholder image url
        let mediaUrl = [codeResponse.fileUrl];
        if (process.env.NODE_ENV === "local") mediaUrl = ["https://via.placeholder.com/250"];

        const messageResponse = await sendMessage(req.body.phone_number, message, { mediaUrl });
        if (messageResponse.status === 0) throw new AppError(messageResponse.message);

        res.status(200).json({ status: 1, message: "Message Send Successfully" });
    })(req, res, next).catch(next)
);

module.exports = Router;
