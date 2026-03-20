const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= CREATE UPLOAD FOLDER =================
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ================= FILE UPLOAD =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

// ================= CONNECT DATABASE =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bogtor",
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB Error:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// ================= LOGIN (ADMIN ONLY) =================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "กรอกข้อมูลไม่ครบ" });
  }

  const sql = "SELECT * FROM admins WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(401).json({ message: "Login failed" });
    }

    res.json({
      success: true,
      user: result[0],
    });
  });
});

// ================= ADMIN =================
app.get("/admin/:id", (req, res) => {
  db.query("SELECT * FROM admins WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

app.put("/admin/:id", (req, res) => {
  const { name, email, gender, phone, image_url } = req.body;

  db.query(
    "UPDATE admins SET name=?, email=?, gender=?, phone=?, image_url=? WHERE id=?",
    [name, email, gender, phone, image_url, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// ================= USERS =================

// 🔥 GET ALL + SEARCH
app.get("/users", (req, res) => {
  const search = req.query.search || "";

  const sql = `
    SELECT id, name, email, gender, phone, image_url
    FROM users
    WHERE name LIKE ? OR email LIKE ?
  `;

  db.query(sql, [`%${search}%`, `%${search}%`], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

// 🔥 GET USER
app.get("/user/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

// 🔥 CREATE USER
app.post("/user", (req, res) => {
  const { name, email, password, gender, phone, image_url } = req.body;

  const sql = `
    INSERT INTO users (name, email, password, gender, phone, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, password, gender, phone, image_url],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        id: result.insertId,
      });
    }
  );
});

// 🔥 UPDATE USER
app.put("/user/:id", (req, res) => {
  const { name, email, gender, phone, image_url } = req.body;

  const sql = `
    UPDATE users SET name=?, email=?, gender=?, phone=?, image_url=? WHERE id=?
  `;

  db.query(sql, [name, email, gender, phone, image_url, req.params.id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ success: true });
  });
});

// 🔥 DELETE USER
app.delete("/user/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ success: true });
  });
});

// ================= UPLOAD =================
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    imageUrl: `http://localhost:3001/uploads/${req.file.filename}`,
  });
});

// ================= START =================
app.listen(PORT, () => {
  console.log(`🚀 Server running http://localhost:${PORT}`);
});