import { NavLink } from "react-router-dom";


export default function LeftSide() {
  return (
    <div className=" md:block hidden rounded-xl overflow-hidden mt-40 dark:bg-black ">
      <nav className="mx-10 w-56 overflow-hidden flex justify-center bg-gray-900">

        <ul className="flex flex-col justify-start gap-4 items-center font-serif h-full w-full py-10 px-6  bg-white dark:bg-black">
          <NavLink to={'/upload-thread'}
            className={({ isActive }) => `${isActive ? " text-red-500" : ""}`}
          >Create-Threads</NavLink>
          <NavLink to={'/upload-video'}
            className={({ isActive }) => `${isActive ? " text-red-500" : ""}`}
          >Upload-video</NavLink>


        </ul>

      </nav>
    </div>
  )
}
