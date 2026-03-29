/* eslint-disable react/prop-types */

const GenreTag = ({title}) => {
    return (
        <div className="py-1 px-2 bg-slate-300 rounded-lg">
            <p className="capitalize">{title}</p>
        </div>
    );
}

export default GenreTag;