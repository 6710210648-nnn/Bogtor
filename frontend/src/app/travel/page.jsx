"use client";

import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

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
          color: "#555",
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

  const travelData = {
    titleTH: "สวนสาธารณะเทศบาลนครหาดใหญ่",
    titleEN: "Hat Yai Municipal Park",
    img: "/HatyaiPark.jpg",
    description:
      "แลนด์มาร์คสำคัญของหาดใหญ่ ที่มีทั้งกระเช้าลอยฟ้า พระพุทธมงคลมหาราช และจุดชมวิวเมืองหาดใหญ่แบบ 360 องศา",
    location: "ถนนกาญจนวนิช ตำบลคอหงส์ อำเภอหาดใหญ่ จังหวัดสงขลา",
    openingHours: "05:00 - 20:00 น.",
  };

  return (
    <>
      <Header />

      <div className="container py-5">
        {/* ปุ่มย้อนกลับ */}
        <button
          className="btn btn-outline-secondary mb-4"
          onClick={() => router.back()}
        >
          ← ย้อนกลับ
        </button>

        <div className="row">
          {/* รูป */}
          <div className="col-md-6 mb-4">
            <img
              src={travelData.img}
              alt={travelData.titleTH}
              className="img-fluid rounded-4 shadow"
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
          </div>

          {/* รายละเอียด */}
          <div className="col-md-6">
            <h1 className="fw-bold">{travelData.titleTH}</h1>
            <h4 className="text-muted mb-4">{travelData.titleEN}</h4>

            <div className="card border-0 bg-light p-4 rounded-4">
              <h5 className="fw-bold">รายละเอียด</h5>
              <p className="text-secondary">{travelData.description}</p>
              <hr />
              <p><strong>📍 ที่ตั้ง:</strong> {travelData.location}</p>
              <p><strong>⏰ เวลาเปิด-ปิด:</strong> {travelData.openingHours}</p>
            </div>

            <button className="btn btn-primary btn-lg w-100 mt-4 rounded-pill shadow-sm">
              ดูแผนที่ (Google Maps)
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= STYLE ================= */
const navLinkStyle = {
  textDecoration: "none",
  color: "#555",
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