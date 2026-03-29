import { useContext, useState } from "react";
import { UserContext } from "../../context/user/userContext";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import BeatLoader from "react-spinners/BeatLoader";

const AddActor = () => {
    const { fetchCast } = useContext(UserContext)

    const [images, setImages] = useState([]);
    const [allImages, setAllImages] = useState([]);
    const [inputText, setInputText] = useState([]);

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const submitImage = (e) => {
        if (images) {

            setIsLoading(true)
            e.preventDefault();

            const formData = new FormData();
            formData.append("avatar", images);
            formData.append("name", inputText)

            axios.post(
                "http://localhost:8081/v1/api/admin/casts"
                ,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            )
                .then(() => {
                    toast.success('Thêm diễn viên thành công', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    navigate('/dien-vien')
                })
                .catch((err) => {
                    alert(err)
                    // setIsLoading(false)
                })
                .finally(async () => {
                    await fetchCast()
                    setIsLoading(false)
                })

        }
    }

    const handleImageChange = (event) => {
        setImages(event.target.files[0])

        const files = event.target.files;
        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imagesArray.push(e.target.result);
                if (imagesArray.length === files.length) {
                    setAllImages([...allImages, ...imagesArray]);
                }
            };

            reader.readAsDataURL(files[i]);
        }

    };
    function handleDeleteImage(index) {
        const newImages = allImages;
        newImages.splice(index, 1);
        setImages(newImages);
    }
    return (
        <>
            {isLoading == false ?
                <form onSubmit={submitImage}>
                    <div className="w-full h-auto flex flex-col items-center justify-center gap-5 px-5 pb-5 ">
                        <div className="w-full h-full bg-slate-300 rounded-xl flex flex-col items-center py-10 gap-5">
                            <input
                                value={inputText}
                                onChange={(e) => { setInputText(e.target.value) }}
                                type='text'
                                placeholder='Tên diễn viên'
                                className="w-3/4 h-[50px] pl-2 rounded-lg border border-[#3e3e3e] focus:ring-[#679cf8] focus:outline-[#679cf8]"
                            />

                            <div className="w-3/4">
                                <div>
                                    <input type="file" name="upload_imgs[]" id="upload-img" hidden onChange={handleImageChange} accept="image/*" />
                                    <label htmlFor="upload-img" className="w-full flex flex-row items-center gap-2 mt-2 cursor-pointer">
                                        <i className="fa-solid fa-camera text-[#3e3e3e] text-xl"></i>
                                        <p className="text-[#3e3e3e] font-medium">Thêm hình ảnh</p>
                                    </label>
                                </div>
                                <div className="mt-2 flex flex-row w-full gap-5">
                                    {allImages.map((image, index) => (
                                        <div className="relative" key={index}>
                                            <img src={image} alt={`Preview ${index}`} className="w-[100px] h-[100px] rounded-xl" />
                                            <i className="fa-solid fa-xmark absolute top-2 right-2 bg-white rounded-full px-[2px] cursor-pointer hover:bg-[#fc0307] hover:text-white" onClick={() => handleDeleteImage(index)}></i>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className='border border-[#3e3e3e] h-[50px] px-5 flex items-center justify-center rounded-xl group hover:bg-[#3e3e3e] ' >
                                <p className="font-bold text-xl group-hover:text-white">Thêm</p>
                            </button>
                            <ToastContainer />
                        </div>
                    </div>
                </form>
                :
                <BeatLoader
                    className=" flex justify-center"
                    color={"#36d7b7"}
                    size={30}
                // aria-label="Loading Spinner"
                // data-testid="loader"
                />
            }
        </>
    );
}

export default AddActor;