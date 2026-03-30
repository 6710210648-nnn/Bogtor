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

export default function StarPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((r) => r.json())
      .then((data) => { setArticles(data); setLoading(false); })
      .catch((err) => { console.error("ERROR:", err); setLoading(false); });
  }, []);

  const allComments = articles.flatMap((a) => a.comments || []);

  const star5 = allComments.filter((c) => c.rating === 5).length;
  const star4 = allComments.filter((c) => c.rating === 4).length;
  const star3 = allComments.filter((c) => c.rating === 3).length;
  const star2 = allComments.filter((c) => c.rating === 2).length;
  const star1 = allComments.filter((c) => c.rating === 1).length;

  const data = {
    labels: ["5 ★", "4 ★", "3 ★", "2 ★", "1 ★"],
    datasets: [
      {
        label: "รีวิว",
        data: [star5, star4, star3, star2, star1],
        backgroundColor: ["#29c4e3", "#2ecc71", "#f1c40f", "#e67e22", "#e74c3c"],
      },
    ],
  };

  return (
    <div style={container}>
      {/* ปุ่มขวาบน */}
      <div style={topBar}>
        <button style={backBtn} onClick={() => router.push("/comment")}>
          ⬅ กลับหน้าบทความ
        </button>
      </div>

      <h1 style={title}>📊 Dashboard</h1>

      <div style={card}>
        <h3 style={{ textAlign: "center" }}>คะแนนรีวิวบทความ</h3>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : allComments.length === 0 ? (
          <p style={{ textAlign: "center" }}>❌ ไม่มีข้อมูล</p>
        ) : (
          <div style={chartBox}>
            <Pie data={data} />
          </div>
        )}
      </div>

      <div style={summarySimple}>
        <p>5 ★: {star5}</p>
        <p>4 ★: {star4}</p>
        <p>3 ★: {star3}</p>
        <p>2 ★: {star2}</p>
        <p>1 ★: {star1}</p>
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

const title = {
  textAlign: "center",
  marginBottom: "30px",
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