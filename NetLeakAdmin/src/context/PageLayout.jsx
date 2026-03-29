import StatusBar from "../components/Navbar/StatusBar";
import clsx from "clsx";
import '../hiddenScroll.css'

const PageLayout = ({ children, navSlide, onclick }) => {
    return (
        <div className="w-full m-h-screen flex flex-row p-3 bg-[#67718a]">
            <div
                // className="w-1/4"
                className={clsx({
                    "w-1/4": navSlide,
                    "w-1/12 duration-200 ease-out": !navSlide
                })}
            ></div>
            <div
                // className="w-3/4 flex flex-col"
                className={clsx({
                    "w-3/4 flex flex-col gap-5": navSlide,
                    "w-11/12 flex flex-col duration-200 ease-out gap-5": !navSlide
                })}
            >
                <StatusBar
                    onclick={onclick}
                />
                {children}
            </div>
        </div>
    );
}

export default PageLayout;