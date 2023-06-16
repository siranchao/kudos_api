"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const kudoRouter_1 = __importDefault(require("./router/kudoRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const HTTP_PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
server.listen(HTTP_PORT, () => {
    console.log('Server listening on port: ' + HTTP_PORT);
});
//init mongoose
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(process.env.MONGO_URL);
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB successfully');
});
//configure routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: "API Listening"
    });
});
app.use('/api/user', (0, userRouter_1.default)());
app.use('/api/kudo', (0, kudoRouter_1.default)());
//# sourceMappingURL=index.js.map