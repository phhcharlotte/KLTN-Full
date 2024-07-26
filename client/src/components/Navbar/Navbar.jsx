import React from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  // const token = localStorage.getItem("token")

  if (location.pathname === "/login") {
    return null;
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("code");
    localStorage.removeItem("fullname");
    navigate("/login");
  };
  return (
    <>
      <div className="navbar">
        <nav>
          <div style={{ display: "flex", gap: "12px" }}>
            <div className="logo">
              <img src={require("../images/Dai-hoc-thang-long.png")} alt="" />
            </div>
            <ul className="nav-menu">
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "none")}
                  style={{ textDecoration: "none" }}
                  to="/">
                  <i className="bx bx-home"></i>
                  Trang chủ
                </NavLink>
              </li>
              {role !== "admin" && (
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "none")}
                    style={{ textDecoration: "none" }}
                    to="/notifications">
                    <i className="bx bx-bell-minus"></i>
                    Thông Báo
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "none")}
                  style={{ textDecoration: "none" }}
                  to="/theses">
                  <i className="bx bx-book-open"></i>
                  Khóa Luận
                </NavLink>
              </li>
              {role === "admin" && (
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "none")}
                    style={{ textDecoration: "none" }}
                    to="/admin">
                    <i className="bx bx-child"></i>
                    Admin
                  </NavLink>
                </li>
              )}
              {role === "teacher" && (
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "none")}
                    style={{ textDecoration: "none" }}
                    to="/teacher">
                    <i className="bx bxs-graduation"></i>
                    Giáo Viên
                  </NavLink>
                </li>
              )}
              {role === "teacher" && (
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "none")}
                    style={{ textDecoration: "none" }}
                    to="/council">
                    <i className="bx bx-group"></i>
                    Hội Đồng BV
                  </NavLink>
                </li>
              )}
              {role === "student" && (
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "none")}
                    style={{ textDecoration: "none" }}
                    to="/submit">
                    <i className="bx bx-upload"></i>
                    Nộp Tài Liệu
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="nav-logout">
            <img src={require("../images/no-avt.png")} alt="" />
            <div className="menu-logout">
              {role !== "admin" && (
                <p className="your-name">
                  {localStorage.getItem("fullname")} -{" "}
                  {localStorage.getItem("code")}
                </p>
              )}
              <p>
                <Link to="/login">
                  <button onClick={handleLogout}>Logout</button>
                </Link>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
