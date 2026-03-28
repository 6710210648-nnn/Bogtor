"use client";

import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

/* ================= HEADER ================= */
function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <header
      style={{
        backgroundColor: "#ffffff",
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
        src="/ไก่ๆ.PNG"
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
        }}
      >
        <a href="/dashboard" style={navLinkStyle}>หน้าแรก</a>
        <a href="/travel" style={navLinkStyle}>สถานที่ท่องเที่ยว</a>
        <a
          href="/food"
          style={{ ...navLinkStyle, color: "#e85d04", borderBottom: "2px solid #e85d04" }}
        >
          ร้านอาหาร
        </a>
        <a href="/comment" style={navLinkStyle}>บทความ</a>
        <a href="/account" style={navLinkStyle}>ข้อมูลผู้ใช้</a>
        <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
      </nav>
    </header>
  );
}

/* ================= PAGE ================= */
export default function FoodPage() {
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("ทั้งหมด");

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name_th: "",
    name_en: "",
    type: "",
    description: "",
    location: "",
    opening_hours: "",
    image_url: "",
  });
  const [uploading, setUploading] = useState(false);

  /* ---------- Fetch ---------- */
  const fetchFoodData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/food");
      const data = await res.json();
      setFoodData(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  /* ---------- Filter ---------- */
  const types = ["ทั้งหมด", ...new Set(foodData.map((f) => f.type).filter(Boolean))];

  const filteredFood = foodData.filter((food) => {
    const matchesSearch =
      food.name_th?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "ทั้งหมด" || food.type === selectedType;
    return matchesSearch && matchesType;
  });

  /* ---------- Add ---------- */
  const handleAdd = () => {
    setIsEdit(false);
    setForm({
      id: null,
      name_th: "",
      name_en: "",
      type: "",
      description: "",
      location: "",
      opening_hours: "",
      image_url: "",
    });
    setIsOpen(true);
  };

  /* ---------- Edit ---------- */
  const handleEdit = (food) => {
    setIsEdit(true);
    setForm({
      id: food.id,
      name_th: food.name_th || "",
      name_en: food.name_en || "",
      type: food.type || "",
      description: food.description || "",
      location: food.location || "",
      opening_hours: food.opening_hours || "",
      image_url: food.image || "",
    });
    setIsOpen(true);
  };

  /* ---------- Upload image ---------- */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setForm((prev) => ({ ...prev, image_url: data.imageUrl }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("อัปโหลดรูปไม่สำเร็จ");
    } finally {
      setUploading(false);
    }
  };

  /* ---------- Save (POST / PUT) ---------- */
  const handleSave = async () => {
    try {
      const url = isEdit
        ? `http://localhost:3001/food/${form.id}`
        : "http://localhost:3001/food";
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        name_th: form.name_th || "ไม่ระบุชื่อ",
        name_en: form.name_en || "No Name",
        type: form.type || "ทั่วไป",
        description: form.description || "",
        location: form.location || "",
        opening_hours: form.opening_hours || "",
        image_url: form.image_url || "",
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errDetail = await res.json();
        console.error("Server error:", errDetail);
        throw new Error(`Server error: ${res.status}`);
      }

      setIsOpen(false);
      fetchFoodData();
    } catch (err) {
      console.error("Save error:", err);
      alert("บันทึกไม่สำเร็จ! ลองเช็กที่ Console ของ Backend (Terminal)");
    }
  };

  /* ---------- Delete ---------- */
  const handleDelete = async (id) => {
    if (!confirm("ต้องการลบร้านอาหารนี้จริงๆ หรือ?")) return;
    await fetch(`http://localhost:3001/food/${id}`, { method: "DELETE" });
    fetchFoodData();
  };

  /* ---------- Image helper ---------- */
  const getImageSrc = (food) => {
    if (!food.image) return "https://via.placeholder.com/400x250?text=No+Image";
    if (food.image.startsWith("http")) return food.image;
    return `http://localhost:3001/uploads_food/${food.image}`;
  };

  /* ================= STYLES ================= */
  const modalOverlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };
  const modalStyle = {
    background: "white",
    padding: "24px",
    borderRadius: "12px",
    width: "420px",
    maxHeight: "90vh",
    overflowY: "auto",
  };
  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    margin: "5px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };
  const previewImg = {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    marginBottom: "10px",
    borderRadius: "8px",
  };
  const previewPlaceholder = {
    width: "120px",
    height: "120px",
    background: "#eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
    borderRadius: "8px",
    color: "#999",
    fontSize: "13px",
  };

  /* ================= RENDER ================= */
  return (
    <div className="bg-light min-vh-100">
      <Header />

      <div className="container py-5" style={{ maxWidth: "1000px" }}>
        {/* Title + Add button */}
        <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-4">
          <h2 className="fw-bold mb-1">ร้านอาหารแนะนำในหาดใหญ่ 🍜</h2>
          <button
            className="btn btn-outline-dark btn-sm rounded-pill px-3"
            onClick={handleAdd}
          >
            + เพิ่มร้านอาหาร
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control rounded-pill px-4 py-2 shadow-sm"
            placeholder="🔎 ค้นหาร้านอาหาร ชื่อ หรือ ที่ตั้ง..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category filter */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {types.map((t) => (
            <button
              key={t}
              className={`btn btn-sm rounded-pill px-3 ${selectedType === t ? "btn-dark" : "btn-white shadow-sm"
                }`}
              onClick={() => setSelectedType(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {!loading && filteredFood.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">ไม่พบร้านอาหาร 🔍</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-secondary" role="status" />
          </div>
        )}

        {/* Cards */}
        {!loading &&
          filteredFood.map((food) => (
            <div
              className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 hover-shadow"
              key={food.id}
            >
              <div className="row g-0">
                {/* Image */}
                <div className="col-md-4">
                  <img
                    src={getImageSrc(food)}
                    alt={food.name_th}
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: "cover", minHeight: "220px" }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x250?text=No+Image";
                      e.target.onerror = null;
                    }}
                  />
                </div>

                {/* Info */}
                <div className="col-md-8 d-flex flex-column justify-content-center p-4">
                  <div className="mb-2">
                    <span className="badge bg-warning-subtle text-warning-emphasis mb-2 fw-normal">
                      {food.type || "ทั่วไป"}
                    </span>
                    <h4 className="fw-bold mb-0 text-dark">{food.name_th}</h4>
                    <span className="text-primary small fw-medium text-uppercase">
                      {food.name_en}
                    </span>
                  </div>

                  <p
                    className="text-secondary small mb-3"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {food.description}
                  </p>

                  <div
                    className="bg-light p-3 rounded-3 mb-3"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className="d-flex mb-2">
                      <i className="bi bi-geo-alt text-danger me-2" />
                      <span className="text-dark truncate">{food.location}</span>
                    </div>
                    <div className="d-flex">
                      <i className="bi bi-clock text-muted me-2" />
                      <span className="text-dark">{food.opening_hours}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-edit rounded-pill px-3 btn-sm shadow-sm"
                      onClick={() => handleEdit(food)}
                    >
                      ✏️ แก้ไข
                    </button>
                    <button
                      className="btn btn-delete rounded-pill px-3 btn-sm shadow-sm"
                      onClick={() => handleDelete(food.id)}
                    >
                      🗑️ ลบ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* ====== Modal ====== */}
        {isOpen && (
          <div style={modalOverlay}>
            <div style={modalStyle}>
              <h5 className="fw-bold mb-3">
                {isEdit ? "✏️ แก้ไขร้านอาหาร" : "➕ เพิ่มร้านอาหาร"}
              </h5>

              {/* Image preview */}
              <div style={{ textAlign: "center", marginBottom: "12px" }}>
                {form.image_url ? (
                  <img src={form.image_url} style={previewImg} alt="preview" />
                ) : (
                  <div style={previewPlaceholder}>No Image</div>
                )}
                <input type="file" accept="image/*" onChange={handleUpload} />
                {uploading && <p className="text-muted small mt-1">⏳ กำลังอัปโหลด...</p>}
              </div>

              <input
                placeholder="ชื่อร้าน (ภาษาไทย)"
                style={inputStyle}
                value={form.name_th}
                onChange={(e) => setForm({ ...form, name_th: e.target.value })}
              />
              <input
                placeholder="ชื่อร้าน (ภาษาอังกฤษ)"
                style={inputStyle}
                value={form.name_en}
                onChange={(e) => setForm({ ...form, name_en: e.target.value })}
              />
              <select
                style={inputStyle}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="">เลือกประเภทร้าน</option>
                <option value="คาเฟ่">คาเฟ่</option>
                <option value="ของหวาน">ของหวาน</option>
                <option value="ปิ้งย่าง/ชาบู">ปิ้งย่าง/ชาบู</option>
                <option value="ก๋วยเตี๋ยว">ก๋วยเตี๋ยว</option>
                <option value="ส้มตำ">ส้มตำ</option>
                <option value="หมาล่า">หมาล่า</option>
                <option value="นั้งชิว">นั่งชิว</option>
                <option value="ทั่วไป">ทั่วไป</option>
              </select>
              <input
                placeholder="รายละเอียดร้าน"
                style={inputStyle}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <input
                placeholder="ที่ตั้ง / ที่อยู่"
                style={inputStyle}
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <input
                placeholder="เวลาเปิด-ปิด เช่น 09:00 - 20:00"
                style={inputStyle}
                value={form.opening_hours}
                onChange={(e) => setForm({ ...form, opening_hours: e.target.value })}
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                <button
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#2ecc71",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  onClick={handleSave}
                >
                  💾 บันทึก
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .hover-shadow {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-shadow:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
        .truncate {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .btn-white {
          background: white;
          color: #555;
          border: 1px solid #eee;
        }
        .btn-edit {
          background: #91f9ae;
          color: #000;
          border: none;
        }
        .btn-delete {
          background: #f98080;
          color: #000;
          border: none;
        }
      `}</style>
    </div>
  );
}

/* ================= STYLE ================= */
const navLinkStyle = {
  textDecoration: "none",
  color: "#1e1d1d",
  paddingBottom: "4px",
  borderBottom: "2px solid transparent",
  cursor: "pointer",
};

const logoutBtnStyle = {
  padding: "6px 14px",
  borderRadius: "6px",
  border: "1px solid #ff6f61",
  backgroundColor: "white",
  color: "#ff6f61",
  fontWeight: "600",
  cursor: "pointer",
  marginLeft: "24px",
};