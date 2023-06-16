import express from 'express';
import { Express } from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import userRouter from './router/userRouter';
import kudoRouter from './router/kudoRouter';
import dotenv from 'dotenv';

dotenv.config();
const HTTP_PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(cors({
        credentials: true
    })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server: any = http.createServer(app);

//configure routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: "API Listening"
    })
});

app.use('/api/user', userRouter());
app.use('/api/kudo', kudoRouter());



//init mongoose
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Database connected');
    
    server.listen(HTTP_PORT, () => {
        console.log('Server listening on port: ' + HTTP_PORT);
    })
}).catch((err: Error) => {
    console.error(err);
    process.exit();
})

