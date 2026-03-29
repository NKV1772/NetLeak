import EpList from './Info/EpList';
import DirectInfo from './Info/DirectInfo';
import Info3 from './Info/Suggest';
import Suggest from './Info/Suggest';
import './MovieInfo.css'
import React, { useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { AppContext } from '../../../context/AppContext';

const MovieInfo = ({ setInfo,info, film }) => {

    const {accessToken}= useContext(AppContext)
    
    
    const [isLoadingRecommendFilm, setIsLoadingRecommendFilm] = useState(true)
    const [recommendFilms, setRecommendFilms] = useState([])
    // console.log("recom",film._id)
    const getRecommendFilms = () => {
        setIsLoadingRecommendFilm(true)
        fetch(`http://localhost:8081/v1/api/user/recommend/genre/${film._id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success != false)

                    setRecommendFilms( data)
               
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setIsLoadingRecommendFilm(false)
            })
    }
    useEffect(()=>{
getRecommendFilms()
        

    },[film._id])
    return (
        <div className='movieinfo-container'>
            {info == 1 && (
                <EpList
                />
            )}
            {info == 2 && (
                <DirectInfo
                    data={film.cast}
                />
            )}
            {info == 3 && (
                <DirectInfo
                    data={film.directors}
                />
            )}
            {info == 4 && (
                <Suggest data={recommendFilms} setInfo={setInfo}/>
            )}
        </div>
    );
}

export default MovieInfo;