/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import "./GenreSlide.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import HoverSlide from "./HoverSlide";
export default function GenreSlide({ Genre, setGerne }) {

  const movies = Genre.movies;

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  let hoverTimeout;

  const handleMouseEnter = (index, movie) => {
    const gridContainer = document.querySelector(".grid-container");
    const rowElements = gridContainer.children;
    const firstRowElement = rowElements[0];
    const numberOfColumns = Math.floor(
      gridContainer.offsetWidth / firstRowElement.offsetWidth
    );

    // Kiểm tra số lượng phần tử trong hàng
    // alert(numberOfColumns);
    if (numberOfColumns < 5 && hoveredIndex == -1) {
      // chuyển tới phim thẳng luôn
      setGerne('');
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
      <p className="genre-title capitalize "> {Genre.title}</p>

      <div className="grid-container">
        {/* <div className="image-container"> */}
        {movies.map((movie, index) => {


          return (
            <div
              className={`card ${index === hoveredIndex ? "hovered" : ""} relative`}
              onClick={() => handleMouseEnter(index, movie)}
            >
              <div className="image-container">
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
              <p className="film-title text-center pt-2 line-clamp-film-title text- absolute bottom-0 left-0 w-full mt-10 line-clamp-2 truncate"> {movie.title}</p>
              {index === hoveredIndex ? <HoverSlide setGenre={setGerne} movie={movie} /> : ""}
            </div>
          )
        })}
      </div>
    </div>
  );
}
