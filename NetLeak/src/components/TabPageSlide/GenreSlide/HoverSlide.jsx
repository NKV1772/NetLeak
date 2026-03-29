import { Link, useNavigate } from "react-router-dom";
import "./GenreSlide.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
export default function HoverSlide({ setGenre, movie }) {
  const navigate= useNavigate();
  const {accessToken} = useContext(AppContext)
  const [allFavoriteFilms, setAllFavoriteFilms] = useState([])
  const userId= jwtDecode(accessToken).id
  const handleClick = () => {
    setGenre("");
    window.scrollTo(0, 0);
  };
  const handleDeleteFavoriteFilm = (filmId) => {
    fetch(`http://localhost:8081/v1/api/user/favorite`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            filmId: filmId,
            userId: userId
        })
    })
        .then(() => {
            getAllFavoriteFilms()
        })
        .catch((e) => {
            console.log(e)
        })
}
    const handleAddFavoriteFilm = () => {
        fetch(`http://localhost:8081/v1/api/user/favorite`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                filmId: movie._id,
                userId: userId
            })
        })
            .then(() => {
                getAllFavoriteFilms()
            })
            .catch((e) => {
                console.log(e)
            })
    }
    const getAllFavoriteFilms = () => {
      // setIsLoadingAllFavoriteFilm(true)
      fetch(`http://localhost:8081/v1/api/user/favorite/${userId}`, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
          },
      })
          .then((res) => res.json())
          .then((data) => {
              if (data.success != false)
                  setAllFavoriteFilms(data)
                console.log(data)
          })
          .catch((e) => {
              console.log(e)
          })
          .finally(() => {
            console.log(movie)
              // setIsLoadingAllFavoriteFilm(false)
          })
  }
const handlePlay = () =>{
  navigate(`/movie/${movie._id}`)
}
  const { genres } = useContext(AppContext);
  const findGenreTitle = (id) => {
    let foundGenreTitle = ""; 

   
    genres.forEach((genre) => {
      if (genre._id === id) {
        foundGenreTitle = genre.title; 
        return; 
      }
    });

    return foundGenreTitle; 
  };
  useEffect(()=>{
    getAllFavoriteFilms()
  },[])
  return (
    <>
      <div className="flim-description">
        <div className="flex flex-row mb-2 rating-container ml-2 pr-2 ">
          <Link to={`/movie/${movie._id}`}onClick={handleClick}>
            <p
              className="font-black text-white text-sm ml-2 mb-2 hover:text-green-500 cursor-pointer line-clamp-2"
              style={{ textShadow: "0 0 3px black" }}
            >
              {movie.title}
            </p>
          </Link>

          <button className="rounded-full bg-green-500 text-white px-4 py-2 ml-auto hover:filter hover:brightness-110 transition duration-300">
            <FontAwesomeIcon
              icon={faPlay}
              onClick={handlePlay}
              className="icon"
            />
            {/* <p className='text-white  text-xs'>Phát</p> */}
          </button>
          <button className="rounded-full bg-gray-500 text-white px-4 py-2 ml-2 hover:filter hover:brightness-110 transition duration-300"
          onClick={() => {
                                            if (allFavoriteFilms.some((favorfilm) => favorfilm._id == movie._id)) {
                                                handleDeleteFavoriteFilm(movie._id)
                                            }
                                            else {
                                                handleAddFavoriteFilm(movie._id)
                                            }
                                        }}
                                    >
            <FontAwesomeIcon
              icon={faHeart}
              className={` icon ${allFavoriteFilms.some((favorfilm) => favorfilm._id == movie._id) ? 'text-[red] brightness-[1.2]' : ''}`}             
              
            />
            {/* <p className='text-white  text-xs'>Danh sách</p> */}
          </button>
        </div>
        <div className="p-0">
          <ul className="flex flex-row mb-2 rating-container ml-2 pt-2">
            <li className="text-white font-medium">
              {movie.released.substring(0, 4)} 
            </li>
            <li className="ml-3 mr-3 text-white">|</li>
            <li className="text-green-500 font-medium rating">
              {movie.imdb.rating != null ? movie.imdb.rating.toFixed(1) : "10"} 
              <FontAwesomeIcon icon={faStar} className="ml-1 text-green-500" />
            </li>
          </ul>
          <ul className="flex flex-row mb-2 movie-tag ml-2">
            {movie.genres.map((genre, i) => {
              if (i < 3)
                return (
                  <li className="text-white text-xs mr-3 bg-gray-700 p-1 pl-3 pr-3 cursor-pointer rounded-md capitalize">
                    {findGenreTitle(genre)}
                  </li>
                );
            })}
          </ul>
          <p className="text-white text-xs p-2 pt-0 pb-5 bg-black rounded-[10px] text-justify line-clamp-4">
            {movie.fullplot.substring(0,150)} ...
          </p>
        </div>
      </div>
    </>
  );
}
