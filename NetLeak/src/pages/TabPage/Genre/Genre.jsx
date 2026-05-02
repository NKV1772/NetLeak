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


  const TopMovies = ["69ca1ccea50a9fa40f82d8e6", "69ca1a1ca50a9fa40f82d878", "69ca2323a50a9fa40f82d8ef", "69cde76b2f9133f8a87d3c79", "69ce08eb389f8c919e0fd4ca"]
  useEffect(() => {


    const fetchMovieDetail = async () => {
      try {
        const promises = TopMovies.map((movieID) => {
          return axios.get(`http://localhost:8081/v1/api/catalog/films/${movieID}`);
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
