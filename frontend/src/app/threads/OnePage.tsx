import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


interface Props {
    title: string,
    description: string,
    avatar : string,
    createdAt: Date,
    updatedAt: Date,
}

export default function OnePage() {
    const params = useParams<{ threadId: string }>();
   

    const [onePage, setOnePage] = useState<Props>({
        title: '',
        description: '',
        avatar : '',
        createdAt: new Date,
        updatedAt: new Date,
    });

    useEffect(() => {
        const fetchOnePage = async () => {
            try {
                const response = await axios.get(`/api/v1/thread/get-one-thread?threadId=${params.threadId}`);
                const data = response.data.data; // Assuming response.data is of type Props
                setOnePage(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOnePage();
    }, [params.threadId]); // Only re-run the effect if params.threadId changes

    const updateAte = new Date(onePage.updatedAt);
    const createdAtDate = new Date(onePage.createdAt);
    const formattedDate = createdAtDate.toLocaleString();
    const updateDate = updateAte.toLocaleString();
    return (
        <>
            <div className='min-h-screen  flex justify-center '>
                <div className=' md:flex  '>
                    <div className='border  px-1 py-1  '>
                        <img className=' h-[340px] w-full md:h-full object-none object-right-top rounded-sm' src={onePage.avatar} alt="luffy" />
                    </div>
                    <div className='w-full flex flex-col mx-auto mt-20'>
                          <div className=' flex flex-col justify-center items-center gap-4 w-full '>
                            <h1 className=' font-serif font-semibold text-2xl text-center '>{onePage.title}</h1>
                            <p className=' font-sans text-neutral-500 text-center text-sm'>{onePage.description}</p>

                            <div className=' flex w-full justify-around text-neutral-700'>
                                    <h1> {formattedDate} </h1>
                                    <h1> {updateDate} </h1>
                            </div>
                          </div>         
                    </div>
                </div>
            </div>
        </>
    );
}
