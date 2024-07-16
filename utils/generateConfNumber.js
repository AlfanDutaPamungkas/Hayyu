const { v4: uuidv4 } = require('uuid');

const generateConfirmationNumber = () => {
    const timestamp = Date.now().toString(36);
    const randomString = uuidv4().slice(0, 8);
    return `${timestamp}-${randomString}`.toUpperCase();
};

module.exports = generateConfirmationNumber;