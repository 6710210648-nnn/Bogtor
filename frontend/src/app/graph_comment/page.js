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

export default function StarPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((r) => r.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ERROR:", err);
        setLoading(false);
      });
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
        backgroundColor: [
          "#29c4e3",
          "#2ecc71",
          "#f1c40f",
          "#e67e22",
          "#e74c3c",
        ],
      },
    ],
  };

  return (
    <div className="bg-white min-vh-100">
      <div className="container py-5">

        {/* 🔙 ปุ่ม */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-primary"
            onClick={() => router.push("/comment")}
          >
            ⬅ กลับหน้าบทความ
          </button>
        </div>

        {/* Title */}
        <h1 className="text-center fw-bold mb-4">
          📊 Dashboard
        </h1>

        {/* Card */}
        <div className="card shadow mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body">

            <h5 className="text-center mb-4">
              คะแนนรีวิวบทความ
            </h5>

            {loading ? (
              <p className="text-center">Loading...</p>
            ) : allComments.length === 0 ? (
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
            <div className="row text-center mt-4">
              <div className="col-6 col-md-4">5 ★: {star5}</div>
              <div className="col-6 col-md-4">4 ★: {star4}</div>
              <div className="col-6 col-md-4">3 ★: {star3}</div>
              <div className="col-6 col-md-4">2 ★: {star2}</div>
              <div className="col-6 col-md-4">1 ★: {star1}</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}