import "./User.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  CloseOutlined,
  UserOutlined,
  HistoryOutlined,
  WalletOutlined,
  CalendarOutlined,
  LogoutOutlined,
  MenuOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function SideBar() {
  const { userId, setUserId, accessToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState([]);

  
  useEffect(() => {
    const fetchUser = async () => {
      const decoded = jwtDecode(accessToken).id;
      console.log("decode:", decoded);
      setUserId(decoded);
      console.log("userId:", userId);
      try {
        const response = await axios.get(
          `http://localhost:8081/v1/api/admin/users/${decoded}`
        );
        setUser(response.data);
        console.log("user:", response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const active =
    "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-black";
  const hover = "hover:bg-[#bbbbbb] text-black";
  const inActive = "bg-blue-500 text-white";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${active} ${hover}`;
  return (
    <div className="">
      <div
        className={`lg:left-[-300px] left-[16px] absolute text-xl top-[7px] `}
      >
        <MenuOutlined onClick={() => toggleSidebar()} />
      </div>
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } z-50 lg:hidden fixed top-[50px] h-full inset-0 bg-gray-600 bg-opacity-50`}
      ></div>
      <div
        className={`sidebar z-50 fixed bg-[#fafafa] ${
          isSidebarOpen
            ? "left-[0px] overflow-y-hidden"
            : "left-[-300px] overflow-auto"
        }  lg:relative  h-full lg:left-0  p-2  w-[300px]  text-center border-r lg:border-0`}
      >
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Link />
          <div className="m-2.5 flex items-center cursor-pointer mt-6 w-[150px]">
            <ArrowLeftOutlined />
            <span className="ml-4 text-[14px] font-semibold">
              Quay về trang chủ
            </span>
          </div>
        </Link>

        <div className="text-black text-xl">
          <div className="p-2.5 mt-4 flex items-center cursor-pointer">
            <img
              src="src\assets\images\netflix_avatar.png"
              className=" w-12 h-12 border-2"
            />
            <h1 className="font-semibold text-[15px] ml-3">{user?.name}</h1>
            {/* <CloseOutlined
                className="ml-20 cursor-pointer lg:hidden"
                onClick={() => toggleSidebar()}
              /> */}
          </div>
          <hr className="  my-5" />
        </div>

        <NavLink to="/user" className={Hover}>
          <UserOutlined />
          <span className="text-[15px] ml-4 font-semibold">Tài Khoản</span>
        </NavLink>

        <NavLink to="/history" className={Hover}>
          <HistoryOutlined />
          <span className="text-[15px] ml-4 font-semibold">Lịch sử xem</span>
        </NavLink>

        

        <NavLink to="/signup/payment"  className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#bbbbbb] text-black">
          <CalendarOutlined />
          <span className="text-[15px] ml-4 font-semibold">
            Gia hạn dịch vụ
          </span>
        </NavLink>

        <hr className=" my-5" />

        <div
          onClick={() => {
            fetch("http://localhost:8081/v1/api/logout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            }).then(() => {
              localStorage.clear();
              navigate("/login");
            });
          }}
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#bbbbbb] text-black"
        >
          <LogoutOutlined />
          <span className="text-[15px] ml-4 font-semibold">Đăng xuất</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
