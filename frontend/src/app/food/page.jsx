"use client";

import { useRouter } from "next/navigation";

export default function Header() {
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
        <a href="/dashboard" style={navLinkStyle}>
          หน้าแรก
        </a>
        <a href="/travel" style={navLinkStyle}>
          สถานที่ท่องเที่ยว
        </a>
        <a href="/food" style={{ ...navLinkStyle, color: "#e85d04", borderBottom: "2px solid #e85d04" }}>
          ร้านอาหาร
        </a>
        <a href="/comment" style={navLinkStyle}>
          บทความ
        </a>
        <a href="/account" style={navLinkStyle}>
          ข้อมูลผู้ใช้
        </a>
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Logout
        </button>
      </nav>
    </header>
  );
}

// style
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
};