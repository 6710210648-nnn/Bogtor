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
    <div className="bg-white min-vh-100"> {/* ✅ ทำพื้นหลังขาวทั้งหน้า */}
      <div className="container py-5">

        {/* 🔙 ปุ่มกลับ */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-primary"
            onClick={() => router.push("/account")}
          >
            ⬅ กลับหน้าผู้ใช้
          </button>
        </div>

        {/* Title */}
        <h1 className="text-center mb-4">📊 Dashboard</h1>

        {/* Card */}
        <div className="card shadow mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body">

            <h5 className="text-center mb-4">จำนวนผู้ใช้ในระบบ</h5>

            {loading ? (
              <p className="text-center">Loading...</p>
            ) : users.length === 0 ? (
              <p className="text-center text-danger">❌ ไม่มีข้อมูล</p>
            ) : (
              <div
                className="d-flex justify-content-center"
                style={{ height: "400px" }}
              >
                <Pie data={data} />
              </div>
            )}

            {/* Summary */}
            <div className="text-center mt-4">
              <p className="mb-1">👨 Male: {male}</p>
              <p className="mb-0">👩 Female: {female}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}