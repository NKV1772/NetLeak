
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext([])

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [casts, setCasts] = useState([])
  const [directors, setDirectors] = useState([])
  const [movies, setMovies] = useState([])

  const [searchUserText, setSearchUserText] = useState("")
  const [searchDirectorText, setSearchDirectorText] = useState("")
  const [searchCastText, setSearchCastText] = useState("")

  //movie search
  const [searchMovieText, setSearchMovieText] = useState("")
  const [searchMovieActor, setSearchMovieActor] = useState([])
  const [searchMovieDirector, setSearchMovieDirector] = useState([])
  const [searchMovieGenres, setSearchMovieGenres] = useState([])
  const [searchMovieType, setSearchMovieType] = useState("")

  const fetchUser = () => {
    axios.get("http://localhost:8081/v1/api/admin/users")
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchCast = () => {
    axios.get("http://localhost:8081/v1/api/admin/casts")
      .then((res) => {
        setCasts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchDirector = () => {
    axios.get("http://localhost:8081/v1/api/admin/studios")
      .then((res) => {
        setDirectors(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const fetchMovie = () => {
    axios.get("http://localhost:8081/v1/api/admin/films")
      .then((res) => {
        setMovies(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getGenreById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/v1/api/admin/genres/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  const getDirectorById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/v1/api/admin/studios/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  useEffect(() => {
    fetchUser()
    fetchCast()
    fetchDirector()
    fetchMovie()
  }, [])

  return (
    <UserContext.Provider value={{
      users, setUsers,
      casts, setCasts,
      directors, setDirectors,
      movies, setMovies,
      searchUserText, setSearchUserText,
      searchDirectorText, setSearchDirectorText,
      searchCastText, setSearchCastText,
      fetchDirector, fetchCast, fetchMovie,
      getGenreById, getDirectorById,
      searchMovieText, setSearchMovieText,
      searchMovieActor, setSearchMovieActor,
      searchMovieDirector, setSearchMovieDirector,
      searchMovieGenres, setSearchMovieGenres,
      searchMovieType, setSearchMovieType,
    }}>
      {children}
    </UserContext.Provider>
  );
};