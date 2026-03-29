import ImageBox from "./ImageBox";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/user/userContext";
import { ToastContainer, toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";
import 'react-toastify/dist/ReactToastify.css';

const Table = () => {
    const { casts, searchCastText, fetchCast } = useContext(UserContext)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [deleteCastId, setDeleteCastId] = useState('')
    const [deleteCastImage, setDeleteCastImage] = useState('')

    const handleDelete = (deleteCastId, deleteCastImage) => {
        setShowConfirmation(false)
        setIsLoading(true)
        fetch(`http://localhost:8081/v1/api/admin/casts/?id=${deleteCastId}&imageUrl=${deleteCastImage}`, {
            method: 'DELETE'
        })
            .then(() => {

                toast.success('Xóa diễn viên thành công', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch(err => alert(err))
            .finally(async() => {
                await fetchCast()
                setIsLoading(false)
            })
    }

    return (
        <>
            {isLoading==false ?
                <div className='w-full h-full grid grid-cols-4 gap-5'>
                    {casts.map((cast, index) => {
                        if (
                            cast.name.toLowerCase().includes(searchCastText.toLowerCase().trim()) ||
                            searchCastText == ''
                        )
                            return <ImageBox
                                key={index}
                                castImage={cast.avatar}
                                castId={cast._id}
                                castName={cast.name}
                                setDeleteCastId={setDeleteCastId}
                                setDeleteCastImage={setDeleteCastImage}
                                setShowConfirmation={setShowConfirmation}
                            />
                    })}

                    <ToastContainer />
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
                                        onClick={() => { handleDelete(deleteCastId, deleteCastImage) }}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                :
                <BeatLoader color="#36d7b7" />
            }
        </>
    );
}

export default Table;