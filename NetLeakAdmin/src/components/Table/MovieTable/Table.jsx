import TableMovie from './TableMovie';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/user/userContext";
import { genreContext } from '../../../context/genre/genreContext';

const Table = () => {
    const navigate = useNavigate()
    const { movies, searchMovieText, searchMovieActor,
        searchMovieDirector, searchMovieGenres, searchMovieType, casts, directors } = useContext(UserContext)

    const { genres } = useContext(genreContext)

    const handleCheckSearch = (movie) => {
        if (!movie.title.toLowerCase().includes(searchMovieText.toLowerCase().trim()))
            return false

        if (!(searchMovieType == movie.type || searchMovieType == ''))
            return false

        return true
    }

    const handleCheckArray = (a, b)  => {
        for (let i = 0; i < b.length; i++) {
            if (a.includes(b[i])) {
                return true;
            }
        }
        return false; 
    }

    return (
        <div className='w-full flex justify-center bg-white rounded-t-lg '>
            <div className='w-full flex flex-col '>
                <div className='w-full h-[50px] flex flex-row items-center gap-3 bg-[#0A3379] rounded-t-lg'>
                    <p className='w-1/12 text-center font-bold text-white'>STT</p>
                    <p className='w-10/12 text-center font-bold text-white'>Thông tin phim</p>
                    <div className='w-1/12'></div>
                </div>

                <div className='w-full flex flex-col border border-b-0 border-[#0A3379]'>
                    {movies.map((item, index) => {
                        const castTemp = item.cast.map((cast) => {
                            return cast._id
                        })
                        if (
                            handleCheckSearch(item) && 
                            (handleCheckArray(item.genres, searchMovieGenres) || searchMovieGenres.length ==0) &&
                            (handleCheckArray(item.directors, searchMovieDirector) || searchMovieDirector.length == 0)&&
                            (handleCheckArray(castTemp, searchMovieActor) || searchMovieActor.length ==0)
                        )
                            return (
                                <div key={index}>
                                    <TableMovie
                                        index={index}
                                        image={item.image}
                                        title={item.title}
                                        type={item.type}
                                        releaseDate={item.released}
                                        lastUpdateDate={item.updatedAt}
                                        genresFilm={item.genres}
                                        castFilm={item.cast.map((cast) => {
                                            return cast._id
                                        })}
                                        directorsFilm={item.directors}
                                        id={item._id}
                                    />
                                </div>
                            )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Table;