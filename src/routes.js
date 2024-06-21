"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
const dbPath = './src/db.json';
const readDb = () => {
    const data = fs_1.default.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};
const writeDb = (data) => {
    fs_1.default.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};
router.get('/ping', (req, res) => {
    res.json(true);
});
router.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const db = readDb();
    db.submissions.push({ name, email, phone, github_link, stopwatch_time });
    writeDb(db);
    res.json({ success: true });
});
router.get('/read', (req, res) => {
    const { index } = req.query;
    const db = readDb();
    const idx = parseInt(index, 10);
    if (idx >= 0 && idx < db.submissions.length) {
        res.json(db.submissions[idx]);
    }
    else {
        res.status(404).json({ error: 'Index out of range' });
    }
});
exports.default = router;
