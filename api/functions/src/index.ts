const express = require('express');
import router from './routes';

const functions = require('firebase-functions');

const cors = require('cors')({
    origin: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200
});
const app = express();

app.use(cors);

app.use('/', router);

export const api = functions.https.onRequest((request, response) => {
    if (!request.path) {
        request.url = `/${request.url}`;
    }

    return app(request, response);
});