"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const mongoose_1 = require("mongoose");
const DocumentSchema = new mongoose_1.Schema({
    _id: String,
    data: Object,
});
const Document = mongoose_1.model('Document', DocumentSchema);
exports.Document = Document;
