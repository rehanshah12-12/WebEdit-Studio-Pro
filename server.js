require("dotenv").config();

const path = require("path");
const express = require("express");
const helmet = require("helmet");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

// Supabase client that acts as the logged-in user (so database rules apply)
function userClient(token) {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: "Bearer " + token } }
  });
}

app.use((req, res, next) => {
  if (FRONTEND_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

function getBearerToken(req) {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : null;
}

async function requireUser(req, res, next) {
  const token = getBearerToken(req);
  if (!token) return res.status(401).json({ error: "Please sign in first." });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return res.status(401).json({ error: "Invalid or expired login session." });
  }
  req.user = data.user;
  req.token = token;
  next();
}

async function requireAdmin(req, res, next) {
  const db = userClient(req.token);
  const { data, error } = await db.from("admins").select("email").limit(1);
  if (error || !data || data.length === 0) {
    return res.status(403).json({ error: "Admin access required." });
  }
  req.db = db;
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "WebEdit Studio Pro API" });
});

app.post("/api/register", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({
    message: "Registration submitted. Check your email if confirmation is enabled.",
    user: data.user ? { id: data.user.id, email: data.user.email } : null
  });
});

app.post("/api/login", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: "Email or password is incorrect." });

  res.json({
    message: "Login successful.",
    access_token: data.session.access_token,
    expires_at: data.session.expires_at,
    user: { id: data.user.id, email: data.user.email }
  });
});

app.get("/api/me", requireUser, (req, res) => {
  res.json({ user: { id: req.user.id, email: req.user.email } });
});

app.post("/api/contact", async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const message = String(req.body.message || "").trim();

  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required." });
  }
  if (name.length > 100 || email.length > 254 || message.length > 4000) {
    return res.status(400).json({ error: "One or more fields are too long." });
  }

  const { error } = await supabase.from("contact_requests").insert({
    name, email: email || null, message
  });
  if (error) {
    console.error("Contact insert failed:", error.message);
    return res.status(500).json({ error: "Could not save the message. Check database setup." });
  }
  res.status(201).json({ message: "Your message has been saved." });
});

app.post("/api/orders", requireUser, async (req, res) => {
  const service = String(req.body.service || "").trim();
  const details = String(req.body.details || "").trim();
  if (!service || service.length > 120 || details.length > 3000) {
    return res.status(400).json({ error: "Enter a valid service and order details." });
  }

  // CHANGED: customer's email is now saved with the order
  const { data, error } = await userClient(req.token).from("orders").insert({
    user_id: req.user.id,
    user_email: req.user.email,
    service,
    details
  }).select("id, service, details, status, created_at").single();

  if (error) {
    console.error("Order insert failed:", error.message);
    return res.status(500).json({ error: "Could not save the order. Check database setup." });
  }
  res.status(201).json({ order: data });
});

app.get("/api/orders", requireUser, async (req, res) => {
  const { data, error } = await userClient(req.token)
    .from("orders")
    .select("id, service, details, status, created_at")
    .eq("user_id", req.user.id)
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: "Could not load orders." });
  res.json({ orders: data });
});

// ---------- Admin routes (only for emails listed in the admins table) ----------
app.get("/api/admin/check", requireUser, requireAdmin, (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/admin/contacts", requireUser, requireAdmin, async (req, res) => {
  const { data, error } = await req.db
    .from("contact_requests").select("*").limit(200);
  if (error) {
    console.error("Admin contacts failed:", error.message);
    return res.status(500).json({ error: "Could not load messages." });
  }
  res.json({ contacts: data });
});

app.get("/api/admin/orders", requireUser, requireAdmin, async (req, res) => {
  const { data, error } = await req.db
    .from("orders").select("*").order("created_at", { ascending: false }).limit(200);
  if (error) {
    console.error("Admin orders failed:", error.message);
    return res.status(500).json({ error: "Could not load orders." });
  }
  res.json({ orders: data });
});

// NEW: admin changes the status of an order
app.post("/api/admin/orders/:id/status", requireUser, requireAdmin, async (req, res) => {
  const allowed = ["pending", "in progress", "completed", "cancelled"];
  const status = String(req.body.status || "");
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Invalid status." });
  }

  const { data, error } = await req.db
    .from("orders")
    .update({ status })
    .eq("id", req.params.id)
    .select("id, status")
    .single();

  if (error) {
    console.error("Status update failed:", error.message);
    return res.status(500).json({ error: "Could not update status." });
  }
  res.json({ order: data });
});

app.listen(PORT, () => {
  console.log(`WebEdit Studio Pro API listening on port ${PORT}`);
});
