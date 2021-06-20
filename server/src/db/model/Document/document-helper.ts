import { Document } from './document-model';

const defaultDocument = '';
async function findOrCreateDocument(id: string) {
    if (id === null) return;

    const document = await Document.findById(id);
    if (document) return document;

    const newDoc = await Document.create({ _id: id, data: defaultDocument });
    return newDoc;
}

async function saveDocument(id: string, { data }: { data: Object }) {
    await Document.findByIdAndUpdate(id, { data });
}

export { findOrCreateDocument, saveDocument };
