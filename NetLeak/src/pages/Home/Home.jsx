import Navbar from '../../components/Navbar/Navbar';
import Slide from '../../components/Slide/Slide';
import Thumbnail from '../../components/Thumbnail/Thumbnail';
import ThumbnailRes from '../../components/Thumbnail/thumbnailResponsive';
import { AppContext } from '../../context/AppContext';
import './home.css'
import React, { useContext, useEffect } from 'react'

const Home = () => {
    const { genres, movies, accessToken, setAccessToken, userId, setUserId } = useContext(AppContext)

    let token = localStorage.accessToken

    useEffect(() => {
        setAccessToken(token);
      
        console.log('token: ', token);
    },[])
      


    console.log(genres)
    console.log(movies)
    return (
        <div className='w-full bg-[#3e3e3e] pb-20'>
            <Navbar />
            <Thumbnail />
            <ThumbnailRes />
            <div className='w-full relative flex flex-col gap-5'>
                {genres.map((value, index) =>
                    <Slide
                        key={index}
                        title={value.title.toUpperCase()}
                        movies={value.movies}
                    />
                )}
            </div>
        </div>
    );
}

export default Home;