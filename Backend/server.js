const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());

// fake database (ไว้ทดสอบก่อน)
const users = [
  {
    email: "test@gmail.com",
    password: "1234",
    gender: "male",
  },
];

// API login
app.post("/login", (req, res) => {
  const { email, password, gender } = req.body;

  // เช็คว่ากรอกครบไหม
  if (!email || !password || !gender) {
    return res.status(400).json({
      success: false,
      message: "กรอกข้อมูลไม่ครบ",
    });
  }

  // หา user
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
    });
  }

  // login สำเร็จ
  res.json({
    success: true,
    message: "Login สำเร็จ",
    user: {
      email: user.email,
      gender: user.gender,
    },
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});