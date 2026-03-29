import Navbar from "../../components/Navbar/Navbar";
import "./MyList.scss";
import React, { useContext, useEffect, useState } from "react";
import MyListSlide from "../../components/MyListSlide/MyListSlide";
import { AppContext } from "../../context/AppContext";
import Lottie from "lottie-react";
import animationData from "../../assets/Lottie/Nothing.json";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

const TabPage = () => {
  const {  accessToken, movies } = useContext(AppContext);
  const token= accessToken;
  const navigate= useNavigate() 
  const [allFavoriteFilms, setAllFavoriteFilms] = useState([])
  const [isLoadingAllFavoriteFilm,setIsLoadingAllFavoriteFilm] = useState(true)
  const [recommendFilms, setRecommendFilms] = useState([])
  const userId= jwtDecode(accessToken).id
//   const [myList, setMyList] = useState(genres[0].movies); // list



  const getAllFavoriteFilms = () => {
    setIsLoadingAllFavoriteFilm(true)
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
                setAllFavoriteFilms( data)
          console.log("favour", data)
        })
        .catch((e) => {
            console.log(e)
        })
        .finally(() => {
        
            setIsLoadingAllFavoriteFilm(false)
        })
}
const getRecommendFilms = () => {
  // setIsLoadingRecommendFilm(true)
  fetch(`http://localhost:8081/v1/api/user/recommendFavorite/${userId}`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
  })
      .then((res) => res.json())
      .then((data) => {
          if (data.success != false)
              setRecommendFilms(movies.filter(movie => data.includes(movie._id)))
      })
      .catch((e) => {
          console.log(e)
      })
      .finally(() => {
          // setIsLoadingRecommendFilm(false)
      })
}
 const handleToHome=()=>{
    navigate(`/home`);
 }
  useEffect(() => {
    getAllFavoriteFilms()
    getRecommendFilms()
    
  }, []);
  return (
    <div className="mylist-container">
      <Navbar />

      {isLoadingAllFavoriteFilm == true || allFavoriteFilms.length==0 ? (
        <div className="flex mt-20 justify-center items-center">
        <Lottie height={400} width={400} animationData={animationData} className="flex-grow"/>
        <div className="flex-grow items-center justify p-5"> 
            <p className="text-3xl text-bold mb-5">Danh sách yêu thích của bạn đang trống</p>
            <p className="hover:text-green-500 cursor-pointer" onClick={handleToHome}> Hãy khám phá thêm các phim khác tại Trang chủ nào</p>
        </div>
        
        </div>
      ) : (
        <>
          <div className="movies-slide">

            <MyListSlide movies={allFavoriteFilms} title="Danh sách phim yêu thích của tôi" setAllFavoriteFilms={setAllFavoriteFilms} allFavoriteFilms={allFavoriteFilms} />
          </div>
          <div className="movies-slide">
            <MyListSlide movies={recommendFilms} title="Đề xuất" setAllFavoriteFilms={setAllFavoriteFilms} allFavoriteFilms={allFavoriteFilms} />
          </div>
        </>
      )}
    </div>
  );
};

export default TabPage;
