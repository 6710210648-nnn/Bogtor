"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) router.push("/login");
    else setUser(JSON.parse(data));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return null;

  // ข้อมูลสถานที่ตัวอย่าง
  const places = [
    {
      titleTH: "สวนสาธารณะเทศบาลนครหาดใหญ่",
      titleEN: "Hat Yai Municipal Park, Jm",
      img:"/HatyaiPark.jpg",
      description: "สวนสวย บรรยากาศดี",
    },

    {
      titleTH: "ตลาดกิมหยง",
      titleEN: "Gim Yong Market",
      img: "/gimyong.jpg",
      description: "ตลาดสดชื่อดังของหาดใหญ่",
    },
    {
      titleTH: "เจดีย์สเตนเลส",
      titleEN: "Stainless Steel Pagoda, Wat Hat Yai Nai",
      img: "/jeady.jpg",
      description: "เจดีย์สวยงามโดดเด่น",
    },
    {
      titleTH: "มัสยิดกลางจังหวัดสงขลา",
      titleEN: "Central Mosque of Songkhla at Hat Yai Sorsqua",
      img: "/mussayid.jpg",
      description: "มัสยิดที่สำคัญของสงขลา",
    },
  ];

  // ข้อมูลร้านอาหารตัวอย่าง
  const foods = [
    {
      nameTH: "ข้าวยำปักษ์ใต้",
      location: "สงขลา",
      img: "/ข้าวยำ.jpg",
      description: "ข้าวยำรสชาติเข้มข้น อร่อยแบบต้นตำรับ",
    },
    {
      nameTH: "หอยทอด",
      location: "สงขลา",
      img: "/หอยทอด.jpg",
      description: "หอยทอดกรอบ ๆ ทานคู่กับน้ำจิ้มสูตรเด็ด",
    },
    {
      nameTH: "ไก่ทอดหาดใหญ่",
      location: "สงขลา-หาดใหญ่",
      img: "/ไก่ทอดหาดใหญ่.jpg",
      description: "หนังกรอบๆ เนื้อนุ่มหอมกลิ่นกระเทียม",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Sarabun', sans-serif, Arial",
        backgroundColor: "white", // พื้นหลังขาว
        minHeight: "100vh",
      }}
    >
      {/* Header */}
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

        {/* เมนู */}
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
          <a href="Bogtor/frontend/src/app/dashboard/page.jsx" style={navLinkStyle}>
            หน้าแรก
          </a>
          <a href="Bogtor/frontend/src/app/travel/page.jsx" style={navLinkStyle}>
            สถานที่ท่องเที่ยว
          </a>
          <a href="Bogtor/frontend/src/app/food/page.jsx" style={navLinkStyle}>
            ร้านอาหาร
          </a>
          <a href="#" style={navLinkStyle}>
            บทความ
          </a>
          <a href="#" style={navLinkStyle}>
            เกี่ยวกับเรา
          </a>
          <button onClick={handleLogout} style={logoutBtnStyle}>
            Logout
          </button>
        </nav>
      </header>

      {/* Banner */}
<section
  style={{
    position: "relative",
    backgroundImage: "url('/images/momo.jpg')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "320px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textShadow: "0 2px 8px rgba(0,0,0,0.7)",
    fontWeight: "700",
    fontSize: "36px",
    textAlign: "center",
  }}
>
        ค้นพบเสน่ห์หาดใหญ่
        <p style={{ fontSize: "18px", fontWeight: "400", marginTop: "12px" }}>
          รวมที่เที่ยว ที่กิน ยอดฮิตในอำเภอหาดใหญ่ จังหวัดสงขลา
        </p>
        <button style={bannerBtnStyle}>เริ่มสำรวจ</button>
      </section>

      {/* สถานที่แนะนำ */}
      <section
        style={{ maxWidth: "1080px", margin: "40px auto 20px", padding: "0 20px" }}
      >
        <h2
          style={{
            fontWeight: "700",
            fontSize: "24px",
            marginBottom: "24px",
            color: "#222",
          }}
        >
          สถานที่ท่องเที่ยวแนะนำ
        </h2>
        <div
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            paddingBottom: "10px",
            scrollbarWidth: "thin",
            scrollbarColor: "#ccc transparent",
          }}
        >
          {places.map(({ titleTH, titleEN, img, description }) => (
            <div
              key={titleTH}
              style={{
                minWidth: "230px",
                borderRadius: "12px",
                backgroundColor: "white",
                boxShadow: "0 4px 8px rgb(0 0 0 / 0.1)",
                overflow: "hidden",
                cursor: "pointer",
                flexShrink: 0,
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={img}
                alt={titleTH}
                style={{ width: "100%", height: "140px", objectFit: "cover" }}
              />
              <div style={{ padding: "16px" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "18px", color: "#111" }}>
                  {titleTH}
                </h3>
                <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
                  {titleEN}
                </p>
                <button
                  style={cardBtnStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0053ba")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0069d9")}
                >
                  อ่านเพิ่มเติม
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ร้านอาหารแนะนำ */}
      <section
        style={{ maxWidth: "1080px", margin: "20px auto 40px", padding: "0 20px" }}
      >
        <h2
          style={{
            fontWeight: "700",
            fontSize: "24px",
            marginBottom: "24px",
            color: "#222",
          }}
        >
          ร้านอาหารแนะนำ
        </h2>
        <div
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            paddingBottom: "10px",
            scrollbarWidth: "thin",
            scrollbarColor: "#ccc transparent",
          }}
        >
          {foods.map(({ nameTH, location, img, description }) => (
            <div
              key={nameTH}
              style={{
                minWidth: "230px",
                borderRadius: "12px",
                backgroundColor: "white",
                boxShadow: "0 4px 8px rgb(0 0 0 / 0.1)",
                overflow: "hidden",
                cursor: "pointer",
                flexShrink: 0,
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={img}
                alt={nameTH}
                style={{ width: "100%", height: "140px", objectFit: "cover" }}
              />
              <div style={{ padding: "16px" }}>
                <h3 style={{ margin: "0 0 6px 0", fontSize: "18px", color: "#111" }}>
                  {nameTH} - {location}
                </h3>
                <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
                  {description}
                </p>
                <button
                  style={cardBtnStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0053ba")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0069d9")}
                >
                  อ่านเพิ่มเติม
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer แบบโปร่งใส */}
      <footer
        style={{
          backgroundColor: "transparent",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#555",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        © 2026 BOGTOR - Hat Yai Travel & Food
      </footer>
    </div>
  );
}

// สไตล์ลิงก์เมนู
const navLinkStyle = {
  textDecoration: "none",
  color: "#555",
  paddingBottom: "4px",
  borderBottom: "2px solid transparent",
  transition: "border-color 0.2s ease",
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
  transition: "all 0.2s ease",
};

const bannerBtnStyle = {
  marginTop: "20px",
  padding: "12px 36px",
  fontWeight: "700",
  fontSize: "18px",
  color: "#ff6f61",
  backgroundColor: "white",
  border: "none",
  borderRadius: "30px",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(255,111,97,0.3)",
  transition: "all 0.3s ease",
};

const cardBtnStyle = {
  padding: "8px 16px",
  backgroundColor: "#0069d9",
  borderRadius: "20px",
  border: "none",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};