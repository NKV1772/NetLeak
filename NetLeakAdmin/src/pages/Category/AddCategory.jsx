import { useContext, useState } from "react";
import { genreContext } from "../../context/genre/genreContext";

const AddCategory = () => {
    const {addGenre}= useContext(genreContext);

    const [newGenre, setNewGenre] = useState('');
    const handleAdd = ()=>{
        addGenre(newGenre);
    }
    
    return (
        <div className="w-full h-auto flex flex-col items-center justify-center gap-5 px-5 pb-5 ">
            <div className="w-full h-full bg-slate-300 rounded-xl flex flex-col items-center py-10 gap-5">
                <input
                    value={newGenre}
                    type='text'
                    placeholder='Tên thể loại'
                    className="w-3/4 h-[50px] pl-2 rounded-lg border border-[#3e3e3e] focus:ring-[#679cf8] focus:outline-[#679cf8]"
                    onChange={(e)=> setNewGenre(e.target.value)}
                />
                <button className="border border-[#3e3e3e] h-[50px] px-5 flex items-center justify-center rounded-xl group hover:bg-[#3e3e3e]" onClick={handleAdd}>
                    <p className="font-bold text-xl group-hover:text-white">Thêm</p>
                </button>
            </div>
            
        </div>
    );
}

export default AddCategory;