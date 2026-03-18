"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (!data) {
      router.push("/login"); // ❌ ยังไม่ login
    } else {
      setUser(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div style={{ padding: "40px" }}>
      <h1>🎉 Dashboard</h1>
      <p>ยินดีต้อนรับ: {user.email}</p>
      <p>เพศ: {user.gender}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}