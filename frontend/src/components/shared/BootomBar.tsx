import { NavLink } from "react-router-dom";

export default function BootomBar() {
  return (
    <div >
          <nav className="  w-full flex justify-center items-center rounded-xl">
      <ul className="md:hidden  flex gap-20">
        <NavLink to={'/'}
          className={({ isActive }) => `${isActive ? " bg-purple-600 rounded-3xl" : ""} hover:bg-purple-500 hover:shadow-md hover:rounded-3xl hover:animate-pulse`}
        >
          <img  className=" h-14 w-14" src="/assets/home.svg" alt="" />
        </NavLink>
        <NavLink to={'/threads'}
          className={({ isActive }) => `${isActive ? " bg-purple-600 rounded-3xl" : ""} hover:bg-purple-500 hover:shadow-md hover:rounded-3xl hover:animate-pulse`}
        >
           <img  className=" h-14 w-14" src="/assets/message.svg" alt="" />
        </NavLink>
        <NavLink to={'/upload-video'}
          className={({ isActive }) => `${isActive ? " bg-purple-600 rounded-3xl" : ""} hover:bg-purple-500 hover:shadow-md hover:rounded-3xl hover:animate-pulse`}
        >
           <img  className=" h-14 w-14" src="/assets/video.svg" alt="" />
        </NavLink>
        <NavLink to={'/contact-us'}
          className={({ isActive }) => `${isActive ? " bg-purple-600 rounded-3xl" : ""} hover:bg-purple-500 hover:shadow-md hover:rounded-3xl hover:animate-pulse`}
        >
           <img  className=" h-14 w-14" src="/assets/contact.svg" alt="" />
        </NavLink>
      </ul>
    </nav>
    </div>
  )
}
