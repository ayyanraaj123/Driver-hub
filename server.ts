import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'salman_driver_base.json');

interface RequestRecord {
  id: string;
  referenceCode: string;
  clientName: string;
  phone: string;
  area: string;
  category: string;
  transmission: string;
  shift: string;
  vehicleModel: string;
  notes: string;
  status: string;
  createdAt: string;
}

interface DriverRecord {
  id: string;
  referenceCode: string;
  fullName: string;
  phone: string;
  cnicLast4: string;
  licenseType: string;
  experienceYears: number;
  preferredCategories: string[];
  preferredAreas: string[];
  transmission: string;
  status: string;
  createdAt: string;
}

interface StoreShape {
  nextRequestSeq: number;
  nextDriverSeq: number;
  requests: RequestRecord[];
  drivers: DriverRecord[];
}

const VALID_STATUSES = ['Pending Verification', 'Verified', 'Assigned'];

function ensureStore(): StoreShape {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const initial: StoreShape = {
      nextRequestSeq: 1001,
      nextDriverSeq: 2001,
      requests: [],
      drivers: [],
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw) as StoreShape;
    return {
      nextRequestSeq: typeof parsed.nextRequestSeq === 'number' ? parsed.nextRequestSeq : 1001,
      nextDriverSeq: typeof parsed.nextDriverSeq === 'number' ? parsed.nextDriverSeq : 2001,
      requests: Array.isArray(parsed.requests) ? parsed.requests : [],
      drivers: Array.isArray(parsed.drivers) ? parsed.drivers : [],
    };
  } catch {
    const fallback: StoreShape = {
      nextRequestSeq: 1001,
      nextDriverSeq: 2001,
      requests: [],
      drivers: [],
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(fallback, null, 2), 'utf8');
    return fallback;
  }
}

function saveStore(store: StoreShape): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf8');
}

function normalizePhone(input: string): string {
  return input.replace(/[^\d+\-\s]/g, '').trim();
}

function isValidPkPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 13;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '256kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'SALMAN DRIVER BASE', city: 'Karachi, Pakistan' });
  });

  app.get('/api/requests', (_req, res) => {
    const store = ensureStore();
    res.json({ items: store.requests });
  });

  app.post('/api/requests', (req, res) => {
    const body = req.body ?? {};
    const clientName = String(body.clientName ?? '').trim();
    const phone = normalizePhone(String(body.phone ?? ''));
    const area = String(body.area ?? '').trim();
    const category = String(body.category ?? '').trim();
    const transmission = String(body.transmission ?? '').trim();
    const shift = String(body.shift ?? '').trim();
    const vehicleModel = String(body.vehicleModel ?? '').trim();
    const notes = String(body.notes ?? '').trim();

    if (clientName.length < 2 || clientName.length > 80) {
      return res.status(400).json({ error: 'Please provide a valid full name (2–80 characters).' });
    }
    if (!isValidPkPhone(phone)) {
      return res.status(400).json({ error: 'Please enter a valid Pakistani mobile or WhatsApp number.' });
    }
    if (!area || !category || !transmission || !shift) {
      return res.status(400).json({ error: 'Area, driver category, transmission, and shift are required.' });
    }

    const store = ensureStore();
    const seq = store.nextRequestSeq;
    store.nextRequestSeq += 1;

    const record: RequestRecord = {
      id: `req_${Date.now()}_${seq}`,
      referenceCode: `REQ-${seq}`,
      clientName,
      phone,
      area,
      category,
      transmission,
      shift,
      vehicleModel: vehicleModel.slice(0, 80),
      notes: notes.slice(0, 500),
      status: 'Pending Verification',
      createdAt: new Date().toISOString(),
    };

    store.requests.unshift(record);
    saveStore(store);

    return res.status(201).json({ item: record });
  });

  app.patch('/api/requests/:id', (req, res) => {
    const { id } = req.params;
    const status = String(req.body?.status ?? '');
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }
    const store = ensureStore();
    const target = store.requests.find((r) => r.id === id);
    if (!target) {
      return res.status(404).json({ error: 'Driver request not found.' });
    }
    target.status = status;
    saveStore(store);
    return res.json({ item: target });
  });

  app.delete('/api/requests/:id', (req, res) => {
    const { id } = req.params;
    const store = ensureStore();
    const before = store.requests.length;
    store.requests = store.requests.filter((r) => r.id !== id);
    if (store.requests.length === before) {
      return res.status(404).json({ error: 'Driver request not found.' });
    }
    saveStore(store);
    return res.json({ deleted: true });
  });

  app.get('/api/drivers', (_req, res) => {
    const store = ensureStore();
    res.json({ items: store.drivers });
  });

  app.post('/api/drivers', (req, res) => {
    const body = req.body ?? {};
    const fullName = String(body.fullName ?? '').trim();
    const phone = normalizePhone(String(body.phone ?? ''));
    const cnicLast4 = String(body.cnicLast4 ?? '').replace(/\D/g, '').slice(0, 4);
    const licenseType = String(body.licenseType ?? '').trim();
    const experienceYears = Number(body.experienceYears ?? 0);
    const preferredCategories = Array.isArray(body.preferredCategories)
      ? body.preferredCategories.map((c: unknown) => String(c).trim()).filter(Boolean)
      : [];
    const preferredAreas = Array.isArray(body.preferredAreas)
      ? body.preferredAreas.map((a: unknown) => String(a).trim()).filter(Boolean)
      : [];
    const transmission = String(body.transmission ?? '').trim();

    if (fullName.length < 2 || fullName.length > 80) {
      return res.status(400).json({ error: 'Please provide your full name (2–80 characters).' });
    }
    if (!isValidPkPhone(phone)) {
      return res.status(400).json({ error: 'Please enter a valid Pakistani mobile number.' });
    }
    if (cnicLast4.length !== 4) {
      return res.status(400).json({ error: 'Please enter the last 4 digits of your CNIC.' });
    }
    if (!licenseType || !transmission || preferredCategories.length === 0 || preferredAreas.length === 0) {
      return res.status(400).json({ error: 'License type, transmission, preferred roles, and Karachi areas are required.' });
    }
    if (!Number.isFinite(experienceYears) || experienceYears < 0 || experienceYears > 50) {
      return res.status(400).json({ error: 'Experience years must be between 0 and 50.' });
    }

    const store = ensureStore();
    const seq = store.nextDriverSeq;
    store.nextDriverSeq += 1;

    const record: DriverRecord = {
      id: `drv_${Date.now()}_${seq}`,
      referenceCode: `DRV-${seq}`,
      fullName,
      phone,
      cnicLast4,
      licenseType,
      experienceYears: Math.round(experienceYears),
      preferredCategories: preferredCategories.slice(0, 5),
      preferredAreas: preferredAreas.slice(0, 8),
      transmission,
      status: 'Pending Verification',
      createdAt: new Date().toISOString(),
    };

    store.drivers.unshift(record);
    saveStore(store);

    return res.status(201).json({ item: record });
  });

  app.patch('/api/drivers/:id', (req, res) => {
    const { id } = req.params;
    const status = String(req.body?.status ?? '');
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }
    const store = ensureStore();
    const target = store.drivers.find((d) => d.id === id);
    if (!target) {
      return res.status(404).json({ error: 'Driver registration not found.' });
    }
    target.status = status;
    saveStore(store);
    return res.json({ item: target });
  });

  app.delete('/api/drivers/:id', (req, res) => {
    const { id } = req.params;
    const store = ensureStore();
    const before = store.drivers.length;
    store.drivers = store.drivers.filter((d) => d.id !== id);
    if (store.drivers.length === before) {
      return res.status(404).json({ error: 'Driver registration not found.' });
    }
    saveStore(store);
    return res.json({ deleted: true });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SALMAN DRIVER BASE server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
