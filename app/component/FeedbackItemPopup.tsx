
import Popup from "./Popup";
import Button from './Button';
import FeedbackPopupComments from './FeedbackPopupComments';
import Link from 'next/link';
import mongoose from 'mongoose';

type Props = {
    close: () => void;
    images: [string] | [];
    votes: any;
    description: string;
    title: string;
    updateVotes: () => void;
    updatingVotes: boolean;
    _id: mongoose.Types.ObjectId;
}

export default function FeedbackItemPopup({ close, images, votes, description, title, updateVotes, updatingVotes, _id }: Props) {





    return (<>

        <Popup title={""} close={close} >

            {/* MAIN! */}
            <div className="">

                <div className="p-8 pb-2">
                    <h2 className="text-lg font-bold mb-2">{title}</h2>
                    <p className="text-gray-600">{description}</p>

                    {/* DISPLAYING IMAGES! */}

                    {images.length > 0 && (<p className="text-sm text-gray-500 mt-4">Attachments:</p>)}
                    <section className="flex flex-wrap gap-4">

                        {(images?.length > 0) && images.map((link:string, ind:number) => (<div key={ind} className="relative w-32  border p-1  rounded-md border-blue-300">
                            {(['jpeg', 'jfif', 'jpg', 'png', 'gif', 'webp'].includes(link.split('.')[3])) ? (<><img className="w-full h-full" src={link} alt="text" /></>) : (<Link href={link} target={"_blank"} className="text-blue-400 flex gap-4 px-4 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                            </svg> <span>visit</span>
                            </Link>)}
                        </div>))}

                    </section>

                </div>

                <div className="flex justify-end border-b px-8 py-2 text-white" onClick={() => { updateVotes() }}>
                    <Button primary>
                        <span className="triangle"></span>
                        <span>Votes {votes?.length || 0}</span>
                    </Button>
                </div>

                <FeedbackPopupComments feedbackId={_id} />

            </div>

        </Popup>



    </>)
}