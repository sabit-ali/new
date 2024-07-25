import { logOut } from "@/store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProfileUpdate from "@/auth/update/profile/ProfileUpdate";

export default function TopBar() {
  const dispatch = useDispatch()
  const auth = useSelector((state:any)=> state.user)


 const logOutHandler = async ()=>{
  console.log("clki")
    dispatch(logOut())
 }

  return (
    <nav className=" flex mx-auto h-14 justify-between px-4 py-3">
      <img src="/assets/logo.svg" />
      <h1 className="  uppercase  font-serif text-xl ">Aliz Application</h1>
      <ul className=" md:flex hidden gap-20">
        <NavLink to={'/'} 
        className={({ isActive}) =>`${isActive ? " text-red-500" : ""}`}
        >Home</NavLink>
        <NavLink to={'/threads'}
         className={({ isActive}) =>`${isActive ? " text-red-500" : ""}`}
        >Threads</NavLink>
        <NavLink to={'/video'}
         className={({ isActive}) =>`${isActive ? " text-red-500" : ""}`}
        >Videos</NavLink>
        <NavLink to={'/contact-us'}
         className={({ isActive}) =>`${isActive ? " text-red-500" : ""}`}
        >Contact Us</NavLink>
      </ul>

      <div className=" md:block hidden">

          {!auth ? <NavLink to={'/sign-up'} className=" px-2 py-1 border rounded-md ">
            sign-up
        </NavLink> : <button onClick={()=> logOutHandler()} className=" px-2 py-1 border rounded-md ">
            log-out
        </button> }

      </div>
      <div className=" md:hidden">
        <span className=" h-14 w-14">&#9776;</span>
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ProfileUpdate/>
        </div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </div>
    </nav>
  )
}
