import { Router, Request, Response } from 'express';
import fs from 'fs';

const router = Router();

interface Submission {
  name: string;
  email: string;
  phone: string;
  github_link: string;
  stopwatch_time: number;
}

const dbPath = './src/db.json';

const readDb = () => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

const writeDb = (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

router.get('/ping', (req: Request, res: Response) => {
  res.json(true);
});

router.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const db = readDb();
  db.submissions.push({ name, email, phone, github_link, stopwatch_time });
  writeDb(db);
  res.json({ success: true });
});

router.get('/read', (req: Request, res: Response) => {
  const { index } = req.query;
  const db = readDb();
  const idx = parseInt(index as string, 10);
  if (idx >= 0 && idx < db.submissions.length) {
    res.json(db.submissions[idx]);
  } else {
    res.status(404).json({ error: 'Index out of range' });
  }
});

export default router;
