"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";

/* ================= HEADER ================= */
function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <img src="/logo.PNG" width="50" className="me-3" />
      <span className="navbar-brand fw-bold">HAT YAI TRAVEL & FOOD</span>

      <div className="ms-auto d-flex gap-3">
        <a href="/dashboard" className="nav-link">หน้าแรก</a>
        <a href="/travel" className="nav-link">สถานที่ท่องเที่ยว</a>
        <a href="/food" className="nav-link">ร้านอาหาร</a>
        <a href="/comment" className="nav-link">บทความ</a>
        <a href="/graph" className="nav-link"
          style={{ color: "#ff6600", borderBottom: "3px solid #ff6600"}}
          >ข้อมูลผู้ใช้</a>
        <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
          Logout
        </button>
      </div>
    </nav>
  );
}

/* ================= PAGE ================= */
export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    image_url: "",
  });

  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("ลบ user ?")) return;

    await fetch(`http://localhost:3001/user/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setForm((prev) => ({
      ...prev,
      image_url: data.imageUrl,
    }));

    setUploading(false);
  };

  const handleSave = async () => {
    if (isEdit) {
      await fetch(`http://localhost:3001/user/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          password: "1234",
        }),
      });
    }

    setIsOpen(false);
    fetchUsers();
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />

      {/* BACKGROUND */}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/lolo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "20px",
        }}
      >
        <div className="container">
          <div className="card shadow p-3 bg-white bg-opacity-75">

            {/* TOP BAR */}
            <div className="d-flex justify-content-between mb-3">
              <input
                className="form-control w-25"
                placeholder="Search here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                className="btn btn-success"
                onClick={() => {
                  setIsEdit(false);
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    gender: "",
                    image_url: "",
                  });
                  setIsOpen(true);
                }}
              >
                + Add New
              </button>
            </div>

            {/* TABLE */}
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>
                      {u.image_url ? (
                        <img
                          src={u.image_url}
                          width="60"
                          height="60"
                          className="rounded-circle"
                        />
                      ) : (
                        <div className="bg-secondary rounded-circle" style={{ width: 60, height: 60 }} />
                      )}
                    </td>

                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.gender}</td>

                    <td>
                      <button
                        className="btn btn-outline-success btn-sm me-2"
                        onClick={() => {
                          setIsEdit(true);
                          setSelected(u);
                          setForm(u);
                          setIsOpen(true);
                        }}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(u.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">

              <h5>{isEdit ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้"}</h5>

              <div className="text-center mb-2">
                {form.image_url ? (
                  <img src={form.image_url} width="100" className="rounded-circle mb-2" />
                ) : (
                  <div className="bg-secondary rounded-circle mx-auto mb-2" style={{ width: 100, height: 100 }} />
                )}

                <input type="file" className="form-control" onChange={handleUpload} />
                {uploading && <p>⏳ Uploading...</p>}
              </div>

              <input
                className="form-control mb-2"
                placeholder="ชื่อ"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="form-control mb-2"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                className="form-control mb-2"
                placeholder="เบอร์โทร"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <select
                className="form-select mb-3"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                <option value="">เลือกเพศ</option>
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
              </select>

              <div className="d-flex gap-2">
                <button className="btn btn-success w-50" onClick={handleSave}>
                  💾 Save
                </button>

                <button
                  className="btn btn-secondary w-50"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}