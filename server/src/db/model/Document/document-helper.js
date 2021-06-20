"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDocument = exports.findOrCreateDocument = void 0;
const document_model_1 = require("./document-model");
const defaultDocument = '';
async function findOrCreateDocument(id) {
    if (id === null)
        return;
    const document = await document_model_1.Document.findById(id);
    if (document)
        return document;
    const newDoc = await document_model_1.Document.create({ _id: id, data: defaultDocument });
    return newDoc;
}
exports.findOrCreateDocument = findOrCreateDocument;
async function saveDocument(id, { data }) {
    await document_model_1.Document.findByIdAndUpdate(id, { data });
}
exports.saveDocument = saveDocument;
