import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CardIs } from './Card'

export default function VideoCards() {
  const [videos, setVideos] = useState([])
  const abortController = new AbortController()

  useEffect(() => {
    (async () => {
      await axios.get(`api/v1/videos/video`, {
        signal: abortController.signal
      })
        .then((data) => {

          setVideos(data.data.data)
        })
    })()

    return () => {
      abortController.abort()
    }
  }, [])
  return (

    <div className=' py-2 px-2'>
      <h1 className=' text-2xl font-serif mb-1'>
        Videos Posts
      </h1>
      <div className="grid gap-4 px-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {videos.map((video: any) => (
          <div key={video._id} >
            <Link to={`/onevideo/${video._id}`} >
              <CardIs
                title={video.title}
                description={video.description}
                avatar={video.thumbnail}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>

  );
}

