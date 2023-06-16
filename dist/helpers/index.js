"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.signJwtToken = exports.authentication = exports.random = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const random = () => crypto_1.default.randomBytes(128).toString('base64');
exports.random = random;
const authentication = (salt, password) => {
    return crypto_1.default.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET).digest('hex');
};
exports.authentication = authentication;
const DEFAULT_SIGN_OPTIONS = {
    expiresIn: '1d',
};
function signJwtToken(payload, options = DEFAULT_SIGN_OPTIONS) {
    const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET, options);
    return token;
}
exports.signJwtToken = signJwtToken;
function verifyJwtToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        return decoded;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
exports.verifyJwtToken = verifyJwtToken;
//# sourceMappingURL=index.js.map