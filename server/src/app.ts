import path from 'path';
/* eslint-disable import/first */
require('custom-env').env(process.env.NODE_ENV, path.resolve(__dirname, '../../env'));

import { Socket } from 'socket.io';
import { findOrCreateDocument, saveDocument } from '@src/db/model/Document';
import { db } from '@src/db/setup';

const io = require('socket.io')(3001, {
    cors: {
        origin: process.env.CLIENT_HOST,
        methods: ['GET', 'POST'],
    },
});

db.once('open', () => {
    // eslint-disable-next-line no-console
    console.info('mongodb connected');

    io.on('connection', (socket: Socket) => {
    // eslint-disable-next-line no-console
        console.info('socket-io connected');

        socket.on('get-document', async (documentId) => {
            const document = await findOrCreateDocument(documentId);
            socket.join(documentId);
            socket.emit('load-document', document.data);

            socket.on('send-changes', (delta) => {
                socket.broadcast.to(documentId).emit('receive-changes', delta);
            });

            socket.on('save-document', async (data) => {
                await saveDocument(documentId, { data });
                socket.broadcast.to(documentId).emit('saved-document');
            });
        });
    });
});
