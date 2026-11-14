import express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "1mb" }));

const PORT = 3000;
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "maarif-admin-2026";
const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "academy-store.json");

interface AcademyStore {
  content: {
    academyName: string;
    tagline: string;
    whatsappDisplay: string;
    whatsappIntl: string;
    email: string;
    heroHeading: string;
    heroSubheading: string;
    heroDescription: string;
    aboutHeading: string;
    aboutSubheading: string;
    aboutMission: string;
    aboutVision: string;
    feesApproachTitle: string;
    feesApproachQuote: string;
  };
  testimonials: Array<{
    id: string;
    parentFirstName: string;
    studentCourse?: string;
    review: string;
    published: boolean;
    createdAt: string;
  }>;
  trials: Array<{
    id: string;
    referenceCode: string;
    parentFullName: string;
    studentFullName: string;
    studentAge: string;
    country: string;
    whatsappNumber: string;
    courseInterestedIn: string;
    currentLearningLevel: string;
    preferredClassTiming: string;
    additionalMessage?: string;
    status: "pending" | "scheduled" | "completed";
    createdAt: string;
  }>;
  enquiries: Array<{
    id: string;
    referenceCode: string;
    fullName: string;
    emailAddress?: string;
    whatsappNumber: string;
    subject: string;
    message: string;
    status: "new" | "replied";
    createdAt: string;
  }>;
}

const DEFAULT_STORE: AcademyStore = {
  content: {
    academyName: "Maarif ul Quran",
    tagline: "Learn, Understand, Live the Quran.",
    whatsappDisplay: "03291982198",
    whatsappIntl: "923291982198",
    email: "maarifulquran.academy@gmail.com",
    heroHeading: "Learn the Quran with Care, Patience and Purpose.",
    heroSubheading:
      "Personalised One-to-One Online Quran Classes for Children and Adults.",
    heroDescription:
      "Begin your Quran learning journey with Maarif ul Quran. We provide personalised online Quran education with qualified teachers, individual attention and a friendly, supportive learning environment.",
    aboutHeading: "About Maarif ul Quran.",
    aboutSubheading: "Making Quran Learning Accessible, Personal and Meaningful.",
    aboutMission:
      "To make quality Quran education accessible through patient teaching, individual attention and consistent guidance.",
    aboutVision:
      "To help children and adults build a lasting connection with the Holy Quran and develop essential Islamic knowledge.",
    feesApproachTitle: "Accessible Quran Education for Every Family",
    feesApproachQuote:
      "At Maarif ul Quran, our priority is to make Quran education accessible, not expensive. We do not put a price on the Holy Quran or its teachings. Our fees simply support the time, effort and dedication of our teachers. We strive to keep our learning options very affordable so that more families can benefit. Please feel free to contact us without worrying about the fees.",
  },
  testimonials: [],
  trials: [],
  enquiries: [],
};

function ensureStore(): AcademyStore {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, JSON.stringify(DEFAULT_STORE, null, 2), "utf8");
    return structuredClone(DEFAULT_STORE);
  }
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<AcademyStore>;
    return {
      content: { ...DEFAULT_STORE.content, ...(parsed.content || {}) },
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : [],
      trials: Array.isArray(parsed.trials) ? parsed.trials : [],
      enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [],
    };
  } catch {
    return structuredClone(DEFAULT_STORE);
  }
}

function saveStore(store: AcademyStore): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.header("x-admin-token");
  if (!token || token !== ADMIN_PASSCODE) {
    return res.status(401).json({ error: "Unauthorized admin access." });
  }
  next();
}

