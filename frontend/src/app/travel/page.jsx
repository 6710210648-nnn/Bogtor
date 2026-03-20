"use client";

import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";




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
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const travelDataList = [
    { id: 1, titleTH: "ตลาดกิมหยง", titleEN: "Kim Yong Market", img: "/gimyong.jpg", description: "ตลาดชื่อดังศูนย์รวมของฝากจากต่างประเทศ ผลไม้สด ผลไม้อบแห้ง และถั่วนานาชนิดที่เป็นเอกลักษณ์ของเมืองหาดใหญ่", location: "📍ถนนศุภสารรังสรรค์ ตำบลหาดใหญ่ อำเภอหาดใหญ่ จังหวัดสงขลา", mapUrl: "https://maps.app.goo.gl/Fv1923bzyFJ2kZcS6", openingHours: "06:00 - 18:00 น." },
    { id: 2, titleTH: "สวนสาธารณะเทศบาลนครหาดใหญ่", titleEN: "Hat Yai Municipal Park", img: "/HatyaiPark.jpg", description: "แลนด์มาร์คสำคัญของหาดใหญ่ ที่มีทั้งกระเช้าลอยฟ้า พระพุทธมงคลมหาราช และจุดชมวิวเมืองหาดใหญ่แบบ 360 องศา", location: "📍ถนนกาญจนวนิช ตำบลคอหงส์ อำเภอหาดใหญ่ จังหวัดสงขลา", mapUrl: "https://maps.app.goo.gl/dwrWwRN7XzhyziLq6", openingHours: "05:00 - 20:00 น." },
    { id: 3, titleTH: "ตลาดน้ำคลองแห", titleEN: "Khlong Hae Floating Market", img: "/คลองเเห.jpg", description: "ตลาดน้ำแห่งแรกของภาคใต้ สัมผัสวิถีชีวิตชาวบ้าน ชิมอาหารท้องถิ่นที่ขายบนเรือพาย และใช้ภาชนะจากธรรมชาติ", location: "📍ตำบลคลองแห อำเภอหาดใหญ่ จังหวัดสงขลา", mapUrl: "https://maps.app.goo.gl/grYc3dN9ZqvfYWQe9", openingHours: "ศุกร์ - อาทิตย์ 13:00 - 21:00 น." },
    { id: 4, titleTH: "วัดหาดใหญ่ใน", titleEN: "Mahattamangkalaram", img: "/วัดหาดใหญ่ใน.jpg", description: "ที่ประดิษฐานพระพุทธไสยาสน์ขนาดใหญ่ที่สุดในภาคใต้", location: "📍ถ.เพชรเกษม อำเภอหาดใหญ่ จังหวัดสงขลา", mapUrl: "https://maps.app.goo.gl/2gsRKkFjbnNGGWQA8", openingHours: "7:00 - 18:00 น." },
    { id: 5, titleTH: "น้ำตกโตนงาช้าง", titleEN: "Ton Nga Chang Waterfall", img: "/โตนงาช้าง.jpg", description: "น้ำตก 7 ชั้นที่มีชื่อเสียง โดยเฉพาะชั้นที่ 3 (งาช้าง)", location: "📍เขตรักษาพันธุ์สัตว์ป่า", mapUrl: "https://maps.app.goo.gl/zVVA77TCLeLt7f1U6", openingHours: "9:00 - 16:00 น." },
    { id: 6, titleTH: "เซ็นทรัล หาดใหญ่", titleEN: "Central Hatyai", img: "/เซนทรัล.jpg", description: "ห้างสรรพสินค้าที่ใหญ่ที่สุดในหาดใหญ่ ครบครันทุกบริการ", location: "📍ถ.กาญจนวณิช อำเภอหาดใหญ่ จังหวัดสงขลา", mapUrl: "https://maps.app.goo.gl/BkpSpBKZ6ECBuKReA", openingHours: "10:00 - 21:00 น." },
    { id: 7, titleTH: "มัสยิดกลางประจำจังหวัดสงขลา", titleEN: "Songkhla Central Mosque", img: "/mussayid.jpg", description: "ศาสนสถาน ศูนย์รวมจิตใจชาวมุสลิม", location: "📍ต.คลองแห อำเภอหาดใหญ่ จังหวัดสงขลา", mapUrl: "https://maps.app.goo.gl/J5KYHJHcYaPJttz2A", openingHours: "8:30 - 15:30 น." },
    { id: 8, titleTH: "วัดฉื่อฉาง", titleEN: "慈善寺", img: "/ฉือฉาง.jpg", description: "ศูนย์กลางการจัดงานเทศกาลสำคัญของชาวจีน", location: "📍ถนนศุภสารรังสรรค์ อำเภอหาดใหญ่ จังหวัดสงขลา", mapUrl: "https://maps.app.goo.gl/9mzBB3b3Wz8W8U4N7", openingHours: "7:00 - 19:00 น." },
    { id: 9, titleTH: "ตลาดกรีนเวย์ไนท์มาร์เก็ต", titleEN: "greenwaynightmarket", img: "/กรีนเว.jpg", description: "ตลาดนัดกลางคืน เสื้อผ้า ของกินมากมาย", location: "📍ถนน กาญจนวณิชย์ อำเภอหาดใหญ่ จังหวัดสงขลา", mapUrl: "https://maps.app.goo.gl/U8goNhZX9CTYYM5e6", openingHours: "17:00 - 22:00น." },
    { id: 10, titleTH: "พระมหาธาตุเจดีย์ไตรภพไตรมงคล", titleEN: "Maha That Chedi Triphop Tri Mongkhon", img: "/jeady.jpg", description: "พบกับเรื่องราวเกี่ยวกับมายากลมากมายที่จัดแสดงทั้งโซนภาพวาดสามมิติสุดอลังการ", location: "📍ถนนปุณณกัณฑ์ ตำบลคอหงส์ อำเภอหาดใหญ่ จังหวัดสงขลา", mapUrl: "https://maps.app.goo.gl/gPKDotRsn57ERipk6", openingHours: "24 ชั่วโมง" },
   
  ];

  return (
    <div className="bg-light min-vh-100">
      <Header />

      <div className="container py-5" style={{ maxWidth: '1000px' }}>
        {/* Header Section */}

        <div className="mb-4">
           <input
             type="text"
             className="form-control rounded-pill px-4 py-2 shadow-sm"
             placeholder="🔎ค้นหาได้ที่นี้นะอ้วน"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        <div className="d-flex justify-content-between align-items-end mb-5 border-bottom pb-4">
          <div>
            <h2 className="fw-bold mb-1">สำรวจหาดใหญ่กับพวกเรา BOGTOR </h2>
            <p className="text-muted mb-0">รวมสถานที่ท่องเที่ยวในหาดใหญ่ เมื่อมาเยือนที่คุณห้ามพลาด✈️</p>
          </div>
          <button
            className="btn btn-outline-dark btn-sm rounded-pill px-3"
            onClick={() => window.history.back()}
          >
            <i className="bi bi-arrow-left me-1"></i> ย้อนกลับ
          </button>
        </div>

        {/* List Loop */}
        {travelDataList.filter((place) =>
          place.titleTH.toLowerCase().includes(searchTerm.toLowerCase()) ||
          place.titleEN.toLowerCase().includes(searchTerm.toLowerCase())
              )
          .map((place) => (
          <div 
            className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 hover-shadow transition-all" 
            key={place.id}
            style={{ transition: '0.3s' }}
          >
            <div className="row g-0">
              {/* รูปภาพขนาดเล็กลง (Fixed Width บน Desktop) */}
              <div className="col-md-4">
                <img
                  src={place.img}
                  alt={place.titleTH}
                  className="img-fluid h-100 w-100"
                  style={{ objectFit: "cover", minHeight: '250px' }}
                />
              </div>

              {/* รายละเอียดฝั่งขวา */}
              <div className="col-md-8 d-flex flex-column justify-content-center p-4">
                <div className="mb-2">
                  <h4 className="fw-bold mb-0 text-dark">{place.titleTH}</h4>
                  <span className="text-primary small fw-medium text-uppercase">{place.titleEN}</span>
                </div>
                
                <p className="text-secondary small mb-3" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {place.description}
                </p>
                

                <div className="bg-light p-3 rounded-3 mb-3" style={{ fontSize: '0.85rem' }}>
                  <div className="d-flex mb-2">
                    <i className="bi bi-geo-alt text-danger me-2"></i>
                    <span className="text-dark truncate">{place.location}</span>
                  </div>
                  <div className="d-flex">
                    <i className="bi bi-clock text-muted me-2"></i>
                    <span className="text-dark">{place.openingHours}</span>
                  </div>
                </div>
                

                <div className="mt-auto">
                  <button 
                    className="btn btn-dark rounded-pill px-4 btn-sm shadow-sm"
                    onClick={() => window.open(place.mapUrl, '_blank')}
                  >
                    <i className="bi bi-pin-map-fill me-2"></i> ดูแผนที่
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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


 
