"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
/* eslint-disable import/first */
require('custom-env').env(process.env.NODE_ENV, path_1.default.resolve(__dirname, '../../env'));
const Document_1 = require("@src/db/model/Document");
const setup_1 = require("@src/db/setup");
const io = require('socket.io')(3001, {
    cors: {
        origin: process.env.CLIENT_HOST,
        methods: ['GET', 'POST'],
    },
});
setup_1.db.once('open', () => {
    // eslint-disable-next-line no-console
    console.info('mongodb connected');
    io.on('connection', (socket) => {
        // eslint-disable-next-line no-console
        console.info('socket-io connected');
        socket.on('get-document', async (documentId) => {
            const document = await Document_1.findOrCreateDocument(documentId);
            socket.join(documentId);
            socket.emit('load-document', document.data);
            socket.on('send-changes', (delta) => {
                socket.broadcast.to(documentId).emit('receive-changes', delta);
            });
            socket.on('save-document', async (data) => {
                await Document_1.saveDocument(documentId, { data });
                socket.broadcast.to(documentId).emit('saved-document');
            });
        });
    });
});
