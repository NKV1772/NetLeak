import React, { useContext, useEffect, useState } from 'react'
import './Genre.scss';
import TabPageSlide from '../../../components/TabPageSlide/TabPageSlide';
import TopSlide from '../../../components/TabPageSlide/TopSlide';
import GenreSlide from '../../../components/TabPageSlide/GenreSlide/GenreSlide';
import { AppContext } from '../../../context/AppContext';
import axios from 'axios';
export default function Genre({ Genre, setGenre, setSelectedGenre }) {
  const { genres } = useContext(AppContext)

  const [topMovies, setTopMovies] = useState([]);


  const TopMovies = ["662fa2a8db4524f20df792c5", "662f837cd772d69dd48aeac2", "6630a66c1a3d60de19e9d1a7", "662f8b764a2e36c1894656e6", "6630a28e1a3d60de19e9d110"]
  useEffect(() => {


    const fetchMovieDetail = async () => {
      try {
        const promises = TopMovies.map((movieID) => {
          return axios.get(`http://localhost:8081/v1/api/admin/films/${movieID}`);
        });

        const responses = await Promise.all(promises);

        // Lấy dữ liệu từ tất cả các phản hồi và cập nhật state movies
        const movieData = responses.map((response) => response.data);
        setTopMovies(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetail();


  }, [Genre]);

  return (
    <div>
      {Genre == "" && (

        <div>
          <TopSlide topMovies={topMovies} />
          {
            genres.map(genre => {
              return <TabPageSlide key={genre._id} title={genre.title} setGenre={setGenre} genre={genre} setSelectedGenre={setSelectedGenre} />
            })
          }

        </div>
      )}

      {
        Genre != "" && <GenreSlide Genre={Genre} setGerne={setGenre} /> // Khi chọn thể loại, sẽ hiện thành phần này
      }

    </div>
  )
}
