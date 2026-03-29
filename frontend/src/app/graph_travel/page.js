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

// ลงทะเบียน Component ของ Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TravelDashboard() {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ฟังก์ชันดึงข้อมูลสถานที่ท่องเที่ยว
  const fetchTravelData = async () => {
    try {
      const res = await fetch("http://localhost:3001/travel");
      const data = await res.json();
      setTravelData(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTravelData();
  }, []);

        const categories = [...new Set(
  travelData.map((item) => item.category || "ไม่ระบุ")
       )];

const categoryCounts = categories.map((cat) => {
  return travelData.filter(
    (item) => (item.category || "ไม่ระบุ") === cat
  ).length;
         });

  // การตั้งค่าข้อมูลสำหรับกราฟ Pie
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "จำนวนสถานที่",
        data: categoryCounts,
        backgroundColor: [
          "#afedb1", // สีส้ม (ตลาด/ช้อปปิ้ง)
          "#7cdcff", // สีเขียว (ธรรมชาติ)
          "#fffd92", // สีฟ้า (ศาสนา)
          "#ffa1ca", // สีม่วง
          "#abeab0", // สีแดง
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 14 },
          padding: 20,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={container}>
      {/* ปุ่มนำทาง */}
      <div style={topBar}>
        <button style={backBtn} onClick={() => router.push("/travel")}>
          ไปหน้าจัดการสถานที่
        </button>
      </div>

      <h1 style={title}>📊📐สรุปหมวดหมู่สถานที่ท่องเที่ยว</h1>

      <div style={card}>
        <h3 style={cardSubTitle}>สัดส่วนสถานที่เที่ยวตามหมวดหมู่ (Total: {travelData.length})</h3>
        
        {loading ? (
          <p style={{ textAlign: "center" }}>กำลังโหลดข้อมูล...</p>
        ) : travelData.length === 0 ? (
          <p style={{ textAlign: "center" }}>❌ ไม่พบข้อมูลในระบบ</p>
        ) : (
          <div style={chartBox}>
            <Pie data={chartData} options={chartOptions} />
          </div>
        )}

        {/* ตารางสรุปตัวเลขแบบง่าย */}
        <div style={summaryGrid}>
          {categories.map((cat, index) => (
            <div key={cat} style={summaryItem}>
              <span style={{ fontWeight: "bold" }}>{cat}:</span> {categoryCounts[index]} แห่ง
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= CSS STYLES ================= */

const container = {
  padding: "40px",
  minHeight: "100vh",
  background: "#f8f9fa",
};

const topBar = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "20px",
};

const title = {
  textAlign: "center",
  marginBottom: "30px",
  color: "#2d3436",
  fontWeight: "bold",
};

const card = {
  maxWidth: "700px",
  margin: "0 auto",
  background: "#fff",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
};

const cardSubTitle = {
  textAlign: "center",
  marginBottom: "30px",
  color: "#636e72",
};

const chartBox = {
  height: "350px",
  marginBottom: "30px",
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "15px",
  borderTop: "1px solid #eee",
  paddingTop: "20px",
};

const summaryItem = {
  textAlign: "center",
  fontSize: "16px",
  padding: "10px",
  background: "#f1f2f6",
  borderRadius: "10px",
};

const backBtn = {
  padding: "10px 20px",
  background: "#2d3436",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s",
};