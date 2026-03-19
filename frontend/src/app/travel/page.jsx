"use client";

import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TravelPage() {
  const router = useRouter();

  // ข้อมูลที่ดึงมาแสดง (ในอนาคตอาจจะรับผ่าน Query Params หรือ Context)
  const travelData = {
    titleTH: "สวนสาธารณะเทศบาลนครหาดใหญ่",
    titleEN: "Hat Yai Municipal Park",
    img: "/HatyaiPark.jpg", // ตรวจสอบว่ารูปนี้อยู่ในโฟลเดอร์ public นะครับ
    description: "แลนด์มาร์คสำคัญของหาดใหญ่ ที่มีทั้งกระเช้าลอยฟ้า พระพุทธมงคลมหาราช และจุดชมวิวเมืองหาดใหญ่แบบ 360 องศา",
    location: "ถนนกาญจนวนิช ตำบลคอหงส์ อำเภอหาดใหญ่ จังหวัดสงขลา",
    openingHours: "05:00 - 20:00 น.",
  };

  return (
    <div className="container py-5">
      {/* ปุ่มย้อนกลับ */}
      <button 
        className="btn btn-outline-secondary mb-4"
        onClick={() => router.back()}
      >
        ← ย้อนกลับ
      </button>

      <div className="row">
        {/* รูปภาพสถานที่ */}
        <div className="col-md-6 mb-4">
          <img 
            src={travelData.img} 
            alt={travelData.titleTH} 
            className="img-fluid rounded-4 shadow"
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
        </div>

        {/* รายละเอียด */}
        <div className="col-md-6">
          <h1 className="fw-bold text-dark">{travelData.titleTH}</h1>
          <h4 className="text-muted mb-4">{travelData.titleEN}</h4>
          
          <div className="card border-0 bg-light p-4 rounded-4">
            <h5 className="fw-bold">รายละเอียด</h5>
            <p className="text-secondary">{travelData.description}</p>
            <hr />
            <p><strong>📍 ที่ตั้ง:</strong> {travelData.location}</p>
            <p><strong>⏰ เวลาเปิด-ปิด:</strong> {travelData.openingHours}</p>
          </div>

          <button className="btn btn-primary btn-lg w-100 mt-4 rounded-pill shadow-sm">
            ดูแผนที่ (Google Maps)
          </button>
        </div>
      </div>
    </div>
  );
}