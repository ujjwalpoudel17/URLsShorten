
const crypto = require('crypto');

const aliasGenerate = () => {
    return crypto
        .randomBytes(4)
        .toString('base64url')
        .slice(0, 6);
};

module.exports = aliasGenerate;