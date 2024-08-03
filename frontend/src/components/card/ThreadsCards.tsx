import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardIs } from './Card';


interface Thread {
  _id: string;
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  avatar: string;
}

export default function ThreadsCards() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const cancelTokenSource = axios.CancelToken.source();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/thread/getthreads', {
          params: { pageNumber: 1 },
          cancelToken: cancelTokenSource.token,
        });
        setThreads(response.data.data);
      } catch (error: any) {
        if (axios.isCancel(error)) {
          // Handle request cancellation
        }
      }
    };

    fetchData();

    return () => {
      cancelTokenSource.cancel('Component unmounted');
    };
  }, []);



  return (

    <div className=' py-2 px-2'>
      <h1 className=' text-2xl font-serif mb-1'>
        Threads Posts
      </h1>
              <div className="grid gap-4 px-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {threads.map((thread) => (
            <div key={thread._id} >
              <Link to={`/onethread/${thread._id}`} >
              <CardIs 
              title={thread.title}
              description={thread.description}
              avatar={thread.avatar}
               />
              </Link>
            </div>
          ))}
        </div>
    </div>

  );
}
