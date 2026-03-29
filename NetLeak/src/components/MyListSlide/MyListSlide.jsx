/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import "./MyListSlide.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import HoverSlide from "./HoverSlide";
export default function GenreSlide({ allFavoriteFilms, movies, title, setAllFavoriteFilms }) {

  //   const movies= data;

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  let hoverTimeout;

  const handleMouseEnter = (index, movie) => {
    const gridContainer = document.querySelector(".grid-container");
    const rowElements = gridContainer.children;
    const firstRowElement = rowElements[0];

    console.log(gridContainer.offsetWidth/ firstRowElement.offsetWidth);
    // Kiểm tra số lượng phần tử trong hàng
    // alert(numberOfColumns);
    if (gridContainer.offsetWidth/ firstRowElement.offsetWidth < 5 && hoveredIndex == -1) {
      // chuyển tới phim thẳng luôn

      window.scrollTo(0, 0);
      window.location.href = `/movie/${movie._id}`
      return;
    } else {
      hoverTimeout = setTimeout(() => {
        setHoveredIndex(index);
      }, 0);
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setHoveredIndex(-1);
  };
  const handleIconClick = (event) => {
    event.stopPropagation(); // Ngăn chặn sự kiện lan sang phần tử cha
    handleMouseLeave(); // Gọi handleMouseLeave khi click vào icon Xmark
  };

  document.addEventListener("click", (e) => {
    if (hoveredIndex != -1) {

      const hoveredCard = document.querySelector(".card.hovered");

      if (!hoveredCard.contains(e.target)) {

        e.stopPropagation();
        handleMouseLeave();
      }
    }
  });

  return (
    <div>
      {title == ""? "" :
      <p className="genre-title capitalize "> {title}</p>
      }

      <div className="grid-container">
        {/* <div className="image-container"> */}
        {movies.map((movie, index) => {
          return (
            <div
              className={`listcard ${index === hoveredIndex ? "hovered" : ""} relative`}
              onClick={() => handleMouseEnter(index, movie)}
            >
              <div className="image-container ">
                {index === hoveredIndex ? (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="cancel-icon"
                    onClick={handleIconClick}
                  />
                ) : (
                  ""
                )}

                {index !== hoveredIndex ? <img
                  key={index}

                  src={movie.image.poster}
                  alt={`Ảnh ${index + 1}`}
                /> : <img
                  key={index}
                  src={movie.image.banner}
                  alt={`Ảnh ${index + 1}`}
                />}

              </div>
              <p className="film-title text-center absolute bottom-0 left-0 w-full mt-10 line-clamp-2 truncate"> {movie.title}</p>

              {index === hoveredIndex ? <HoverSlide movie={movie}  setAllFavoriteFilms={setAllFavoriteFilms} allFavoriteFilms={allFavoriteFilms} setHoveredIndex={setHoveredIndex}/> : ""}
            </div>
          )

        })}
      </div>
    </div>
  );
}
