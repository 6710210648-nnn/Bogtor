"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TravelPage() {
  const router = useRouter();
  
  // 1. ข้อมูลจากไฟล์ CSV ของคุณ (Copy มาวางที่นี่)
  const allTravel = [
    {
      titleTH: "สวนสาธารณะเทศบาลนครหาดใหญ่",
      titleEN: "Hat Yai Municipal Park, Jm",
      img: "/HatyaiPark.jpg",
      description: "สวนสวย บรรยากาศดี",
      location: "หาดใหญ่"
    },
    {
      titleTH: "ตลาดกิมหยง",
      titleEN: "Gim Yong Market",
      img: "/gimyong.jpg",
      description: "ตลาดสดชื่อดังของหาดใหญ่",
      location: "หาดใหญ่"
    },
    {
      titleTH: "เจดีย์สเตนเลส",
      titleEN: "Stainless Steel Pagoda, Wat Hat Yai Nai",
      img: "/jeady.jpg",
      description: "เจดีย์สวยงามโดดเด่น",
      location: "หาดใหญ่"
    },
    {
      titleTH: "มัสยิดกลางจังหวัดสงขลา",
      titleEN: "Central Mosque of Songkhla at Hat Yai Sorsqua",
      img: "/mussayid.jpg",
      description: "มัสยิดที่สำคัญของสงขลา",
      location: "สงขลา"
    }
  ];

  // 2. State สำหรับการค้นหา
  const [searchTerm, setSearchTerm] = useState("");

  // 3. ฟังก์ชันกรองข้อมูลตามที่พิมพ์
  const filteredTravel = allTravel.filter((item) =>
    item.titleTH.includes(searchTerm) || 
    item.titleEN.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      {/* Header ส่วนบน */}
      <header style={headerStyle}>
        <div onClick={() => router.push('/dashboard')} style={{cursor: 'pointer'}}>
          <img src="/ไก่ๆ.PNG" alt="Logo" style={{height: '50px'}} />
        </div>
        <nav style={navStyle}>
          <a href="#" style={navLinkStyle}>ค้นหา</a>
          <a href="#" style={navLinkStyle}>ปลายทาง</a>
          <button onClick={() => router.push('/dashboard')} style={backBtnStyle}>กลับหน้าหลัก</button>
        </nav>
      </header>

      {/* ส่วน Search Bar */}
      <section style={searchSectionStyle}>
        <div className="container">
          <div className="row g-2 justify-content-center">
            <div className="col-md-6">
              <input 
                type="text" 
                placeholder="ค้นหาสถานที่ท่องเที่ยว..." 
                style={inputSearchStyle}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button style={btnPinkStyle}>ค้นหา</button>
            </div>
          </div>
        </div>
      </section>

      {/* รายการสถานที่ท่องเที่ยว */}
      <main className="container my-5">
        <div style={filterLabelWrapperStyle}>
          <p style={labelCountStyle}>พบข้อมูลทั้งหมด {filteredTravel.length} รายการ</p>
        </div>

        <div className="row g-4">
          {filteredTravel.map((item, index) => (
            <div key={index} className="col-md-4">
              <div style={cardStyle} onClick={() => alert(`คุณเลือก: ${item.titleTH}`)}>
                <div style={{overflow: 'hidden'}}>
                  <img src={item.img} alt={item.titleTH} style={cardImgStyle} className="card-hover-img" />
                </div>
                <div style={cardBodyStyle}>
                  <h3 style={cardTitleStyle}>{item.titleTH}</h3>
                  <p style={cardLocationStyle}>📍 {item.location}</p>
                  <p style={{fontSize: '13px', color: '#888', marginTop: '10px'}}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTravel.length === 0 && (
          <div className="text-center my-5">
            <h4 className="text-muted">ไม่พบข้อมูลที่คุณค้นหา</h4>
          </div>
        )}
      </main>
    </div>
  );
}