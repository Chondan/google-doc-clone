import { debounce, isEqual } from 'lodash';
import React, {
    useCallback, useEffect, useState,
} from 'react';
import Quill, { Quill as TQuill } from 'quill';
import 'quill/dist/quill.snow.css';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import styles from './TextEditor.module.scss';

const { REACT_APP_SERVER_HOST } = process.env;

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ['image', 'blockquote', 'code-block'],
    ['clean'],
];

const TextEditor: React.FC = () => {
    const { id: documentId } = useParams<any>();
    const [socket, setSocket] = useState<Socket>();
    const [quill, setQuill] = useState<TQuill>();
    const [contents, setContents] = useState();

    // Setup socket.io
    useEffect(() => {
        const s = io(REACT_APP_SERVER_HOST as string);
        setSocket(s);

        // Clean up
        return () => {
            s.disconnect();
        };
    }, []);

    // Initialize Quill
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;

        // eslint-disable-next-line no-param-reassign
        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);
        const q: TQuill = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } });
        q.enable(false);
        q.setText('Loading...');
        setQuill(q);
    }, []);

    // Detecting changes
    useEffect(() => {
        if (socket === null || quill === null) return;

        const handler = (delta: any, oldDelta: any, source: string) => {
            if (source !== 'user') return;
            socket?.emit('send-changes', delta);
        };
        quill?.on('text-change', debounce(handler, 0));

        // eslint-disable-next-line consistent-return
        return () => {
            quill?.off('text-change', handler);
        };
    }, [quill, socket]);

    // Receive changes
    useEffect(() => {
        if (socket === null || quill === null) return;

        const handler = (delta: any) => {
            quill?.updateContents(delta);
        };
        socket?.on('receive-changes', handler);

        // eslint-disable-next-line consistent-return
        return () => {
            socket?.off('receive-changes', handler);
        };
    }, [quill, socket]);

    // Socket room setup
    useEffect(() => {
        if (socket === null || quill === null) return;

        socket?.once('load-document', (document) => {
            quill?.setContents(document);
            quill?.enable();
        });
        socket?.emit('get-document', documentId);
    }, [documentId, quill, socket]);

    // Save to db
    useEffect(() => {
        if (socket === null || quill === null) return;

        const interval = setInterval(() => {
            if (isEqual(quill?.getContents(), contents)) return;
            socket?.emit('save-document', quill?.getContents());
        }, SAVE_INTERVAL_MS);

        // eslint-disable-next-line no-console
        const onSaved = () => {
            setContents(quill?.getContents() as any);
            // eslint-disable-next-line no-console
            console.log('Document saved');
        };
        socket?.on('saved-document', onSaved);

        return () => {
            clearInterval(interval);
            socket?.off('saved-document', onSaved);
        };
    }, [contents, quill, socket]);

    return (
        <>
            <div className={styles.container} ref={wrapperRef} />
        </>
    );
};

export { TextEditor };
