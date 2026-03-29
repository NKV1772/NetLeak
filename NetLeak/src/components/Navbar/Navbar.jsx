import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import React, { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import image from "../../assets/movies/1.jpg";
import Noti from "./Noti";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import ResponsiveNav from "./ResponsiveNav";
import clsx from "clsx";

const Navbar = () => {

  const navigate = useNavigate()
  const [noti, setNoti] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [showNav, setShowNav] = useState(false)
  const [isSearch, setIsSearch] = useState(false)

  const [query,setQuery] = useState("")
  const handleChange = (event) => {
    setQuery(event.target.value)
}
  function toogleNoti() {
    setNoti(!noti)
    setIsSearch(false)
    setUserDropdown(false)

  }

  function toogleUserDropdown() {
    setUserDropdown(!userDropdown)
    setIsSearch(false)
    setNoti(false)
  }

  function toggleSearch() {
    setIsSearch(!isSearch)
    setUserDropdown(false)
    setNoti(false)
  }

  const linkStyle = {
    textDecoration: "none",
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate("/search", {state:query})
    }
  }

  return (
    <div className="relative md:absolute w-full px-5">
      {showNav && (
        <ResponsiveNav
          onclick={() => setShowNav(!showNav)}
        />
      )}
      <div className="navbar-container">
        <div className="flex flex-row items-center gap-5 w-[85%] relative">
          <i
            onClick={() => setShowNav(!showNav)}
            className="fa-solid fa-bars text-2xl text-white cursor-pointer block md:hidden"
          ></i>
          <Link to='/home'>
          <h2  className="m-0 text-[red] text-3xl font-extrabold">NETLEAK</h2>
          </Link>
          <div className="hidden md:block ml-5">
            <ul>
              <li>
                <Link to="/home" style={linkStyle}>
                  <p>Trang chủ</p>
                </Link>
              </li>
              <li>
                <Link to="/genre" style={linkStyle}>
                  <p>Thể loại</p>
                </Link>
              </li>

              <li>
                <Link to="/mylist" style={linkStyle}>

                  <p>Danh sách yêu thích</p>

                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative w-auto ">
          <div className="w-auto flex flex-row items-center  justify-between gap-10">
            <div className=" relative w-auto flex flex-row items-center justify-end">
              <FontAwesomeIcon icon={faMagnifyingGlass}
                onClick={toggleSearch}
                // className="absolute text-[#ff0000] text-2xl cursor-pointer mr-3"
                className={clsx({
                  "absolute text-[#ff0000] text-2xl cursor-pointer mr-3": isSearch,
                  "text-white text-2xl cursor-pointer": !isSearch
                })}
              />
              {isSearch && (
                <div>
                  <form onSubmit={e => { e.preventDefault() }}>
                  <input
                    type="text"
                    value={query}
                    className=" text-black w-[250px] h-[35px] focus:ring-[#ff0000] focus:outline-[#ff0000] rounded-md pl-2 pr-10"
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                  />
                  </form>
                </div>
              )}
            </div>
            
            <FontAwesomeIcon
              icon={faUser}
              className="text-white text-2xl cursor-pointer"
              onClick={toogleUserDropdown}
            />
          </div>
         
          {userDropdown && (
            <div className="userDropdown-container">
              <div className="userDropdown-access">
                <h3>CÁ NHÂN</h3>
                <div>
                  <Link to="/user" style={linkStyle}>
                    <Link />

                    <div className="group flex items-center">
                      <UserOutlined className="text-[#696969] mr-2 group-hover:text-[green] cursor-pointer" />
                      <p className="text-[#696969] group-hover:text-[white] cursor-pointer">
                        Tài Khoản
                      </p>
                    </div>
                  </Link>
                  <div className="group flex items-center mt-4">
                    <LogoutOutlined className="text-[#696969] group-hover:text-[green] mr-2  cursor-pointer " />
                    <p 
                      onClick={() => {
                        fetch('http://localhost:8081/v1/api/logout',{
                          method: 'POST',
                          headers: {
                            "Content-Type": "application/json",
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                          }
                        })
                        .then(() => {
                          localStorage.clear()
                          navigate('/login')
                        })
                      }}
                    className="text-[#696969] group-hover:text-[white] cursor-pointer">
                      Đăng xuất
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
