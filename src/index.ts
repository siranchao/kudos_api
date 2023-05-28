import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({
        credentials: true
    })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);


server.listen(8080, () => {
    console.log('Server listening on port 8080: http://localhost:8080');
})


//init mongoose
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on('error', (err: Error) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB successfully');
});


  