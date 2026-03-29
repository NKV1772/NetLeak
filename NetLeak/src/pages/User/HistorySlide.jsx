
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { Link } from "react-router-dom";
export default function HistorySlide({ movies }) {
  //   const movies= data;
  const [shownModal, setShownModal] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  let hoverTimeout;

  const handleIconClick = (event) => {
    alert('Đây là một thông báo cảnh báo!');
    console.log("click");

  };

  console.log("history:", movies );

  return (
    <div>
      <div className="z-10 grid-container mb-10">
        {/* <div className="image-container"> */}

        {movies.length > 0 ? (
        movies.map((movie, index) => {
          return (
            <Link to={`/movie/${movie._id}`}>
            <div className="hover:scale-110 hover:border hover:p-1 hover:bg-[#fafafa] duration-300 ease-in-out relative hover:z-50"
            //   className={`listcard ${
            //     index === hoveredIndex ? "hovered" : ""
            //   } relative`}
            >
              
              <div className=" mb-0">
                {/* {index === hoveredIndex ? (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="cancel-icon"
                    onClick={handleIconClick}
                  />
                ) : (
                  ""
                )} */}

                {index !== hoveredIndex ? (
                  <img
                    key={index}
                    src={movie.image.poster}
                    alt={`Ảnh ${index + 1}`}
                    className="h-[300px]"
                  />
                ) : (
                  <img
                    key={index}
                    src={movie.image.banner}
                    alt={`Ảnh ${index + 1}`}
                  />
                )}
              </div>
              {/* <div className="flex flex-row">
              <p className="w-4/5 film-title text- absolute text-black bottom-0 left-0  mt-10 line-clamp-2 truncate">
                {" "}
                {movie.title}
              </p>
              <div className="w-1/5">Xóa</div>
                </div>
              <div className="text-white bg-slate-400">Xóa</div> */}
              <div className="flex flex-row content-between ">
                <div className=" w-4/5 flex items-center ">
                  <p className="py-5 text-black font-bold line-clamp-2 truncate">
                    {movie.title}
                  </p>
                </div>
                <div className="w-1/5 flex items-center justify-end">
                  {/* <div onClick={()=>setShownModal(true)} className="w-[30px] h-[30px] cursor-pointer flex items-center justify-center rounded-md hover:bg-red-600 duration-150 east-out group">
                    <i className="fa-solid fa-trash text-[20px]  text-gray-600 group-hover:text-white duration-150 ease-out"></i>
                  </div> */}
                </div>
              </div>
              {/* {index === hoveredIndex ? (
                <img src={item?.image.poster} className="h-[300px]" />
              ) : (
                ""
              )} */}
            </div></Link>
          );
        })):
        (<div className="py-3 pl-[19px] w-[500px] font-semibold text-[18px] ">
        Hiện chưa có phim nào, mời bạn xem phim nhé
      </div>)}
      </div>
      {shownModal && (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <p>Bạn có chắc chắn muốn xóa không?</p>
          
            <div className="flex justify-end mt-4 p-5 rounded-md">
              <button
                onClick={() => setShownModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
              >
                Hủy
              </button>
              <button
                
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
