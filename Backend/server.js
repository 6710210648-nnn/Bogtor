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
app.use('/uploads_travel', express.static(path.join(__dirname, 'uploads_travel'))); //ของเเยม//

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


// ======================== Travel CRUD (อัปเดตล่าสุด) ========================

// 1. ดึงข้อมูลทั้งหมด
app.get("/travel", (req, res) => {
  db.query("SELECT * FROM travel", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 2. เพิ่มสถานที่ใหม่ (POST)
app.post("/travel", (req, res) => {
  const { title_th, title_en, description, category, location_address, map_url, opening_hours, image_url } = req.body;
  
  // สังเกต: ใน DB ของแยมชื่อคอลัมน์คือ 'image' (อิงตามรูป phpMyAdmin)
  const sql = `
    INSERT INTO travel (title_th, title_en, description, category, location_address, map_url, opening_hours, image)
    VALUES (?,?,?,?,?,?,?,?)
  `;
  
  db.query(sql, [title_th, title_en, description, category, location_address, map_url, opening_hours, image_url], (err, result) => {
    if (err) {
      console.error("❌ Insert Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: "Data created successfully", id: result.insertId });
  });
});

// 3. แก้ไขข้อมูล (PUT) - ตัวที่แยมติดปัญหา 404
app.put("/travel/:id", (req, res) => {
  const id = req.params.id;
  const { title_th, title_en, description, category, location_address, map_url, opening_hours, image_url } = req.body;

  console.log("Updating ID:", id);

  const sql = `
    UPDATE travel 
    SET title_th=?, title_en=?, description=?, category=?, 
        location_address=?, map_url=?, opening_hours=?, image=? 
    WHERE id=?
  `;

  const values = [title_th, title_en, description, category, location_address, map_url, opening_hours, image_url, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ SQL Error:", err);
      return res.status(500).json({ error: err.message });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data not found for this ID" });
    }

    console.log("Updated successfully:", id);
    res.json({ success: true });
  });
});

// 4. ลบข้อมูล (DELETE)
app.delete("/travel/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM travel WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Deleted successfully" });
  });
});

// ================= START =================
app.listen(PORT, () => {
  console.log(`🚀 Server running http://localhost:${PORT}`);
});



// ================= ARTICLES =================

// GET all articles (พร้อม comments)
app.get("/articles", (req, res) => {
  db.query("SELECT * FROM articles ORDER BY created_at DESC", (err, articles) => {
    if (err) return res.status(500).json(err);

    if (articles.length === 0) return res.json([]);

    db.query("SELECT * FROM comments ORDER BY created_at ASC", (err2, comments) => {
      if (err2) return res.status(500).json(err2);

      const result = articles.map((a) => ({
        ...a,
        imageUrl: a.image_url,
        createdAt: a.created_at,
        comments: comments
          .filter((c) => c.article_id === a.id)
          .map((c) => ({ ...c, createdAt: c.created_at })),
      }));
      res.json(result);
    });
  });
});

// POST new article
app.post("/articles", (req, res) => {
  const { title, content, author, image_url } = req.body;
  db.query(
    "INSERT INTO articles (title, content, author, image_url) VALUES (?,?,?,?)",
    [title, content, author || "ผู้ใช้นิรนาม", image_url || null],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true, id: result.insertId });
    }
  );
});

// PUT update article
app.put("/articles/:id", (req, res) => {
  const { title, content, author, image_url } = req.body;
  db.query(
    "UPDATE articles SET title=?, content=?, author=?, image_url=? WHERE id=?",
    [title, content, author, image_url, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// DELETE article
app.delete("/articles/:id", (req, res) => {
  db.query("DELETE FROM articles WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

// ================= COMMENTS =================

// POST new comment
app.post("/comments", (req, res) => {
  const { article_id, author, text, rating } = req.body;
  db.query(
    "INSERT INTO comments (article_id, author, text, rating) VALUES (?,?,?,?)",
    [article_id, author || "ผู้ใช้นิรนาม", text, rating || 0],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true, id: result.insertId });
    }
  );
});


// ================= FOOD CRUD =================
 
// GET all food (รองรับ ?search= ด้วย)
app.get("/food", (req, res) => {
  const search = req.query.search || "";
  const sql = `
    SELECT * FROM food
    WHERE name_th LIKE ? OR name_en LIKE ? OR location LIKE ?
    ORDER BY id ASC
  `;
  db.query(sql, [`%${search}%`, `%${search}%`, `%${search}%`], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});
 
// GET food by id
app.get("/food/:id", (req, res) => {
  db.query("SELECT * FROM food WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
});
 
// POST new food
app.post("/food", (req, res) => {
  const { name_th, name_en, type, description, location, opening_hours, image_url } = req.body;
  const sql = `
    INSERT INTO food (name_th, name_en, type, description, location, opening_hours, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [name_th, name_en, type, description || "", location, opening_hours, image_url || ""],
    (err, result) => {
      if (err) {
        console.error("❌ Food Insert Error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, id: result.insertId });
    }
  );
});
 
// PUT update food
app.put("/food/:id", (req, res) => {
  const { name_th, name_en, type, description, location, opening_hours, image_url } = req.body;
  const sql = `
    UPDATE food
    SET name_th=?, name_en=?, type=?, description=?, location=?, opening_hours=?, image=?
    WHERE id=?
  `;
  db.query(
    sql,
    [name_th, name_en, type, description || "", location, opening_hours, image_url || "", req.params.id],
    (err, result) => {
      if (err) {
        console.error("❌ Food Update Error:", err);
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) return res.status(404).json({ message: "Food not found" });
      res.json({ success: true });
    }
  );
});
 
// DELETE food
app.delete("/food/:id", (req, res) => {
  db.query("DELETE FROM food WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Deleted successfully" });
  });
});
 