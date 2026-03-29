import React from "react";
import { Link } from "react-router-dom";

const NavDropButton = ({ name, path }) => {
    return (
        <Link
            to={path}
            className="w-full h-10 flex flex-row items-center gap-2 text-white cursor-pointer "
        >
            <i className="fa-solid fa-minus font-bold"></i>
            <p className="font-bold hover:underline">{name}</p>
        </Link>
    );
}

export default NavDropButton;