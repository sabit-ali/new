import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function VideoCards() {
    const [videos,setVideos] = useState([])
    const abortController = new AbortController()
  
    useEffect(()=>{
      (async()=>{
        await axios.get(`api/v1/videos/video`,{
          signal : abortController.signal
        })
        .then((data)=>{
          console.log("data",data.data.data)
          setVideos(data.data.data)
        })
      })()
  
      return ()=>{
        abortController.abort()
      }
    },[videos])
    return (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
    
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {videos.map((video:any) => (
                <Link key={video._id} to={`/onevideo/${video._id}`}>
                    <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                     alt='pic'
                      src={video.thumbnail}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className=" flex flex-col text-center space-y-1 bg-black py-1 px-1 justify-between">
                    <h2 className="text-green-500 text-2xl font-serif">{video.title}</h2>
                    <p className="text-sm text-neutral-400 font-medium ">{video.description}</p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }
    