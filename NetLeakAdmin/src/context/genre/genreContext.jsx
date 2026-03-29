import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const genreContext = createContext([]);

// eslint-disable-next-line react/prop-types
export const GenreContextProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [searchGenreText, setSearchGenreText] = useState("")
  //   const [searchText, setSearchText] = useState("")
  const fetch = () => {
    axios
      .get("http://localhost:8081/v1/api/admin/genres")
      .then((res) => {
        console.log("fetch sucessfully", res.data);
        setGenres(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetch();
  }, []);

  const addGenre = (genre) => {
    axios
      .post("http://localhost:8081/v1/api/admin/genres", {
        title: genre
      })
      .then((res) => {
        console.log(res.data);
        alert("Thêm thể loại thành công")
        fetch();
      })
      .catch((err) => console.log(err));
  };

  const deleteGenre = (genre) => {
   axios.delete(`http://localhost:8081/v1/api/admin/genres/${genre._id}`)
   .then((res) => {
    console.log(res.data);
    fetch();
   })
   .catch((err) => console.log(err));


  }
  const editGenre = (genre, newGenre) => {
    axios.put(`http://localhost:8081/v1/api/admin/genres/${genre._id}`,{
        title: newGenre
    }
)
.then((res) => {
    console.log(res.data);
    alert("Chỉnh sửa thể loại thành công")
    fetch();
  })
  .catch((err) => console.log(err));
     }
  return (
    <genreContext.Provider value={{ genres, setGenres, searchGenreText, setSearchGenreText, addGenre, deleteGenre, editGenre }}>
      {children}
    </genreContext.Provider>
  );
};