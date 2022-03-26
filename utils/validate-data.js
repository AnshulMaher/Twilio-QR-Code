exports.validate = (object = {}, keys = []) => {
    if (Object.keys(object).length === 0) return { status: 0, message: "Please send proper data" };

    let status = 1,
        message;
    for (let index = 0; index < keys.length; index++) {
        if (!object[keys[index]]) {
            status = 0;
            message = `Please send ${keys[index]}`;
            break;
        }
    }

    return status === 1 ? { status } : { status, message };
};
