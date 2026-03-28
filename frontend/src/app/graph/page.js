"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BlogPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("ERROR:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const male = users.filter(
    (u) => u.gender?.toLowerCase() === "male"
  ).length;

  const female = users.filter(
    (u) => u.gender?.toLowerCase() === "female"
  ).length;

  const total = male + female;

  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Users",
        data: [male, female],
        backgroundColor: ["#3498db", "#e84393"],
      },
    ],
  };

  return (
    <div style={container}>
      {/* ปุ่มขวาบน */}
      <div style={topBar}>
        <button style={backBtn} onClick={() => router.push("/account")}>
          ⬅ กลับหน้าผู้ใช้
        </button>
      </div>

      <h1 style={title}>📊 Dashboard</h1>

      {/* 🔥 เพิ่มระยะห่าง */}
      <div style={card}>
        <h3 style={{ textAlign: "center" }}>จำนวนผู้ใช้ในระบบ</h3>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : users.length === 0 ? (
          <p style={{ textAlign: "center" }}>❌ ไม่มีข้อมูล</p>
        ) : (
          <div style={chartBox}>
            <Pie data={data} />
          </div>
        )}
      </div>

        <div style={summarySimple}>
           <p>Male: {male}</p>
           <p>Female: {female}</p>
        </div>
    </div>
  );
}

/* ================= STYLE ================= */

const container = {
  padding: "40px",
  minHeight: "100vh",
  background: "#f5f6fa",
  position: "relative",
};

const topBar = {
  position: "absolute",
  top: "20px",
  right: "40px",
};

/* 🔥 เพิ่ม marginBottom */
const title = {
  textAlign: "center",
  marginBottom: "30px", // 👈 ห่างจากการ์ด
};

const card = {
  width: "600px",
  margin: "0 auto",
  background: "#fff",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const chartBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "400px",
};

const summarySimple = {
  marginTop: "20px",
  textAlign: "center",
  fontSize: "16px",
};

const backBtn = {
  padding: "10px 20px",
  background: "#3498db",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};