"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const COLORS = ["#FF6B6B","#4ECDC4","#FFE66D","#A29BFE","#FD79A8","#6C5CE7","#00CEC9","#FDCB6E","#E17055","#74B9FF"];

const S = {
  page:      { padding: "40px", minHeight: "100vh", background: "#f5f6fa", fontFamily: "sans-serif", position: "relative" },
  topBar:    { position: "absolute", top: "20px", right: "40px" },
  backBtn:   { padding: "10px 20px", background: "#3498db", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  title:     { textAlign: "center", fontSize: "32px", fontWeight: "700", marginBottom: "8px", color: "#2d3436" },
  subtitle:  { textAlign: "center", color: "#636e72", marginBottom: "32px" },
  cardRow:   { display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "32px" },
  card:      (c) => ({ background: "#fff", borderRadius: "12px", padding: "20px 28px", textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", borderTop: `4px solid ${c}`, minWidth: "110px" }),
  bigNum:    { fontSize: "36px", fontWeight: "800", color: "#2d3436" },
  cardLabel: { fontSize: "13px", color: "#636e72", marginTop: "4px" },
  chartRow:  { display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center", marginBottom: "32px" },
  chartCard: { background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", flex: "1", minWidth: "300px", maxWidth: "460px" },
  chartTitle:{ fontSize: "17px", fontWeight: "700", marginBottom: "20px", color: "#2d3436" },
  tableCard: { background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", maxWidth: "650px", margin: "0 auto" },
  th:        { padding: "12px 16px", fontSize: "13px", fontWeight: "700", color: "#636e72", textAlign: "left" },
  td:        { padding: "12px 16px", fontSize: "14px", color: "#2d3436", verticalAlign: "middle" },
};

export default function TravelDashboardPage() {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/travel")
      .then((res) => res.json())
      .then((data) => { setTravelData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const counts = travelData.reduce((acc, place) => {
    const cat = place.category || "ไม่ระบุ";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(counts);
  const values = Object.values(counts);
  const total = travelData.length;

  const pieData = {
    labels,
    datasets: [{ data: values, backgroundColor: COLORS.slice(0, labels.length), borderWidth: 2, borderColor: "#fff" }],
  };

  const barData = {
    labels,
    datasets: [{
      label: "จำนวนสถานที่",
      data: values,
      backgroundColor: COLORS.slice(0, labels.length),
      borderRadius: 8,
      borderSkipped: false,
    }],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: "#f0f0f0" } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div style={S.page}>
      <div style={S.topBar}>
        <button style={S.backBtn} onClick={() => router.push("/travel")}>
          ⬅ กลับสถานที่ท่องเที่ยว
        </button>
      </div>

      <h1 style={S.title}>📊 Travel Dashboard</h1>
      <p style={S.subtitle}>ภาพรวมสถานที่ท่องเที่ยวแบ่งตามประเภท</p>

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "60px" }}>กำลังโหลด...</p>
      ) : (
        <>
          <div style={S.cardRow}>
            <div style={S.card("#555")}>
              <div style={S.bigNum}>{total}</div>
              <div style={S.cardLabel}>ทั้งหมด</div>
            </div>
            {labels.map((cat, i) => (
              <div key={cat} style={S.card(COLORS[i % COLORS.length])}>
                <div style={S.bigNum}>{counts[cat]}</div>
                <div style={S.cardLabel}>{cat}</div>
              </div>
            ))}
          </div>

          <div style={S.chartRow}>
            <div style={S.chartCard}>
              <h3 style={S.chartTitle}>สัดส่วนตามประเภท</h3>
              <div style={{ maxWidth: "320px", margin: "0 auto" }}>
                <Pie data={pieData} />
              </div>
            </div>
            <div style={S.chartCard}>
              <h3 style={S.chartTitle}>จำนวนสถานที่แต่ละประเภท</h3>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          <div style={S.tableCard}>
            <h3 style={S.chartTitle}>สรุปรายละเอียด</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                  <th style={S.th}>ประเภท</th>
                  <th style={{ ...S.th, textAlign: "center" }}>จำนวน</th>
                  <th style={{ ...S.th, textAlign: "center" }}>สัดส่วน</th>
                </tr>
              </thead>
              <tbody>
                {labels.map((cat, i) => (
                  <tr key={cat} style={{ background: i % 2 === 0 ? "#fff" : "#f9f9f9" }}>
                    <td style={S.td}>
                      <span style={{ display:"inline-block", width:"10px", height:"10px", borderRadius:"50%", background: COLORS[i % COLORS.length], marginRight:"8px" }} />
                      {cat}
                    </td>
                    <td style={{ ...S.td, textAlign: "center" }}>{counts[cat]}</td>
                    <td style={{ ...S.td, textAlign: "center" }}>{((counts[cat] / total) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}