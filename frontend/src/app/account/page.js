"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";

/* ================= HEADER (ห้ามแก้) ================= */
function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <header
      style={{
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        padding: "10px 40px",
        boxShadow: "0 1px 6px rgb(0 0 0 / 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <img
        src="/logo.PNG"
        alt="BOGTOR Logo"
        style={{ width: "60px", height: "60px", marginRight: "20px" }}
      />
      <h1 style={{ fontWeight: "700", fontSize: "28px", color: "#333", margin: 0 }}>
        HAT YAI TRAVEL & FOOD
      </h1>

      <nav
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "24px",
          fontWeight: "600",
          fontSize: "16px",
          color: "#555",
        }}
      >
        <a href="/dashboard" style={navLinkStyle}>หน้าแรก</a>
        <a href="/travel" style={navLinkStyle}>สถานที่ท่องเที่ยว</a>
        <a href="/food" style={navLinkStyle}>ร้านอาหาร</a>
        <a href="/comment" style={navLinkStyle}>บทความ</a>
        <a href="/graph" style={{ ...navLinkStyle, color: "#e85d04", borderBottom: "2px solid #e85d04" }}>
          ข้อมูลผู้ใช้
        </a>
        <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
      </nav>
    </header>
  );
}

/* ================= PAGE ================= */
export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    image_url: "",
  });

  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("ลบ user ?")) return;

    await fetch(`http://localhost:3001/user/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setForm((prev) => ({
      ...prev,
      image_url: data.imageUrl,
    }));

    setUploading(false);
  };

  const handleSave = async () => {
    if (isEdit) {
      await fetch(`http://localhost:3001/user/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
              ...form,
            password: "1234"
}),
      });
    }

    setIsOpen(false);
    fetchUsers();
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div style={container}>
        <div style={tableBox}>
          <div style={topBar}>
            <input
              placeholder="Search here..."
              style={searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              style={addBtn}
              onClick={() => {
                setIsEdit(false);
                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  gender: "",
                  image_url: "",
                });
                setIsOpen(true);
              }}
            >
              + Add New
            </button>
          </div>

          <table style={table}>
            <thead>
              <tr style={thead}>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  style={row}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f5f6fa")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  <td style={{ padding: "12px" }}>
                    {u.image_url ? (
                      <img src={u.image_url} style={avatar} />
                    ) : (
                      <div style={{ ...avatar, background: "#ccc" }} />
                    )}
                  </td>

                  <td style={{ padding: "12px" }}>{u.name}</td>
                  <td style={{ padding: "12px" }}>{u.email}</td>
                  <td style={{ padding: "12px" }}>{u.phone}</td>
                  <td style={{ padding: "12px" }}>{u.gender}</td>

                  <td style={{ padding: "12px" }}>
                    <button
                      style={editBtn}
                      onClick={() => {
                        setIsEdit(true);
                        setSelected(u);
                        setForm(u);
                        setIsOpen(true);
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      style={deleteBtnSmall}
                      onClick={() => handleDelete(u.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div style={modalOverlay}>
          <div style={modal}>
            <h3>{isEdit ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้"}</h3>

            <div style={{ textAlign: "center" }}>
              {form.image_url ? (
                <img src={form.image_url} style={previewImg} />
              ) : (
                <div style={previewPlaceholder}>No Image</div>
              )}

              <input type="file" onChange={handleUpload} />
              {uploading && <p>⏳ Uploading...</p>}
            </div>

            <input
              placeholder="ชื่อ"
              style={inputStyle}
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              style={inputStyle}
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              placeholder="เบอร์โทร"
              style={inputStyle}
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <select
              style={inputStyle}
              value={form.gender}
              onChange={(e) =>
                setForm({ ...form, gender: e.target.value })
              }
            >
              <option value="">เลือกเพศ</option>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
            </select>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button style={saveBtn} onClick={handleSave}>
                💾 Save
              </button>

              <button
                style={cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= STYLE ================= */
const navLinkStyle = { textDecoration: "none", color: "#555" };
const logoutBtnStyle = {
  padding: "6px 14px",
  border: "1px solid #ff6f61",
  backgroundColor: "white",
  color: "#ff6f61",
};

const container = {
  padding: "20px",
  minHeight: "100vh",
  backgroundImage: "url('/lolo.jpg')", // ใส่ชื่อรูปตรงนี้
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const tableBox = {
  background: "rgba(255,255,255,0.95)",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "1400px",   // กำหนดความกว้าง
  margin: "0 auto",     // จัดให้อยู่กลาง
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "15px",
};

const searchInput = {
  width: "250px",
  padding: "8px",
  borderRadius: "20px",
  border: "1px solid #ccc",
};

const table = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 10px",
};

const thead = {
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const row = {
  background: "#fff",
  boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
  transition: "0.2s",
};

const avatar = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  objectFit: "cover",
};

const editBtn = {
  marginRight: "8px",
  border: "1px solid #2ecc71",
  background: "white",
  color: "#2ecc71",
  padding: "6px",
  cursor: "pointer",
};

const deleteBtnSmall = {
  border: "1px solid #e74c3c",
  background: "white",
  color: "#e74c3c",
  padding: "6px",
  cursor: "pointer",
};

const addBtn = {
  background: "#2ecc71",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "20px",
  border: "none",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const saveBtn = {
  background: "#2ecc71",
  color: "#fff",
  padding: "8px",
  border: "none",
};

const cancelBtn = {
  background: "#ccc",
  padding: "8px",
  border: "none",
};

const previewImg = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "10px",
};

const previewPlaceholder = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  background: "#ddd",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 10px",
};