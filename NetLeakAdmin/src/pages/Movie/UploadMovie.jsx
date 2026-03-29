import React, { useState } from "react";
import { Link } from "react-router-dom";

const UploadMovie = () => {

    const [images, setImages] = useState([]);
    function handleImageChange(event) {
        const files = event.target.files;
        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onload = function (e) {
                imagesArray.push(e.target.result);
                if (imagesArray.length === files.length) {
                    setImages(imagesArray);
                }
            };

            reader.readAsDataURL(files[i]);
        }

    };

    function handleDeleteImage(index) {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center gap-5 px-5 pb-10 mb-10 ">
            <div className="w-full flex flex-row items-start gap-5">
                <div className="w-1/4 flex flex-col items-center gap-10">
                    <div className="w-full h-[50px] border cursor-pointer flex items-center justify-center py-2 rounded-xl bg-[#101A33] hover:bg-[#0A3379] duration-200">
                        <div className="w-auto">
                            <input type="file" name="upload_imgs[]" id="upload-img" hidden onChange={handleImageChange} />
                            <label htmlFor="upload-img" className="w-full flex flex-row items-center gap-2 cursor-pointer">
                                <i className="fa-solid fa-video text-white text-xl"></i>
                                <p className="text-white font-medium">Thêm phim</p>
                            </label>
                        </div>
                    </div>
                    <div className="relative w-full">
                        {images.map((image, index) => (
                            <div className="relative" key={index}>
                                <img src={image} className="w-full rounded-xl" />
                                <i className="fa-solid fa-xmark absolute top-2 right-2 bg-white rounded-full px-[2px] cursor-pointer hover:bg-[#fc0307] hover:text-white" onClick={() => handleDeleteImage(index)}></i>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-3/4 bg-white rounded-xl p-5">
                    <p className="text-4xl font-bold mb-10">Thông tin tập phim</p>

                    <div className="flex flex-col gap-5">
                        <div className="w-full flex flex-row items-center">
                            <p className="w-1/4">Tên tập phim:</p>
                            <input
                                type="text"
                                placeholder="Tên phim"
                                className="w-2/3 h-[40px] pl-3 border border-[#3e3e3e] rounded-md outline-none"
                            />
                        </div>

                        <div className="w-full flex flex-row items-center">
                            <p className="w-1/4">Chi tiết tập phim:</p>
                            <textarea className="w-2/3 p-3 resize-none rounded-xl border border-[#3e3e3e]" name="comment" cols="30" rows="4" placeholder="Viết bình luận của bạn"></textarea>

                        </div>

                        <div className="mt-10 flex items-center justify-center w-3/4">
                            <button className="h-[60px] w-2/5 border border-black rounded-lg hover:bg-[#0A3379] group hover:border-[#0A3379]">
                                <p className="text-xl font-bold group-hover:text-white">CẬP NHẬT</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadMovie;