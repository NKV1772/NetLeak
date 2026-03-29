/* eslint-disable react/prop-types */

const SearchSelect = ({image, content}) => {
    return (
        <div className="w-full flex flex-row items-center p-2 hover:bg-blue-200 rounded-lg gap-3 cursor-pointer">
            <img
                src={image}
                className="w-1/6 rounded-lg"
            />
            <p className="font-medium text-lg">{content}</p>
        </div>
    );
}

export default SearchSelect;