// SEO & Google Indexing Routes
app.get("/robots.txt", (req, res) => {
  const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get("host")}`;
  res.type("text/plain");
  res.send(
    `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl.replace(/\/$/, "")}/sitemap.xml\n`
  );
});

app.get("/sitemap.xml", (req, res) => {
  const baseUrl = (process.env.APP_URL || `${req.protocol}://${req.get("host")}`).replace(
    /\/$/,
    ""
  );
  const now = new Date().toISOString().split("T")[0];
  res.type("application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><lastmod>${now}</lastmod><priority>1.0</priority></url>
  <url><loc>${baseUrl}/#courses</loc><lastmod>${now}</lastmod><priority>0.9</priority></url>
  <url><loc>${baseUrl}/#about</loc><lastmod>${now}</lastmod><priority>0.8</priority></url>
  <url><loc>${baseUrl}/#trial</loc><lastmod>${now}</lastmod><priority>0.9</priority></url>
  <url><loc>${baseUrl}/#contact</loc><lastmod>${now}</lastmod><priority>0.8</priority></url>
</urlset>`);
});

// Public Site Content & Published Testimonials
app.get("/api/site", (_req, res) => {
  const store = ensureStore();
  res.json({
    content: store.content,
    testimonials: store.testimonials.filter((t) => t.published),
  });
});

// Free Trial Booking Submission
app.post("/api/trials", (req, res) => {
  const {
    parentFullName,
    studentFullName,
    studentAge,
    country,
    whatsappNumber,
    courseInterestedIn,
    currentLearningLevel,
    preferredClassTiming,
    additionalMessage,
  } = req.body || {};

  if (
    !parentFullName?.trim() ||
    !studentFullName?.trim() ||
    !studentAge?.toString().trim() ||
    !country?.trim() ||
    !whatsappNumber?.trim() ||
    !courseInterestedIn?.trim() ||
    !currentLearningLevel?.trim() ||
    !preferredClassTiming?.trim()
  ) {
    return res
      .status(400)
      .json({ error: "Please complete all required trial booking fields." });
  }

  const store = ensureStore();
  const referenceCode = `MQ-TR-${Math.floor(10000 + Math.random() * 90000)}`;
  const entry = {
    id: crypto.randomUUID(),
    referenceCode,
    parentFullName: String(parentFullName).trim(),
    studentFullName: String(studentFullName).trim(),
    studentAge: String(studentAge).trim(),
    country: String(country).trim(),
    whatsappNumber: String(whatsappNumber).trim(),
    courseInterestedIn: String(courseInterestedIn).trim(),
    currentLearningLevel: String(currentLearningLevel).trim(),
    preferredClassTiming: String(preferredClassTiming).trim(),
    additionalMessage: additionalMessage ? String(additionalMessage).trim() : "",
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  };

  store.trials.unshift(entry);
  saveStore(store);

  res.status(201).json({
    success: true,
    referenceCode,
    targetEmail: store.content.email,
    entry,
  });
});

// General Contact Enquiry Submission
app.post("/api/enquiries", (req, res) => {
  const { fullName, emailAddress, whatsappNumber, subject, message } =
    req.body || {};

  if (
    !fullName?.trim() ||
    !whatsappNumber?.trim() ||
    !subject?.trim() ||
    !message?.trim()
  ) {
    return res
      .status(400)
      .json({ error: "Please fill in your name, WhatsApp number, subject, and message." });
  }

  const store = ensureStore();
  const referenceCode = `MQ-ENQ-${Math.floor(10000 + Math.random() * 90000)}`;
  const entry = {
    id: crypto.randomUUID(),
    referenceCode,
    fullName: String(fullName).trim(),
    emailAddress: emailAddress ? String(emailAddress).trim() : "",
    whatsappNumber: String(whatsappNumber).trim(),
    subject: String(subject).trim(),
    message: String(message).trim(),
    status: "new" as const,
    createdAt: new Date().toISOString(),
  };

  store.enquiries.unshift(entry);
  saveStore(store);

  res.status(201).json({
    success: true,
    referenceCode,
    targetEmail: store.content.email,
    entry,
  });
});

// Parent Review Submission (stored unpublished until reviewed/approved in Admin Portal)
app.post("/api/testimonials/submit", (req, res) => {
  const { parentFirstName, studentCourse, review } = req.body || {};
  if (!parentFirstName?.trim() || !review?.trim()) {
    return res
      .status(400)
      .json({ error: "Please enter your first name and your feedback." });
  }

  const store = ensureStore();
  const item = {
    id: crypto.randomUUID(),
    parentFirstName: String(parentFirstName).trim(),
    studentCourse: studentCourse ? String(studentCourse).trim() : "",
    review: String(review).trim(),
    published: false,
    createdAt: new Date().toISOString(),
  };

  store.testimonials.unshift(item);
  saveStore(store);

  res.status(201).json({
    success: true,
    message:
      "JazakAllahu Khayran! Your feedback has been received and sent to our academy team for review.",
  });
});

// Admin Login & Dashboard APIs
app.post("/api/admin/login", (req, res) => {
  const { passcode } = req.body || {};
  if (!passcode || passcode !== ADMIN_PASSCODE) {
    return res.status(401).json({ error: "Incorrect admin passcode." });
  }
  res.json({ ok: true });
});

app.get("/api/admin/dashboard", requireAdmin, (_req, res) => {
  const store = ensureStore();
  res.json(store);
});

app.patch("/api/admin/trials/:id", requireAdmin, (req, res) => {
  const { status } = req.body || {};
  const store = ensureStore();
  const item = store.trials.find((t) => t.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Trial request not found." });
  if (status === "pending" || status === "scheduled" || status === "completed") {
    item.status = status;
  }
  saveStore(store);
  res.json(item);
});

app.patch("/api/admin/enquiries/:id", requireAdmin, (req, res) => {
  const { status } = req.body || {};
  const store = ensureStore();
  const item = store.enquiries.find((e) => e.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Enquiry not found." });
  if (status === "new" || status === "replied") {
    item.status = status;
  }
  saveStore(store);
  res.json(item);
});

app.put("/api/admin/content", requireAdmin, (req, res) => {
  const store = ensureStore();
  const updates = req.body || {};
  store.content = {
    ...store.content,
    ...Object.fromEntries(
      Object.entries(updates).filter(
        ([k, v]) => k in DEFAULT_STORE.content && typeof v === "string"
      )
    ),
  };
  saveStore(store);
  res.json(store.content);
});

app.post("/api/admin/testimonials", requireAdmin, (req, res) => {
  const { parentFirstName, studentCourse, review, published } = req.body || {};
  if (!parentFirstName?.trim() || !review?.trim()) {
    return res
      .status(400)
      .json({ error: "Parent's first name and review text are required." });
  }
  const store = ensureStore();
  const item = {
    id: crypto.randomUUID(),
    parentFirstName: String(parentFirstName).trim(),
    studentCourse: studentCourse ? String(studentCourse).trim() : "",
    review: String(review).trim(),
    published: published !== false,
    createdAt: new Date().toISOString(),
  };
  store.testimonials.unshift(item);
  saveStore(store);
  res.status(201).json(item);
});

app.patch("/api/admin/testimonials/:id", requireAdmin, (req, res) => {
  const store = ensureStore();
  const item = store.testimonials.find((t) => t.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Testimonial not found." });
  const { parentFirstName, studentCourse, review, published } = req.body || {};
  if (typeof parentFirstName === "string" && parentFirstName.trim()) {
    item.parentFirstName = parentFirstName.trim();
  }
  if (typeof studentCourse === "string") {
    item.studentCourse = studentCourse.trim();
  }
  if (typeof review === "string" && review.trim()) {
    item.review = review.trim();
  }
  if (typeof published === "boolean") {
    item.published = published;
  }
  saveStore(store);
  res.json(item);
});

app.delete("/api/admin/testimonials/:id", requireAdmin, (req, res) => {
  const store = ensureStore();
  store.testimonials = store.testimonials.filter((t) => t.id !== req.params.id);
  saveStore(store);
  res.json({ ok: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
