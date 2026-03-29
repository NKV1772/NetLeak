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
import { Link, NavLink } from "react-router-dom";
import Modal from "./Modal";
import DropDown from "./DropDown";
import SideBar from "./SideBar";
import { AppContext } from "../../context/AppContext";
import MyListSlide from "../../components/MyListSlide/MyListSlide";
import HistorySlide from "./HistorySlide";
import axios from "axios";

const History = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [movies, setMovies] = useState([]);
  const Menu = ["Tài khoản", "Đăng xuất"];
  const menuRef = useRef();
  const avatarRef = useRef();
  const {userId,accessToken} = useContext(AppContext);
  console.log('token: ', accessToken);

  

useEffect(() => {
  const fetchHistory = async () => {


            fetch(`http://localhost:8081/v1/api/user/historyFilm/${userId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            
        })
            .then((res) => {
              return res.json();
               
            })
            .then((data) => {
              // if(data.success===true)
              setMovies(data.filmId);
              

            })
            .catch((e) => {
                console.log(e)
            })
}
fetchHistory();
}, [])


  function toggleUserDropdown() {
    setUserDropdown(!userDropdown);
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== avatarRef.current) {
      setUserDropdown(false);
    }
  });
  return (
    <div className="user-container ">
      <div className="header">
        <h1>Netleak</h1>
        <div className="relative">
          <div
            ref={avatarRef}
            className="flex flex-row items-center cursor-pointer"
            onClick={() => setUserDropdown(!userDropdown)}
          >
            <img
              src="src\assets\images\netflix_avatar.png"
              className="rounded-full w-10 h-10 border-2"
            />
            {/* <CaretDownOutlined className="ml-2" /> */}
          </div>
          <DropDown ref={menuRef} isVisible={userDropdown} object={Menu} />
        </div>
      </div>
      <div className="flex-row flex">
        <SideBar  className="z-50"/>
        <div className="w-full">
          <div className="flex-col ">
            <h1 className="p-7 text-2xl font-semibold">Tài Khoản</h1>
            <div className="flex-col">
              <div className="py-3 pl-7 font-semibold text-[20px] ">
                Phim đã xem
              </div>
       
              
              <HistorySlide movies={movies} title="Phim đã xem" />
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
