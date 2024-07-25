import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Thread {
  _id: string;
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  avatar : string
}

export default function ThreadsCards() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const cancelTokenSource = axios.CancelToken.source();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/thread/getthreads', {
          params: {
            pageNumber: 1
          },
          cancelToken: cancelTokenSource.token
        });
        setThreads(response.data.data);
      } catch (error:any) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message); // Handle if request is canceled
        } else {
          console.log('Error:', error.message); // Handle other errors
        }
      }
    };

    fetchData();

    return () => {
      cancelTokenSource.cancel('Component unmounted'); // Cancel the request when component unmounts
    };
  }, [cancelTokenSource]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Threads posts</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {threads.map((thread) => (
            <Link key={thread._id} to={`/onethread/${thread._id}`} className=" ">
                <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={thread.title}
                  src={thread.avatar}
                  className="h-[300px] w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className=" flex flex-col text-center space-y-1 bg-black py-1 px-1 justify-between">
                <h2 className="text-green-500 text-2xl font-serif">{thread.title}</h2>
                <p className="text-sm text-neutral-400 font-medium ">{thread.description}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
