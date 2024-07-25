
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Props {
    createdAt :Date,
    description :string,
    isPublished : string,
    thumbnail :string
    title :string,
    updatedAt :string,
    videoFile : string,
}

export default function OneVideo() {
    const [videos, setVideos] = useState<Props | null>(null)

    const params = useParams<{ videoId: string }>()

    useEffect(() => {
        (async () => {
            await axios.get(`/api/v1/videos/singleplayer?videoId=${params.videoId}`)
                .then((data) => {
                    console.log("data", data.data.data)
                    setVideos(data.data.data)
                })

        })()
    }, [])
    return (
        <div className=' text-neutral-700 mx-auto h-screen w-full overflow-y-auto'>
            <div className=' h-screen flex justify-center items-center flex-col'>
                <div>
                    <video 
                    controls
                    src={videos?.videoFile} 
                    className=' max-w-3xl md:w-full'
                    />
                </div>
                  <h1 className=' text-2xl md:text-4xl font-serif  font-semibold'>{videos?.title}</h1>
                    <p className=' font-medium  text-sm underline tracking-wider'>{videos?.description}</p>
            </div>
        </div>
    )
}
