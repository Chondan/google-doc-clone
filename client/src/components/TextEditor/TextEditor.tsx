import React, { useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import styles from './TextEditor.module.scss';

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
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;

        // eslint-disable-next-line no-param-reassign
        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);
        // eslint-disable-next-line no-new
        new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } });
    }, []);
    return (
        <div className={styles.container} ref={wrapperRef} />
    );
};

export { TextEditor };
