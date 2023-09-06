
import Popup from "./Popup";
import Button from './Button';
import FeedbackPopupComments from './FeedbackPopupComments';
import Link from 'next/link';
import mongoose from 'mongoose';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { supabase_Storage } from '../utils/supabase/storage';
import { AiFillDelete } from 'react-icons/ai';
import {ClipLoader} from 'react-spinners';


type Props = {
    close: () => void;
    images: [string] | [];
    votes: any;
    description: string;
    title: string;
    updateVotes: () => void;
    updatingVotes: boolean;
    _id: mongoose.Types.ObjectId;
    userEmail: String;
}

export default function FeedbackItemPopup({ close, images, userEmail, votes, description, title, updateVotes, updatingVotes, _id }: Props) {

    const [editInfo, setEditInfo] = useState({ edit: false, editTitle: title, editDescription: description, editImages: images, });
    const [updating, setUpdating] = useState(false);
    const { data: session, status } = useSession();
    const [uploading, setUploading] = useState <boolean> (false);


    // UPDATE FUNCTION!
    const updateFeedback = async () => {
        setUpdating(true);
        // PUT REQUEST !!
        axios.put('/api/feedback', {
            title: editInfo?.editTitle,
            description: editInfo?.editDescription,
            images: editInfo?.editImages,
            id: _id,
        }).then((res: any) => { setUpdating(false); });
    }

    // UPDATE EDIT STATE!
    const updateEditState = async () => {
        setEditInfo({ ...editInfo, edit: !editInfo?.edit });
    }

    // REMOVE ITEM FROM ARRAY!
    const deleteAttachment = (e: any, val: string) => {
        e.preventDefault();
        setEditInfo({ ...editInfo, editImages: [...editInfo?.editImages.filter((l: string, i: number) => l != val)] as any });
    }

    // CANCEL EDIT INFO!
    const cancelEdit = () => {
        setEditInfo({ ...editInfo, edit: !editInfo?.edit });
    }

    
  // ATTACH FILES FUNCTION !!
  const handleAttachFiles = async (e: any) => {
    e.preventDefault();

    const files = [...e.target.files]; // GETTING FILES PROPERTY FROM EVENT HANDLER !!
    if (!files.length) return;
    setUploading(true);

    const data = await supabase_Storage(files);
    //  const upload = await axios.post('/api/upload',data);
    setUploading(false);
    setEditInfo({...editInfo , editImages:[...editInfo?.editImages,...data] as any});

  }




    return (<>

        <Popup title={""} close={close} >

            {/* MAIN! */}
            <div className="">

                <div className="p-8 pb-2">

                    {/* DEPANDING UPON THE EDIT STATE !! */}
                    {editInfo?.edit ? (<div className="flex flex-col gap-2">
                        <input className="border p-2 rounded-md" placeholder="Edit your Title" value={editInfo?.editTitle} onChange={(e) => {
                            setEditInfo({ ...editInfo, editTitle: e.target.value });
                        }} />
                        <textarea className="border p-2 rounded-md" placeholder="Edit your Description" value={editInfo?.editDescription} onChange={(e) => {
                            setEditInfo({ ...editInfo, editDescription: e.target.value });
                        }} />
                    </div>) : (<div>
                        <h2 className="text-lg font-bold mb-2">{title}</h2>
                        <p className="text-gray-600">{description}</p>
                    </div>)}


                    {/* DISPLAYING IMAGES! */}

                    {editInfo?.editImages.length > 0 && (<p className="text-sm text-gray-500 mt-4">Attachments:</p>)}
                    <section className="flex flex-wrap gap-4">

                        {(editInfo?.editImages?.length > 0 && !editInfo?.edit) && images.map((link: string, ind: number) => (<div key={ind} className="relative w-32  border p-1  rounded-md border-blue-300">
                            {(['jpeg', 'jfif', 'jpg', 'png', 'gif', 'webp'].includes(link.split('.')[3])) ? (<><img className="w-full h-full" src={link} alt="text" /></>) : (<Link href={link} target={"_blank"} className="text-blue-400 flex gap-4 px-4 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                            </svg> <span>visit</span>
                            </Link>)}
                        </div>))}

                        <section className="flex flex-wrap gap-4">
                            {(editInfo?.editImages?.length > 0 && editInfo?.edit) && images.map((link: string, ind: number) => (<div key={ind} className=" relative w-20 h-24 border p-1  rounded-md border-blue-300 border-dashed">
                                <div onClick={(e: any) => deleteAttachment(e, link)} className="absolute -top-1 -right-1 bg-red-300 bg-opacity-50 cursor-pointer text-red-600  h-5 w-5 flex items-center justify-center rounded-full hover:w-7 hover:h-7 transition-all ease-in-out duration-300"><AiFillDelete /></div>
                                {(['jpeg', 'jfif', 'jpg', 'png', 'gif', 'webp'].includes(link.split('.')[3])) ? (<><img className="w-full h-full" src={link} alt="text" /></>) : (<a href={link} target={"_blank"} className="text-blue-400 ">visit</a>)}
                            </div>))}
                        </section>

                    </section>

                </div>

                <div className="flex justify-end border-b px-8 py-2 text-white" onClick={() => { updateVotes() }}>
                    {editInfo?.edit && <button onClick={cancelEdit} type="button" className="bg-gray-300 text-red-400 bg-opacity-50 px-4 mr-4 flex gap-4 items-center rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>Cancel</button>
                    }

                    {/* {editInfo?.edit && <label className="  cursor-pointer bg-black text-white rounded-md mr-4 ">
                        <span className={"flex items-center gap-2 py-1 px-2 rounded-md " + (uploading ? ' bg-green-400 text-white ' : ' ')} >{uploading ? (<><ClipLoader size={16} color={'white'} />waiting</>) : 'Attach Files'}</span>
                        <input multiple onChange={handleAttachFiles} type="file" className="hidden" placeholder="attach files" title="attaching files" />
                    </label>} */}

                    {(session?.user?.email === userEmail && !editInfo?.edit) && <button className="bg-green-500 text-white flex gap-4 items-center rounded-md px-4 mr-4" type="button" onClick={updateEditState}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit
                    </button>}

                    {(session?.user?.email === userEmail && editInfo?.edit) && <button className="bg-green-500 text-white flex gap-4 items-center rounded-md px-4 mr-4" type="button" onClick={updateFeedback}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        {updating ? 'updating...' : 'Update'}
                    </button>}


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