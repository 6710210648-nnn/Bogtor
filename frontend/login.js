"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password || !gender) {
      alert("กรอกข้อมูลไม่ครบ");
      return;
    }

    alert(`Login: ${email} | ${gender}`);
  };

  return (
    <div className="text-center d-flex align-items-center justify-content-center vh-100">
      <main style={{ width: "300px" }}>
        <form onSubmit={handleLogin}>
          <img
            className="mb-4"
            src="/ไก่ไก่ไก่.jpg"
            alt=""
            height="200"
          />

          <h1 className="h3 mb-3 fw-normal">
            <b>Bogtor</b> - Login
          </h1>

          <div className="form-floating mb-2">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email address</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          {/* 🔥 gender แบบสวย */}
          <div className="mt-3 text-start">
            <label className="mb-2 fw-bold">Gender</label>

            <div className="d-flex gap-2">
              <button
                type="button"
                className={`btn w-100 ${
                  gender === "male"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setGender("male")}
              >
                👨 Male
              </button>

              <button
                type="button"
                className={`btn w-100 ${
                  gender === "female"
                    ? "btn-danger"
                    : "btn-outline-danger"
                }`}
                onClick={() => setGender("female")}
              >
                👩 Female
              </button>
            </div>
          </div>

          <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}