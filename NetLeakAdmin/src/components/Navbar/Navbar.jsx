/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import NavButton from "../Button/NavButton";
// import NavDropButton from "../Button/NavDropButton";
import logo from "../../assets/N-logo.png";
import clsx from "clsx";
import { UserContext } from "../../context/user/userContext";
import { useLocation } from "react-router-dom"

const Navbar = ({ navSlide }) => {
  const [isSelect, setIsSelect] = useState(1);
  const { setSearchUserText } = useContext(UserContext)

  const location = useLocation();

  useEffect(() => {

    const getRoute = () => {
      const routeLink = location.pathname.split('/')

      let routeLinkNum = 0

      if (routeLink[1] == 'thong-ke')
        routeLinkNum = 1

      if (routeLink[1] == 'nguoi-dung')
        routeLinkNum = 2

      if (routeLink[1] == 'phim')
        routeLinkNum = 3

      if (routeLink[1] == 'the-loai')
        routeLinkNum = 4

      if (routeLink[1] == 'dien-vien')
        routeLinkNum = 5

      if (routeLink[1] == 'doi-ngu')
        routeLinkNum = 6

      setIsSelect(routeLinkNum)
    }

    getRoute()
  }, [])

  useEffect(() => {
    setSearchUserText("")
  }, [isSelect])

  return (
    <div
      // className="w-1/4 h-screen fixed p-3 border"
      className={clsx({
        "w-1/4 h-screen fixed p-3": navSlide,
        "w-auto h-screen fixed p-3": !navSlide,
      })}
    >
      <div
        // className="h-full w-full bg-[#101A33] rounded-xl p-3"
        className={clsx({
          "h-full w-full bg-[#101A33] rounded-xl p-3 ": navSlide,
          "h-full w-[74px] bg-[#101A33] rounded-xl p-3 duration-200 ease-out":
            !navSlide,
        })}
      >
        <div className="w-full h-1/5 flex justify-center items-center duration-200">
          {navSlide ? (
            <p className="font-bold text-3xl text-[#fc0303]">NETLEAK</p>
          ) : (
            <img src={logo} className="w-[50px] h-[50px]" />
          )}
        </div>
        <ul
          // className="w-[100px] h-3/5 flex flex-col gap-2 "
          className={clsx({
            "w-full h-3/5 flex flex-col gap-2 ": navSlide,
            "w-[50px] h-3/5 flex flex-col gap-2 ": !navSlide,
          })}
        >
          <NavButton
            text={"Thống kê"}
            icon={"fa-solid fa-chart-simple"}
            path={"/thong-ke"}
            isSelect={isSelect}
            position={1}
            onclick={() => setIsSelect(1)}
            navSlide={navSlide}
          />
          <NavButton
            text={"Quản lý người dùng"}
            icon={"fa-solid fa-user"}
            path={"/nguoi-dung"}
            isSelect={isSelect}
            position={2}
            onclick={() => setIsSelect(2)}
            navSlide={navSlide}
          />

          <NavButton
            text={"Quản lý phim"}
            icon={"fa-solid fa-film"}
            path={"/phim"}
            isSelect={isSelect}
            position={3}
            onclick={() => setIsSelect(3)}
            navSlide={navSlide}
          />

          <NavButton
            text={"Quản lý thể loại"}
            icon={"fa-solid fa-list"}
            path={"/the-loai"}
            isSelect={isSelect}
            position={4}
            onclick={() => setIsSelect(4)}
            navSlide={navSlide}
          />

          <NavButton
            text={"Quản lý diễn viên"}
            icon={"fa-solid fa-star"}
            path={"/dien-vien"}
            isSelect={isSelect}
            position={5}
            onclick={() => setIsSelect(5)}
            navSlide={navSlide}
          />

          <NavButton
            text={"Quản lý đội ngũ"}
            icon={"fa-solid fa-video "}
            path={"/doi-ngu"}
            isSelect={isSelect}
            position={6}
            onclick={() => setIsSelect(6)}
            navSlide={navSlide}
          />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;