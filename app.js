require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const { generateQR } = require("./services/qr-code");
const { sendMessage } = require("./services/sms");
const { getMessageText } = require("./utils/get-message");

const app = express();
const port = process.env.PORT || 8000;

/* implement cors */
app.use(cors());
app.options("*", cors());

/* body parser, parse data from body into req.body */
app.use(express.json({ limit: "10kb" }));

/* parses incoming requests with urlencoded payloads into req.body */
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/* serving static files */
app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)));

app.post("/send-qr-code", async (req, res, next) => {
    const message = getMessageText(req.body);

    try {
        const codeResponse = await generateQR(message);
        if (codeResponse.status === 0) return res.status(500).json(codeResponse);

        /* 
        Uncomment this line when proper set-up is done
        const qrCodePublicPath = `${process.env.API_URL}/${process.env.PUBLIC_FOLDER}/${codeResponse.data.fileName}`;
        */

        // temporarily sending test image
        const qrCodePublicPath = "https://www.park2jetdenver.com/assets/images/home-banner/1.jpg";
        const messageResponse = await sendMessage(req.body.phone_number, message, {
            mediaUrl: [qrCodePublicPath],
        });
        if (messageResponse.status === 0) return res.status(500).json(messageResponse);

        res.status(200).json({ status: 1, message: "Message Send Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 0, message: "Internal Server Error" });
    }
});
app.get("*", (req, res) => {
    res.status(200).json({ message: "Hello World" });
});

const server = app.listen(port, (error) => {
    if (error) throw error;
    console.log(`listening on port ${port}...`);
});
