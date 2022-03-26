const client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendMessage = async (to, body, options = {}) => {
    const messageData = { body, from: process.env.TWILIO_NUMBER, to };
    if (options.mediaUrl) messageData.mediaUrl = options.mediaUrl;

    try {
        const result = await client.messages.create(messageData);
        return { status: 1, data: result };
    } catch (error) {
        return { status: 0, message: error.message };
    }
};
