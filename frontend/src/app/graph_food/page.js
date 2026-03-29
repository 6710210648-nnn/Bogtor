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

    const foodTypes = [...new Set(foodData.map((item) => item.type || "ไม่ระบุ"))];
    const foodCounts = foodTypes.map(
        (type) => foodData.filter((item) => (item.type || "ไม่ระบุ") === type).length
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
            <div style={topBar}>
                <button style={backBtn} onClick={() => router.push("/food")}>
                    ไปหน้าจัดการร้านอาหาร
                </button>
            </div>

            <h1 style={title}>📊 สรุปหมวดหมู่ร้านอาหาร</h1>

            <div style={card}>
                <h3 style={cardSubTitle}>
                    สัดส่วนร้านอาหารตามประเภท (Total: {foodData.length})
                </h3>

                {loading ? (
                    <p style={{ textAlign: "center" }}>กำลังโหลดข้อมูล...</p>
                ) : foodData.length === 0 ? (
                    <p style={{ textAlign: "center" }}>❌ ไม่พบข้อมูลในระบบ</p>
                ) : (
                    <div style={chartBox}>
                        <Pie data={chartData} options={chartOptions} />
                    </div>
                )}

                <div style={summaryGrid}>
                    {foodTypes.map((type, index) => (
                        <div key={type} style={summaryItem}>
                            <span style={{ fontWeight: "bold" }}>{type}:</span> {foodCounts[index]} ร้าน
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
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: "12px",
    borderTop: "1px solid #eee",
    paddingTop: "20px",
};

const summaryItem = {
    textAlign: "center",
    fontSize: "14px",
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
};