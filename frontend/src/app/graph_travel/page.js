"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TravelDashboard() {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const categories = [
    ...new Set(travelData.map((item) => item.category || "ไม่ระบุ")),
  ];

  const categoryCounts = categories.map((cat) =>
    travelData.filter(
      (item) => (item.category || "ไม่ระบุ") === cat
    ).length
  );

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "จำนวนสถานที่",
        data: categoryCounts,
        backgroundColor: [
          "#afedb1",
          "#7cdcff",
          "#fffd92",
          "#ffa1ca",
          "#abeab0",
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
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white min-vh-100">
      <div className="container py-5">

        {/* 🔙 ปุ่ม */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-dark"
            onClick={() => router.push("/travel")}
          >
            ไปหน้าจัดการสถานที่
          </button>
        </div>

        {/* Title */}
        <h1 className="text-center fw-bold mb-4">
          📊📐สรุปหมวดหมู่สถานที่ท่องเที่ยว
        </h1>

        {/* Card */}
        <div className="card shadow mx-auto" style={{ maxWidth: "700px" }}>
          <div className="card-body p-4">

            <h5 className="text-center text-muted mb-4">
              สัดส่วนสถานที่เที่ยวตามหมวดหมู่ (Total: {travelData.length})
            </h5>

            {loading ? (
              <p className="text-center">กำลังโหลดข้อมูล...</p>
            ) : travelData.length === 0 ? (
              <p className="text-center text-danger">❌ ไม่พบข้อมูลในระบบ</p>
            ) : (
              <div
                className="d-flex justify-content-center mb-4"
                style={{ height: "350px" }}
              >
                <Pie data={chartData} options={chartOptions} />
              </div>
            )}

            {/* Summary */}
            <div className="row g-3 border-top pt-3">
              {categories.map((cat, index) => (
                <div key={cat} className="col-6 col-md-4">
                  <div className="bg-light rounded text-center p-2">
                    <strong>{cat}</strong>
                    <div>{categoryCounts[index]} แห่ง</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}