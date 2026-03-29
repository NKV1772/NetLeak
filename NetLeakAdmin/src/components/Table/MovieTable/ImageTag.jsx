/* eslint-disable react/prop-types */

const ImageTag = ({image, content}) => {
    return (
        <div className="p-1 pr-3 bg-slate-300 rounded-full flex flex-row items-center gap-3">
            <img
                src={image}
                className="w-10 h-10 object-cover rounded-full"
            />
            <p className="font-bold">{content}</p>
        </div>
    );
}

export default ImageTag;