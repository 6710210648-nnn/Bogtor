"use client";

import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
// เพิ่ม useEffect เข้าไปในปีกกาด้านล่างนี้
import React, { useState, useEffect } from 'react';

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
      <h1
        style={{
          fontWeight: "700",
          fontSize: "28px",
          color: "#333",
          margin: 0,
        }}
      >
        HAT YAI TRAVEL & FOOD
      </h1>

      <nav
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "24px",
          fontWeight: "600",
          fontSize: "16px",
          color: "#ff0095",
        }}
      >
        <a href="/dashboard" style={navLinkStyle}>หน้าแรก</a>
        <a href="/travel" style={navLinkStyle}>สถานที่ท่องเที่ยว</a>
        <a href="/food" style={navLinkStyle}>ร้านอาหาร</a>
        <a href="#" style={navLinkStyle}>บทความ</a>
        <a href="/account" style={navLinkStyle}>ข้อมูลส่วนตัว</a>
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Logout
        </button>
      </nav>
    </header>
  );

}

/* ================= PAGE ================= */
export default function TravelPage() {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");

  // ✨ Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
  id: null,
  title_th: "",
  title_en: "",
  description: "", // แก้สะกดให้ตรงกับ Backend
  category: "",    // ใช้ตัวเล็กให้หมด
  location_address: "",
  map_url: "",
  opening_hours: "",
  image_url: null
});

  const [uploading, setUploading] = useState(false);

  // Fetch
  const fetchTravelData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/travel");
      const data = await res.json();
      setTravelData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchTravelData(); }, []);

  const categories = ["ทั้งหมด", ...new Set(travelData.map(item => item.category ))];

  const filteredPlaces = travelData.filter((place) => {
    const matchesSearch = (place.title_th?.toLowerCase().includes(searchTerm.toLowerCase())) || 
                          (place.title_en?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "ทั้งหมด" || (place.category ) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ✨ ปุ่มเพิ่มสถานที่
  const handleAdd = () => {
    setIsEdit(false);
    setForm({
      id: null,
      title_th: "",
      title_en: "",
      description: "",
      category: "",
      location_address: "",
      map_url: "",
      opening_hours: "",
      image: null,
    });
    setIsOpen(true);
  };

  // ✨ ปุ่มแก้ไขสถานที่
  const handleEdit = (place) => {
    setIsEdit(true);
    setForm({ ...place, image_url: place.image || "" });
    setIsOpen(true);
  };

  // ✨ Upload รูป (ตัวอย่าง)
  const handleUpload = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file, image_url: URL.createObjectURL(file) });
  };

  // ✨ Save (POST หรือ PUT)
  const handleSave = async () => {
  try {
    const url = isEdit ? `http://localhost:3001/travel/${form.id}` : "http://localhost:3001/travel";
    const method = isEdit ? "PUT" : "POST";

    const payload = {
      title_th: form.title_th || "No Title",
      title_en: form.title_en || "No Title",
      description: form.description || "",
      category: form.category || "ทั่วไป",
      location_address: form.location_address || "",
      map_url: form.map_url || "",
      opening_hours: form.opening_hours || "",
      // ลองคอมเมนต์บรรทัดนี้ออกก่อนเพื่อเช็กว่าพังเพราะรูปไหม
      // image_url: form.image_url 
    };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      // ดึง Error Message จากฝั่ง Server ออกมาดู
      const errorDetail = await res.json(); 
      console.log("Server Error Detail:", errorDetail);
      throw new Error(`Server error: ${res.status}`);
    }

    setIsOpen(false);
    fetchTravelData();
  } catch (err) {
    console.error("Save Error:", err);
    alert("บันทึกไม่สำเร็จ! ลองเช็กที่ Console ของตัวโปรแกรม Backend (Terminal)");
  }
};

  // ✨ ลบ
  const handleDelete = async (id) => {
    if (!confirm("ต้องการลบจริงๆ หรออ้วน?")) return;
    await fetch(`http://localhost:3001/travel/${id}`, { method: 'DELETE' });
    fetchTravelData();
  };

  // Styles ของ Modal
  const modalOverlay = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex: 999 };
  const modalStyle = { background:'white', padding:'20px', borderRadius:'10px', width:'400px', maxHeight:'90vh', overflowY:'auto' };
  const inputStyle = { width:'100%', padding:'8px', margin:'5px 0', borderRadius:'5px', border:'1px solid #ccc' };
  const previewImg = { width:'120px', height:'120px', objectFit:'cover', marginBottom:'10px', borderRadius:'8px' };
  const previewPlaceholder = { width:'120px', height:'120px', background:'#eee', display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'10px', borderRadius:'8px' };
  const saveBtn = { flex:1, padding:'8px', background:'green', color:'white', border:'none', borderRadius:'5px' };
  const cancelBtn = { flex:1, padding:'8px', background:'red', color:'white', border:'none', borderRadius:'5px' };

  return (
    <div className="bg-light min-vh-100">
      <Header />

      <div className="container py-5" style={{ maxWidth: '1000px' }}>
        <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-4">
          <h2 className="fw-bold mb-1">สำรวจหาดใหญ่กับ BOGTOR 🚌</h2>
          <button className="btn btn-outline-dark btn-sm rounded-pill px-3" onClick={handleAdd}>เพิ่มสถานที่</button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="form-control rounded-pill px-4 py-2 shadow-sm"
            placeholder="🔎ค้นหา"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill px-3 transition-all ${selectedCategory === cat ? 'btn-dark':'btn-white shadow-sm'}`}
              onClick={() => setSelectedCategory(cat)}
            >{cat}</button>
          ))}
        </div>

        {!loading && filteredPlaces.length === 0 && (
          <div className="text-center py-5"><p>ไม่พบสถานที่ท่องเที่ยว 🔍</p></div>
        )}

        {!loading && filteredPlaces.map(place => (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 hover-shadow transition-all" key={place.id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={place.image && place.image.startsWith('http') ? place.image : (place.image ? `http://localhost:3001/uploads_travel/${place.image}`:'/placeholder.jpg')}
                  alt={place.title_th}
                  className="img-fluid h-100 w-100"
                  style={{ objectFit:"cover", minHeight:'250px' }}
                  onError={(e)=>{ e.target.src='https://via.placeholder.com/400x250?text=No+Image'; e.target.onerror=null; }}
                />
              </div>
              <div className="col-md-8 d-flex flex-column justify-content-center p-4">
                <div className="mb-2">
                  <span className="badge bg-secondary-subtle text-secondary mb-2 fw-normal">{place.category||"หาดใหญ่"}</span>
                  <h4 className="fw-bold mb-0 text-dark">{place.title_th}</h4>
                  <span className="text-primary small fw-medium text-uppercase">{place.title_en}</span>
                </div>
                <p className="text-secondary small mb-3" style={{ display:'-webkit-box', WebkitLineClamp:'2', WebkitBoxOrient:'vertical', overflow:'hidden' }}>{place.description}</p>
                <div className="bg-light p-3 rounded-3 mb-3" style={{ fontSize:'0.85rem' }}>
                  <div className="d-flex mb-2"><i className="bi bi-geo-alt text-danger me-2"></i><span className="text-dark truncate">{place.location_address}</span></div>
                  <div className="d-flex"><i className="bi bi-clock text-muted me-2"></i><span className="text-dark">{place.opening_hours}</span></div>
                </div>

                <div className="mt-auto d-flex gap-2">
                    <button className="btn btn-maps rounded-pill px-3 btn-sm shadow-sm" onClick={()=>window.open(place.map_url,'_blank')}>
                    <i className="bi bi-pin-map-fill me-2"></i> Maps
                 </button>

                <button className="btn btn-edit rounded-pill px-3 btn-sm shadow-sm" onClick={()=>handleEdit(place)}>
                  แก้ไข
                </button>
            
                <button className="btn btn-delete rounded-pill px-3 btn-sm shadow-sm" onClick={()=>handleDelete(place.id)}>
                   ลบ
                </button>
              </div>
              </div>
            </div>
          </div>
        ))}

        {/* ✨ Modal */}
        {isOpen && (
          <div style={modalOverlay}>
            <div style={modalStyle}>
              <h3>{isEdit ? "แก้ไขสถานที่" : "เพิ่มสถานที่"}</h3>

              <div style={{ textAlign: "center" }}>
                {form.image_url ? <img src={form.image_url} style={previewImg}/> : <div style={previewPlaceholder}>No Image</div>}
                <input type="file" onChange={handleUpload}/>
                {uploading && <p> Uploading...</p>}
              </div>

              <input placeholder="ชื่อไทย" style={inputStyle} value={form.title_th || ''}onChange={(e)=>setForm({...form,title_th:e.target.value})}/>
              <input placeholder="ชื่ออังกฤษ" style={inputStyle} value={form.title_en} onChange={(e)=>setForm({...form,title_en:e.target.value})}/>
              <input placeholder="Category" style={inputStyle} value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}/>
              <input placeholder="ที่อยู่" style={inputStyle} value={form.location_address} onChange={(e)=>setForm({...form,location_address:e.target.value})}/>
              <input placeholder="เวลาเปิด" style={inputStyle} value={form.opening_hours} onChange={(e)=>setForm({...form,opening_hours:e.target.value})}/>
              <input placeholder="URL แผนที่" style={inputStyle} value={form.map_url} onChange={(e)=>setForm({...form,map_url:e.target.value})}/>
             <input 
                     placeholder="รายละเอียด" 
                     style={inputStyle} 
                     value={form.description} 
                     onChange={(e) => setForm({ ...form, description: e.target.value })} 
             />
              <div style={{ display:"flex", gap:"10px", marginTop:"10px" }}>
                <button style={saveBtn} onClick={handleSave}>Save</button>
                <button style={cancelBtn} onClick={()=>setIsOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .hover-shadow:hover {
          transform: translateY(-5px);
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

        .btn-maps {
          background: #8ef2ff; 
          color: #000000;       
       
        }

       .btn-edit {
         background: #91f9ae;
         color: #000000;       
          
       }

      .btn-delete {
        background: #d24141; 
        color: #000000;       
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