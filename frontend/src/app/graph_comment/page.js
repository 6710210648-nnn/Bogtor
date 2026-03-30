"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

const API = "http://localhost:3001";

// ================= HEADER =================
function Header() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };
  return (
    <header style={{ backgroundColor: "#fff", display: "flex", alignItems: "center", padding: "10px 40px", boxShadow: "0 1px 6px rgb(0 0 0 / 0.1)", position: "sticky", top: 0, zIndex: 10 }}>
      <img src="/logo.PNG" alt="BOGTOR Logo" style={{ width: "60px", height: "60px", marginRight: "20px" }} />
      <h1 style={{ fontWeight: "700", fontSize: "28px", color: "#333", margin: 0 }}>HAT YAI TRAVEL & FOOD</h1>
      <nav style={{ marginLeft: "auto", display: "flex", gap: "24px", fontWeight: "600", fontSize: "16px", color: "#555" }}>
        <a href="/dashboard" style={navLinkStyle}>หน้าแรก</a>
        <a href="/travel" style={navLinkStyle}>สถานที่ท่องเที่ยว</a>
        <a href="/food" style={navLinkStyle}>ร้านอาหาร</a>
        <a href="/graph_comment" style={{ ...navLinkStyle, color: "#e85d04", borderBottom: "2px solid #e85d04" }}>บทความ</a>
        <a href="/account" style={navLinkStyle}>ข้อมูลผู้ใช้</a>
        <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
      </nav>
    </header>
  );
}

function StarDisplay({ comments }) {
  const ratings = (comments || []).filter((c) => c.rating > 0);
  const avg = ratings.length > 0
    ? Math.round(ratings.reduce((sum, c) => sum + c.rating, 0) / ratings.length)
    : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span>{[1,2,3,4,5].map((i) => <span key={i} style={{ color: i <= avg ? "#f5a623" : "#ccc", fontSize: "1.1rem" }}>★</span>)}</span>
      <span style={{ fontSize: "0.85rem", color: "#888" }}>
        {avg > 0 ? `${avg}/5 (${ratings.length} รีวิว)` : "ยังไม่มีรีวิว"}
      </span>
    </div>
  );
}

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "12px" }}>
      <span style={{ fontSize: "0.9rem", color: "#555", marginRight: "6px" }}>ให้คะแนน:</span>
      {[1,2,3,4,5].map((i) => (
        <span key={i} onClick={() => onChange(i)} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(0)}
          style={{ fontSize: "1.8rem", color: i <= (hovered || value) ? "#f5a623" : "#ccc", cursor: "pointer", userSelect: "none" }}>★</span>
      ))}
      {value > 0 && <span style={{ fontSize: "0.85rem", color: "#888", marginLeft: "4px" }}>{value}/5</span>}
    </div>
  );
}

// ================= หน้าหลัก =================
export default function CommentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ รับ query params จากหน้า travel / food / dashboard
  const queryTitle    = searchParams.get("title")    || "";
  const queryImage    = searchParams.get("image")    || "";
  const queryDesc     = searchParams.get("desc")     || "";
  const queryLocation = searchParams.get("location") || "";

  const queryHandled = useRef(false);

  const [view, setView]                   = useState("list");
  const [articles, setArticles]           = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editArticle, setEditArticle]     = useState(null);
  const [prefill, setPrefill]             = useState(null);
  const [search, setSearch]               = useState("");
  const [loading, setLoading]             = useState(true);
  const [infoBanner, setInfoBanner]       = useState("");

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res  = await fetch(`${API}/articles`);
      const data = await res.json();
      setArticles(data);
      return data;
    } catch (err) {
      console.error("โหลดบทความไม่ได้:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArticles(); }, []);

  // ✅ Logic หลัก: ตรวจสอบ query params หลัง articles โหลดเสร็จ
  useEffect(() => {
    if (!queryTitle || loading || queryHandled.current) return;
    queryHandled.current = true;

    const found = articles.find(
      (a) => a.title.trim().toLowerCase() === queryTitle.trim().toLowerCase()
    );

    if (found) {
      // มีบทความอยู่แล้ว → เปิดอ่านบทความนั้นทันที
      setInfoBanner(`✅ พบบทความเกี่ยวกับ "${queryTitle}" แล้ว`);
      setSelectedArticle(found);
      setView("detail");
    } else {
      // ยังไม่มี → เปิดฟอร์มพร้อม pre-fill
      setInfoBanner(`📌 ยังไม่มีบทความเกี่ยวกับ "${queryTitle}" — กรอกเนื้อหาแล้วเผยแพร่ได้เลย`);
      const defaultContent = [
        queryDesc     ? queryDesc                    : "",
        queryLocation ? `\nที่ตั้ง: ${queryLocation}` : "",
      ].join("").trim();

      setPrefill({ title: queryTitle, imageUrl: queryImage, content: defaultContent });
      setEditArticle(null);
      setView("form");
    }
  }, [articles, loading]);

  const handleSaveArticle = async (article) => {
    try {
      if (editArticle) {
        await fetch(`${API}/articles/${article.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: article.title, content: article.content, author: article.author, image_url: article.imageUrl }),
        });
      } else {
        const res  = await fetch(`${API}/articles`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: article.title, content: article.content, author: article.author, image_url: article.imageUrl }),
        });
        const data = await res.json();
        article.id = data.id;
      }
      const fresh   = await fetch(`${API}/articles`).then((r) => r.json());
      setArticles(fresh);
      setEditArticle(null);
      setPrefill(null);
      const updated = fresh.find((a) => a.id === article.id) || fresh[0];
      setSelectedArticle(updated);
      setView("detail");
    } catch {
      alert("เกิดข้อผิดพลาด ไม่สามารถบันทึกได้");
    }
  };

  const handleUpdateArticle = (article) => {
    setArticles((prev) => prev.map((a) => (a.id === article.id ? article : a)));
    setSelectedArticle(article);
  };

  const handleDelete = async (id) => {
    if (!confirm("ต้องการลบบทความนี้ไหม?")) return;
    try {
      await fetch(`${API}/articles/${id}`, { method: "DELETE" });
      setArticles((prev) => prev.filter((a) => a.id !== id));
      setView("list");
    } catch {
      alert("เกิดข้อผิดพลาด ไม่สามารถลบได้");
    }
  };

  const filtered = articles.filter(
    (a) => a.title.toLowerCase().includes(search.toLowerCase()) ||
           a.content.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });

  // ================= VIEW: รายการบทความ =================
  if (view === "list") {
    return (
      <>
        <Header />
        <div className="container py-5">
          <button className="btn btn-outline-secondary mb-4" onClick={() => router.back()}>← ย้อนกลับ</button>

          {/* ✅ Banner */}
          {infoBanner && (
            <div className="alert alert-info rounded-3 mb-4 d-flex justify-content-between align-items-center">
              <span>{infoBanner}</span>
              <button className="btn-close" onClick={() => setInfoBanner("")} />
            </div>
          )}

          <h2 className="fw-bold mb-1 text-center">บทความอาหารหาดใหญ่</h2>
          <p className="text-center text-muted mb-5">รีวิว สูตร และเรื่องราวอาหารจากคนหาดใหญ่</p>

          <div className="d-flex gap-3 mb-5 flex-wrap align-items-center">
            <input type="text" className="form-control" placeholder="🔍 ค้นหาบทความ..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "360px", borderRadius: "50px", padding: "0.6rem 1.2rem" }} />
            <button className="btn btn-primary btn-lg rounded-pill shadow-sm"
              onClick={() => { setEditArticle(null); setPrefill(null); setView("form"); }}>
              + เขียนบทความใหม่
            </button>
            <span className="text-muted">{filtered.length} บทความ</span>
          </div>

          {loading && <div className="text-center py-5"><div className="spinner-border text-primary" role="status" /><p className="text-muted mt-3">กำลังโหลด...</p></div>}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-5"><div style={{ fontSize: "4rem" }}>🍽️</div><h4 className="text-muted mt-3">ยังไม่มีบทความ</h4></div>
          )}

          {!loading && filtered.map((article) => (
            <div className="row mb-5 pb-5 border-bottom" key={article.id}>
              <div className="col-md-6 mb-4">
                <div style={{ width: "100%", height: "360px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", background: "#f8f0e8", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  onClick={() => { setSelectedArticle(article); setView("detail"); }}>
                  {article.imageUrl
                    ? <img src={article.imageUrl} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => { e.target.style.display = "none"; e.target.parentNode.innerHTML = '<div style="font-size:5rem">🍜</div>'; }} />
                    : <div style={{ fontSize: "5rem" }}>🍜</div>}
                </div>
              </div>
              <div className="col-md-6">
                <h1 className="fw-bold" style={{ fontSize: "1.6rem", cursor: "pointer" }}
                  onClick={() => { setSelectedArticle(article); setView("detail"); }}>{article.title}</h1>
                <div className="mb-2"><StarDisplay comments={article.comments} /></div>
                <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "1rem" }}>✍️ {article.author} · 📅 {formatDate(article.createdAt)}</p>
                <div className="card border-0 bg-light p-4 rounded-4 mb-4">
                  <p className="text-secondary mb-0" style={{ lineHeight: "1.8" }}>
                    {article.content.length > 200 ? article.content.slice(0, 200) + "..." : article.content}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-lg rounded-pill shadow-sm" style={{ flex: 1 }}
                    onClick={() => { setSelectedArticle(article); setView("detail"); }}>อ่านบทความ →</button>
                  <button className="btn btn-outline-secondary btn-lg rounded-pill"
                    onClick={() => { setEditArticle(article); setPrefill(null); setView("form"); }}>✏️ แก้ไข</button>
                </div>
                <p className="text-muted mt-3" style={{ fontSize: "0.85rem" }}>💬 {(article.comments || []).length} ความเห็น</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (view === "form") {
    return (
      <FormView
        editArticle={editArticle}
        prefill={prefill}
        infoBanner={infoBanner}
        onBack={() => { setEditArticle(null); setPrefill(null); setInfoBanner(""); setView("list"); }}
        onSave={handleSaveArticle}
        onDelete={handleDelete}
      />
    );
  }

  if (view === "detail" && selectedArticle) {
    return (
      <DetailView
        article={selectedArticle}
        infoBanner={infoBanner}
        onBack={() => { setInfoBanner(""); setView("list"); }}
        onEdit={() => { setEditArticle(selectedArticle); setPrefill(null); setView("form"); }}
        onDelete={handleDelete}
        onUpdate={handleUpdateArticle}
      />
    );
  }

  return null;
}

// ================= ฟอร์มเขียน/แก้ไขบทความ =================
function FormView({ editArticle, prefill, infoBanner, onBack, onSave, onDelete }) {
  const fileInputRef = useRef(null);
  const isEdit = !!editArticle;

  // ✅ ใช้ prefill ถ้ามาจากหน้าอื่น ไม่งั้นใช้ editArticle
  const [title,   setTitle]   = useState(prefill?.title    || editArticle?.title   || "");
  const [content, setContent] = useState(prefill?.content  || editArticle?.content || "");
  const [author,  setAuthor]  = useState(editArticle?.author || "");
  const [imageUrl, setImageUrl] = useState(prefill?.imageUrl || editArticle?.imageUrl || "");
  const [uploadPreview, setUploadPreview] = useState(null);
  const [errors,  setErrors]  = useState({});
  const [saving,  setSaving]  = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res  = await fetch("http://localhost:3001/upload", { method: "POST", body: formData });
      const data = await res.json();
      setImageUrl(data.imageUrl);
      setUploadPreview(data.imageUrl);
    } catch {
      alert("อัพโหลดรูปไม่ได้ ลองใหม่อีกครั้ง");
    }
  };

  const handleSubmit = async () => {
    const e = {};
    if (!title.trim())   e.title   = "กรุณากรอกชื่อบทความ";
    if (!content.trim()) e.content = "กรุณากรอกเนื้อหา";
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setSaving(true);
    const finalImage = uploadPreview || imageUrl || null;
    const article = isEdit
      ? { ...editArticle, title: title.trim(), content: content.trim(), author: author.trim() || "ผู้ใช้นิรนาม", imageUrl: finalImage }
      : { title: title.trim(), content: content.trim(), author: author.trim() || "ผู้ใช้นิรนาม", imageUrl: finalImage, createdAt: new Date().toISOString(), comments: [] };

    await onSave(article);
    setSaving(false);
  };

  const displayImage = uploadPreview || imageUrl;

  return (
    <>
      <Header />
      <div className="container py-5">
        <button className="btn btn-outline-secondary mb-4" onClick={onBack}>← ย้อนกลับ</button>

        {/* ✅ Banner บอกว่ามาจากไหน */}
        {infoBanner && (
          <div className="alert alert-warning rounded-3 mb-4">{infoBanner}</div>
        )}

        <h2 className="fw-bold mb-1">{isEdit ? "✏️ แก้ไขบทความ" : "📝 เขียนบทความ"}</h2>
        <p className="text-muted mb-5">{isEdit ? "แก้ไขข้อมูลบทความของคุณ" : "แชร์ประสบการณ์ให้คนหาดใหญ่รู้จัก"}</p>

        <div className="row">
          <div className="col-md-7">
            <div className="card border-0 rounded-4 p-4 mb-4" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <div className="mb-4">
                <label className="fw-bold mb-2 d-block">ชื่อบทความ <span style={{ color: "red" }}>*</span></label>
                <input type="text" className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  placeholder="เช่น ข้าวมันไก่ร้านดังหาดใหญ่" value={title}
                  onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: "" })); }}
                  style={{ borderRadius: "10px", padding: "0.8rem 1rem" }} />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              <div className="mb-4">
                <label className="fw-bold mb-2 d-block">ชื่อผู้เขียน</label>
                <input type="text" className="form-control" placeholder="เช่น นักชิมหาดใหญ่" value={author}
                  onChange={(e) => setAuthor(e.target.value)} style={{ borderRadius: "10px", padding: "0.8rem 1rem" }} />
              </div>
              <div className="mb-3">
                <label className="fw-bold mb-2 d-block">เนื้อหาบทความ <span style={{ color: "red" }}>*</span></label>
                <textarea className={`form-control ${errors.content ? "is-invalid" : ""}`} rows={8}
                  placeholder="เขียนรีวิวหรือเรื่องราว..." value={content}
                  onChange={(e) => { setContent(e.target.value); setErrors((p) => ({ ...p, content: "" })); }}
                  style={{ borderRadius: "10px", padding: "0.8rem 1rem", resize: "vertical", lineHeight: "1.8" }} />
                {errors.content && <div className="invalid-feedback">{errors.content}</div>}
              </div>
              <p className="text-muted" style={{ fontSize: "0.85rem" }}>⭐ คะแนนดาวจะคำนวณจากผู้ที่มาคอมเม้นโดยอัตโนมัติ</p>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card border-0 rounded-4 p-4" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <label className="fw-bold mb-3 d-block">📸 รูปภาพประกอบ</label>
              {displayImage && (
                <div style={{ position: "relative", marginBottom: "1rem", borderRadius: "12px", overflow: "hidden" }}>
                  <img src={displayImage} alt="ตัวอย่าง" style={{ width: "100%", height: "220px", objectFit: "cover" }}
                    onError={(e) => (e.target.style.display = "none")} />
                  <button style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer" }}
                    onClick={() => { setUploadPreview(null); setImageUrl(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}>×</button>
                </div>
              )}
              <label className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>วาง URL รูปจากเว็บอื่น</label>
              <input type="text" className="form-control mb-3" placeholder="https://example.com/image.jpg"
                value={imageUrl} onChange={(e) => { setImageUrl(e.target.value); setUploadPreview(null); }}
                style={{ borderRadius: "10px", fontSize: "0.85rem" }} />
              <div className="text-center text-muted mb-3" style={{ fontSize: "0.85rem" }}>— หรือ —</div>
              <div className="text-center p-4 rounded-4"
                style={{ border: "2px dashed #dee2e6", cursor: "pointer", background: "#fafafa" }}
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0069d9")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#dee2e6")}>
                <div style={{ fontSize: "2rem" }}>🖼️</div>
                <p className="text-muted mb-0" style={{ fontSize: "0.88rem" }}>คลิกเพื่ออัพโหลดรูปภาพ</p>
                <p className="text-muted mb-0" style={{ fontSize: "0.78rem" }}>JPG, PNG, GIF</p>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <button className="btn btn-primary btn-lg rounded-pill shadow-sm" style={{ minWidth: "220px" }}
            onClick={handleSubmit} disabled={saving}>
            {saving ? "⏳ กำลังบันทึก..." : isEdit ? "💾 บันทึกการแก้ไข" : "🍽️ เผยแพร่บทความ"}
          </button>
          {isEdit && (
            <button className="btn btn-outline-danger btn-lg rounded-pill"
              onClick={() => onDelete(editArticle.id)}>
              🗑️ ลบบทความ
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ================= หน้าอ่านบทความ + คอมเม้น =================
function DetailView({ article: initArticle, infoBanner, onBack, onEdit, onDelete, onUpdate }) {
  const [article, setArticle]           = useState(initArticle);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentText, setCommentText]   = useState("");
  const [commentRating, setCommentRating] = useState(0);
  const [submitting, setSubmitting]     = useState(false);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("th-TH", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const res  = await fetch(`${API}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article_id: article.id, author: commentAuthor.trim() || "ผู้ใช้นิรนาม", text: commentText.trim(), rating: commentRating }),
      });
      const data = await res.json();
      const newComment = { id: data.id, author: commentAuthor.trim() || "ผู้ใช้นิรนาม", text: commentText.trim(), rating: commentRating, createdAt: new Date().toISOString() };
      const updated = { ...article, comments: [...(article.comments || []), newComment] };
      setArticle(updated);
      onUpdate(updated);
      setCommentAuthor(""); setCommentText(""); setCommentRating(0);
    } catch {
      alert("เกิดข้อผิดพลาด ไม่สามารถส่งความเห็นได้");
    } finally {
      setSubmitting(false);
    }
  };

  const ratings   = (article.comments || []).filter((c) => c.rating > 0);
  const avgRating = ratings.length > 0
    ? (ratings.reduce((sum, c) => sum + c.rating, 0) / ratings.length).toFixed(1)
    : null;

  return (
    <>
      <Header />
      <div className="container py-5">

        {/* ✅ Banner บอกว่าเจอบทความนี้จากการค้นหา */}
        {infoBanner && (
          <div className="alert alert-success rounded-3 mb-4">{infoBanner}</div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-2">
          <button className="btn btn-outline-secondary rounded-pill" onClick={onBack}>← ย้อนกลับ</button>
          <button className="btn btn-warning rounded-pill fw-bold" onClick={onEdit}>✏️ แก้ไขบทความ</button>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div style={{ width: "100%", height: "400px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", background: "#f8f0e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {article.imageUrl
                ? <img src={article.imageUrl} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.target.style.display = "none"; e.target.parentNode.innerHTML = '<div style="font-size:6rem">🍜</div>'; }} />
                : <div style={{ fontSize: "6rem" }}>🍜</div>}
            </div>
          </div>
          <div className="col-md-6">
            <h1 className="fw-bold">{article.title}</h1>
            <div className="mb-1"><StarDisplay comments={article.comments} /></div>
            {avgRating && <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "4px" }}>⭐ คะแนนเฉลี่ย <strong>{avgRating}</strong>/5 จาก {ratings.length} รีวิว</p>}
            <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "1.5rem" }}>✍️ {article.author} · 📅 {formatDate(article.createdAt)}</p>
            <div className="card border-0 bg-light p-4 rounded-4">
              <h5 className="fw-bold">รายละเอียด</h5>
              <p className="text-secondary mb-0" style={{ lineHeight: "1.9", whiteSpace: "pre-wrap" }}>{article.content}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="fw-bold mb-4">💬 ความเห็น <span className="ms-2 badge rounded-pill bg-primary" style={{ fontSize: "0.85rem" }}>{(article.comments || []).length}</span></h4>
          {(article.comments || []).length === 0
            ? <p className="text-muted mb-4">ยังไม่มีความเห็น เป็นคนแรกเลย!</p>
            : <div className="d-flex flex-column gap-3 mb-4">
                {article.comments.map((c) => (
                  <div key={c.id} className="card border-0 rounded-4 p-3" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold" style={{ color: "#0069d9" }}>🙋 {c.author}</span>
                      <span className="text-muted" style={{ fontSize: "0.78rem" }}>{formatDate(c.createdAt)}</span>
                    </div>
                    {c.rating > 0 && <div style={{ marginBottom: "4px" }}>{[1,2,3,4,5].map((i) => <span key={i} style={{ color: i <= c.rating ? "#f5a623" : "#ccc", fontSize: "0.95rem" }}>★</span>)}</div>}
                    <p className="mb-0 text-secondary" style={{ lineHeight: "1.6" }}>{c.text}</p>
                  </div>
                ))}
              </div>
          }

          <div className="card border-0 rounded-4 p-4" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <h5 className="fw-bold mb-3">✍️ แสดงความเห็น</h5>
            <input type="text" className="form-control mb-3" placeholder="ชื่อของคุณ (ไม่ระบุก็ได้)"
              value={commentAuthor} onChange={(e) => setCommentAuthor(e.target.value)} style={{ borderRadius: "10px" }} />
            <StarPicker value={commentRating} onChange={setCommentRating} />
            <textarea className="form-control mb-3" rows={4} placeholder="เขียนความเห็นของคุณ..."
              value={commentText} onChange={(e) => setCommentText(e.target.value)} style={{ borderRadius: "10px", resize: "vertical" }} />
            <button className="btn btn-primary btn-lg rounded-pill shadow-sm" onClick={handleAddComment} disabled={!commentText.trim() || submitting}>
              {submitting ? "⏳ กำลังส่ง..." : "ส่งความเห็น →"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const navLinkStyle = {
  textDecoration: "none", color: "#555",
  paddingBottom: "4px", borderBottom: "2px solid transparent",
  transition: "border-color 0.2s ease", cursor: "pointer",
};
const logoutBtnStyle = {
  padding: "6px 14px", borderRadius: "6px",
  border: "1px solid #ff6f61", backgroundColor: "white",
  color: "#ff6f61", fontWeight: "600", cursor: "pointer", marginLeft: "24px",
}; 