exports.getMessageText = ({ first_name = "", last_name = "", email = "", phone_number = "" }) => {
    return `Name: ${first_name} ${last_name}
    Email: ${email}
    Phone Number: ${phone_number}
    `;
};
