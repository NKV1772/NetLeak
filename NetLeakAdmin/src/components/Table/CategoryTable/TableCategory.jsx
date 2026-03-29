/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { genreContext } from "../../../context/genre/genreContext";
import EditCategory from "../../../pages/Category/EditCategory";

const TableCategory = ({genre, index}) => {
    const {deleteGenre} = useContext(genreContext);
    const [showConfirmation, setShowConfirmation]= useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const handleDelete =()=>{
        deleteGenre(genre);
        alert("Đã xóa thành công");
        setShowConfirmation(false)
    }
    return (
        <div className="flex flex-row items-center border-b border-[#0A3379] ">
            <p className="w-3/12 text-center font-bold text-xl">{index+1}</p>
            <div className="w-7/12 border-x border-[#0A3379] p-5 flex flex-row">
                <div className="w-full flex flex-col justify-center items-center">
                    <p className=" font-bold text-xl capitalize">{genre.title}</p>
                </div>
            </div>
            <div className='w-1/12 flex items-center justify-center'>
                <div className="w-[50px] h-[50px] cursor-pointer flex items-center justify-center rounded-full hover:bg-[#0A3379] duration-150 east-out group" onClick={()=>setShowConfirmation(true)}>
                    <i className="fa-solid fa-trash text-2xl  text-[#0A3379] group-hover:text-white duration-150 east-out"></i>
                </div>
            </div>
            <div className='w-1/12 flex items-center justify-center'>
                <div className="w-[50px] h-[50px] cursor-pointer flex items-center justify-center rounded-full hover:bg-[#0A3379] duration-150 east-out group" onClick={()=>setShowEditForm(true)}>
                <i className="fa-solid fa-pencil-alt text-2xl text-[#0A3379] group-hover:text-white duration-150 east-out"></i>
                </div>
            </div>
            {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <p>Bạn có chắc chắn muốn xóa không?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditForm && <EditCategory genre={genre} setShowEditForm={setShowEditForm}/>}
        </div>
    );
}

export default TableCategory;