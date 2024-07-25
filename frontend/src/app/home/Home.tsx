
import { useSelector } from "react-redux"


export const Home = () => {
 
  const auth = useSelector((state:any)=> state.user)



  return (
    <div>Home {auth?.name}</div>
  )
}
