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

export default function FoodChart() {
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchFoodData = async () => {
    try {
      const res = await fetch("http://localhost:3001/food");
      const data = await res.json();
      setFoodData(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  const foodTypes = [
    ...new Set(foodData.map((item) => item.type || "ไม่ระบุ")),
  ];

  const foodCounts = foodTypes.map((type) =>
    foodData.filter(
      (item) => (item.type || "ไม่ระบุ") === type
    ).length
  );

  const chartData = {
    labels: foodTypes,
    datasets: [
      {
        label: "จำนวนร้านอาหาร",
        data: foodCounts,
        backgroundColor: [
          "#afedb1",
          "#7cdcff",
          "#fffd92",
          "#ffa1ca",
          "#ffb347",
          "#c9a0dc",
          "#87ceeb",
          "#f08080",
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
            onClick={() => router.push("/food")}
          >
            ไปหน้าจัดการร้านอาหาร
          </button>
        </div>

        {/* Title */}
        <h1 className="text-center fw-bold mb-4">
          📊 สรุปหมวดหมู่ร้านอาหาร
        </h1>

        {/* Card */}
        <div className="card shadow mx-auto" style={{ maxWidth: "700px" }}>
          <div className="card-body p-4">

            <h5 className="text-center text-muted mb-4">
              สัดส่วนร้านอาหารตามประเภท (Total: {foodData.length})
            </h5>

            {loading ? (
              <p className="text-center">กำลังโหลดข้อมูล...</p>
            ) : foodData.length === 0 ? (
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
              {foodTypes.map((type, index) => (
                <div key={type} className="col-6 col-md-4">
                  <div className="bg-light rounded text-center p-2">
                    <strong>{type}</strong>
                    <div>{foodCounts[index]} ร้าน</div>
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