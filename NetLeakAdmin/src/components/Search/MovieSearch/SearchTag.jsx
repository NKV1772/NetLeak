/* eslint-disable react/prop-types */

const SearchTag = ({content}) => {
    return (
        <div className="flex flex-row items-center gap-2 bg-gray-300 py-1 px-3 rounded-full">
            <p className="font-bold">{content}</p>
            {/* <i className="fa-solid fa-xmark-circle hover:text-[#fc0303] cursor-pointer"></i> */}
        </div>
    );
}

export default SearchTag;