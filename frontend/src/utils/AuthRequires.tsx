import { useSelector } from "react-redux";
import { useLocation,Navigate, Outlet } from "react-router-dom";

const RequireAuth = ()=>{

    
    const auth = useSelector((state:any)=> state.user)
    const location = useLocation()

    return (
        <>
            {auth ? <Outlet/> : <Navigate to='/sign-in' state={{ form : location}} replace />}
        </>
    )
}

export default RequireAuth