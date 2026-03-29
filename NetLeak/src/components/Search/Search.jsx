
import React, { useRef, useState, useEffect, useContext } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MovieCard from './MovieCard.jsx';
import { AppContext } from '../../context/AppContext.jsx';
import DropdownCheckbox from './DropDown.jsx';

import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
// import SortByRating from './SortByRating.jsx';
import "../../hideScrollbar.css"
// import required modules
import MyListSlide from '../MyListSlide/MyListSlide.jsx'

import { jwtDecode } from 'jwt-decode';



const Search = () => {
    const location = useLocation();
    const [dataTest, setDataTest] = useState(location.state);
    const { movies, genres } = useContext(AppContext);
    const [searchMovie, setSearchMovie] = useState([])
    const [query, setQuery] = useState(dataTest)
    const [genresOptions, setGenresOptions] = useState([])
    
    const {  accessToken } = useContext(AppContext);
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
    const [searchMovie2, setSearchMovie2] = useState([]);

    useEffect(() => {
        let temp = [];
        for (let i = 0; i < movies.length; i++) {
            const searchQuery = query.trim().toLowerCase()
            const movieName = movies[i].title.toLowerCase()
            const isMatch = (movieName.includes(searchQuery))
            if (isMatch) temp.push(movies[i])
        }
        setSearchMovie(temp);
        setSearchMovie2(temp);
    }, [query]);
    
    useEffect(() => {
        let temp = [];
        setSearchMovie(searchMovie2)
        for (let i = 0; i <searchMovie2.length; i++)
        {
            let count = 0;
            for (let j = 0; j < genresOptions.length; j++)
            {
                for (let k = 0; k<searchMovie2[i].genres.length; k++)
                if (searchMovie2[i].genres[k]._id == genresOptions[j]._id)
                {
                    count+=1;
                    
                }
            }
           if(count == genresOptions.length) temp.push(searchMovie2[i])

        }
        setSearchMovie(temp)
    }, [genresOptions, searchMovie2]);

    const handleInputChange = (event) => {
        setDataTest("")
        setQuery(event.target.value)
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setQuery(event.target.value)
        }
      }



    return (
        <div className="bg-[#3e3e3e] w-full h-auto flex justify-center pb-[10vh]">
            <div className='w-11/12'>

                <nav className=" place-items-center flex flex-col xl:flex-row lg:flex-row md:flex-col sm:flex-col p-3 text-center border-bottom">
                    <div className="flex md:w-full lg:w-1/6 col-lg justify-center items-center">

                        <Link to="/home">
                        <p className="hover:text-white text-3xl font-bold text-red-500 cursor-pointer">
                            NETFLIX
                        </p>
                </Link>
                    </div>

                    <div className=" w-full lg:w-3/4 md:w-full md:mt-3 sm:w-4/6 sm:mt-3 lg:ml-6 flex flex-row justify-center ">

                        <form onSubmit={e => { e.preventDefault() }} className='lg:w-11/12 md:w-3/5 sm:w-full w-5/6'>

                            <input className='p-3 lg:pl-3 md:p-2 w-full h-full outline-none rounded-md italic text-white bg-neutral-900'
                                type="text"
                                placeholder='Tìm kiếm'
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                
                            />
                        </form>

                        <button className='w-1/12 bg-red-500 rounded-md '>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
                        </button>

                    </div>
                    <div className='lg:ml-5 lg:w-2/5 md:w-full md:ml-0 md:mt-2 flex flex-row relative items-center'>
                        <ul className='w-full flex md:flex-row text-white justify-between md:item-center hidden'>
                            <li>
                                <a href="#" className='cursor-pointer hover:text-red-500 '>TV Shows</a>
                            </li>
                            <li>
                                <a href="#" className='cursor-pointer hover:text-red-500 '>Phim</a>
                            </li>
                            <li>
                                <a href="#" className='cursor-pointer hover:text-red-500 '>Mới và hot</a>
                            </li>
                            <li>
                                <a href="#" className='cursor-pointer hover:text-red-500 '>Thể loại</a>
                            </li>
                            <li>
                                <a href="#" className='cursor-pointer hover:text-red-500 '>TV Shows</a>
                            </li>
                            <li>
                                <a href="#" className='cursor-pointer hover:text-red-500 '>Danh sách</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faBell} className='cursor-pointer hover:text-red-500' />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faUser} className='cursor-pointer hover:text-red-500' />
                            </li>

                        </ul>


                    </div>
                </nav>

                <div className='flex flex-col h-full '>
                    <div className='w-5/6 flex flex-row pl-10 h-1/6 '>
                        <div className='w-full content-center'>
                            <p className='text-[12px] w-full text-white text-lg truncate'>Kết quả tìm kiếm cho: {query}</p>
                        </div>
                        {/* <SortByRating dropdownName={"Sắp xếp theo đánh giá"} options={rating}/> */}
                        <div>

                        </div>

                    </div>
                    <div className='w-full flex flex-row gap-3'>
                        <div className='md:w-4/5 w-full  flex flex-col'>
                            {searchMovie != 0?
                            (

                            <MyListSlide movies ={searchMovie} allFavoriteFilms={allFavoriteFilms} setAllFavoriteFilms={setAllFavoriteFilms}

                            title = ""/>
                        ) : (
                            <div>
                            <img src='https://cei.org/wp-content/uploads/2020/09/GettyImages-1207750534.jpg'/>
                            </div>             
                        )
                            }


                        </div>
                        <div className='hidden md:flex flex-col items-center w-1/4 justify-stretch content-center'>
                            <div>
                                <label className=' text-red-500 font-medium text-xl'>
                                    Bộ lọc phim
                                </label>
                            </div>
                            <DropdownCheckbox  dropdownName="Thể loại" options={genres} selectedOptions={genresOptions} setSelectedOptions={setGenresOptions}/>
                            {/* <DropdownRadio dropdownName="Loại" options={type} /> */}

                            <div className='pl-3 pt-3 w-[50%]'>
                                <button className="hidden w-full rounded-md border border-gray-500 bg-rose-400 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-zinc-400">
                                    Xóa bộ lọc
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};
export default Search;
