/* eslint-disable react/prop-types */
const ImageBox = ({castImage, castName, castId, 
    setShowConfirmation,setDeleteCastId, setDeleteCastImage}) => {
    return (
        <div className="w-full flex flex-col items-center border border-[#0A3379] relative">
            <img
                src={castImage}
                className="w-full h-[200px] object-cover"
            />
            <p className="py-5 font-bold">{castName}</p>

            <div className='text-[#DC143C] absolute top-0 right-[10px] font-bold text-[25px] hover:cursor-pointer hover:opacity-[0.6]'
                onClick={() => {
                    setDeleteCastId(castId)
                    setDeleteCastImage(castImage)
                    setShowConfirmation(true)
                }}
            >
                <p className=''>X</p>
            </div>
        </div>
    );
}

export default ImageBox;