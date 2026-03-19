"use client";

import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

/* ================= HEADER ================= */
function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        padding: "10px 40px",
        boxShadow: "0 1px 6px rgb(0 0 0 / 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <img
        src="/ไก่ๆ.PNG"
        alt="BOGTOR Logo"
        style={{ width: "60px", height: "60px", marginRight: "20px" }}
      />
      <h1
        style={{
          fontWeight: "700",
          fontSize: "28px",
          color: "#333",
          margin: 0,
        }}
      >
        HAT YAI TRAVEL & FOOD
      </h1>

      <nav
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "24px",
          fontWeight: "600",
          fontSize: "16px",
          color: "#555",
        }}
      >
        <a href="/dashboard" style={navLinkStyle}>หน้าแรก</a>
        <a href="/travel" style={navLinkStyle}>สถานที่ท่องเที่ยว</a>
        <a href="/food" style={navLinkStyle}>ร้านอาหาร</a>
        <a href="#" style={navLinkStyle}>บทความ</a>
        <a href="/account" style={navLinkStyle}>ข้อมูลส่วนตัว</a>
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Logout
        </button>
      </nav>
    </header>
  );


}

/* ================= PAGE ================= */
export default function TravelPage() {
  const router = useRouter();
  

  const travelDataList = [
    {
      id: 1,
       titleTH: "ตลาดกิมหยง",
      titleEN: "Kim Yong Market",
      img: "/gimyong.jpg",
      description: "ตลาดชื่อดังศูนย์รวมของฝากจากต่างประเทศ ผลไม้สด ผลไม้อบแห้ง และถั่วนานาชนิดที่เป็นเอกลักษณ์ของเมืองหาดใหญ่",
      location: "ถนนศุภสารรังสรรค์ ตำบลหาดใหญ่ อำเภอหาดใหญ่ จังหวัดสงขลา",
      mapUrl:"https://maps.app.goo.gl/Fv1923bzyFJ2kZcS6",
      openingHours: "06:00 - 18:00 น.",
    },
    {
      id: 2,
      titleTH: "สวนสาธารณะเทศบาลนครหาดใหญ่",
      titleEN: "Hat Yai Municipal Park",
      img: "/HatyaiPark.jpg",
      description: "แลนด์มาร์คสำคัญของหาดใหญ่ ที่มีทั้งกระเช้าลอยฟ้า พระพุทธมงคลมหาราช และจุดชมวิวเมืองหาดใหญ่แบบ 360 องศา",
      location: "ถนนกาญจนวนิช ตำบลคอหงส์ อำเภอหาดใหญ่ จังหวัดสงขลา",
      mapUrl:"https://maps.app.goo.gl/dwrWwRN7XzhyziLq6",
      openingHours: "06:00 - 18:00 น.",
      openingHours: "05:00 - 20:00 น.",
    },
    {
      id: 3,
       titleTH: "ตลาดน้ำคลองแห",
      titleEN: "Khlong Hae Floating Market",
      img: "/คลองเเห.jpg",
      description: "ตลาดน้ำแห่งแรกของภาคใต้ สัมผัสวิถีชีวิตชาวบ้าน ชิมอาหารท้องถิ่นที่ขายบนเรือพาย และใช้ภาชนะจากธรรมชาติ",
      location: "ตำบลคลองแห อำเภอหาดใหญ่ จังหวัดสงขลา",
      mapUrl:"https://maps.app.goo.gl/grYc3dN9ZqvfYWQe9",
      openingHours: "ศุกร์ - อาทิตย์ 13:00 - 21:00 น.",
      
    },
    {
      id: 4,
      titleTH: "วัดหาดใหญ่ใน",
      titleEN: "Mahattamangkalaram ",
      img: "/วัดหาดใหญ่ใน.jpg",
      description: "ที่ประดิษฐานพระพุทธไสยาสน์ขนาดใหญ่ที่สุดในภาคใต้",
      location: "ถ.เพชรเกษม อำเภอหาดใหญ่ จังหวัดสงขลา",
      mapUrl:"https://maps.app.goo.gl/2gsRKkFjbnNGGWQA8",
      openingHours: "	7:00 - 18:00 น.",
    },
    {
      id: 5,
      titleTH: "น้ำตกโตนงาช้าง",
      titleEN: "Ton Nga Chang Waterfall",
      img: "/โตนงาช้าง.jpg",
      description: "น้ำตก 7 ชั้นที่มีชื่อเสียง โดยเฉพาะชั้นที่ 3 (งาช้าง)",
      location: "เขตรักษาพันธุ์สัตว์ป่า",
      mapUrl:"https://maps.app.goo.gl/zVVA77TCLeLt7f1U6",
      openingHours: "9:00 - 16:00 น.",
    },
    {
      id: 6,
      titleTH: "เซ็นทรัล หาดใหญ่",
      titleEN: "Central Hatyai ",
      img: "/เซนทรัล.jpg",
      description: "ห้างสรรพสินค้าที่ใหญ่ที่สุดในหาดใหญ่ ครบครันทุกบริการ",
      location: "ถ.กาญจนวณิช อำเภอหาดใหญ่ จังหวัดสงขลา",
      mapUrl:"https://maps.app.goo.gl/BkpSpBKZ6ECBuKReA",
      openingHours: "	10:00 - 21:00น.",
    }
  ];

  return (
    <>
      <Header />

      <div className="container py-5">
        {/* ปุ่มย้อนกลับ */}
        <button
          className="btn btn-outline-secondary mb-5"
          onClick={() => router.back()}
        >
          ← ย้อนกลับ
        </button>

        <h2 className="fw-bold mb-4 text-center">สถานที่แนะนำในหาดใหญ่ - สงขลา</h2>

        {/* เริ่มการวนลูปแสดงข้อมูล */}
        {travelDataList.map((place) => (
          <div className="row mb-5 pb-5 border-bottom" key={place.id}>
            {/* รูปภาพ */}
            <div className="col-md-6 mb-4">
              <img
                src={place.img}
                alt={place.titleTH}
                className="img-fluid rounded-4 shadow"
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
              />
            </div>

            {/* รายละเอียด */}
            <div className="col-md-6">
              <h1 className="fw-bold">{place.titleTH}</h1>
              <h4 className="text-muted mb-4">{place.titleEN}</h4>

              <div className="card border-0 bg-light p-4 rounded-4">
                <h5 className="fw-bold">รายละเอียด</h5>
                <p className="text-secondary">{place.description}</p>
                <hr />
                <p><strong>📍 ที่ตั้ง:</strong> {place.location}</p>
                <p><strong>⏰ เวลาเปิด-ปิด:</strong> {place.openingHours}</p>
              </div>

               <button 
                 className="btn btn-primary btn-lg w-100 mt-4 rounded-pill shadow-sm"
                 onClick={() => window.open(place.mapUrl, '_blank')}
     >
                  ดูแผนที่ (Google Maps)
               </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ================= STYLE ================= */
const navLinkStyle = {
  textDecoration: "none",
  color: "#555",
  paddingBottom: "4px",
  borderBottom: "2px solid transparent",
  cursor: "pointer",
};

const logoutBtnStyle = {
  padding: "6px 14px",
  borderRadius: "6px",
  border: "1px solid #ff6f61",
  backgroundColor: "white",
  color: "#ff6f61",
  fontWeight: "600",
  cursor: "pointer",
  marginLeft: "24px",
};