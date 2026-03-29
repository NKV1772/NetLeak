/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { genreContext } from "../../context/genre/genreContext";

const EditCategory = ({ genre, setShowEditForm }) => {
  const { editGenre } = useContext(genreContext);

  const [newGenre, setNewGenre] = useState('');
  const handleEdit = () => {
    editGenre(genre, newGenre);

    setShowEditForm(false)

  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg relative">
        <p>Chỉnh sửa Thể loại: {genre.title}</p>
        <input
          value={newGenre}
          type='text'
          placeholder='Tên thể loại'
          className="w-3/4 h-[50px] pl-2 rounded-lg border border-[#3e3e3e] focus:ring-[#679cf8] focus:outline-[#679cf8]"
          onChange={(e) => setNewGenre(e.target.value)}
        />
        <div className="flex justify-between">

          <div className="flex justify-end mt-4">

            <button
              onClick={handleEdit}
              className="bg-[#0A3379] hover:bg-[#061F4A] text-white font-bold py-2 px-4 rounded"
            >
              Chỉnh sửa
            </button>
          </div>

          <div className="flex justify-end mt-4">

            <button
              onClick={() =>{setShowEditForm(false)}}
              className="bg-[#0A3379] hover:bg-[#061F4A] text-white font-bold py-2 px-4 rounded"
            >
              Hủy
            </button>
          </div>
        </div>


      </div>
    </div>
  );
}

export default EditCategory;