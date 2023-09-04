
import Link from 'next/link';
import mongoose from 'mongoose';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Popup from './Popup';
import Button from './Button';
import {signIn} from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { ClipLoader } from 'react-spinners';
import FeedbackItemPopup from './FeedbackItemPopup';


type Props = {
    feed: any;
}

export default function FeedbackItem({ feed }: Props) {

    const [loginPopup,setLoginPopup] = useState<boolean>(false);
    const {data:session} = useSession();
    const [backendVotes , setBackendVotes] = useState(feed?.votes);
    const [updatingVotes , setUpdatingVotes] = useState<boolean>(false);
    const [showItem , setShowItem] = useState<any>(null);



    const updateVotes = () => {
        if(!session?.user?.email){
            setLoginPopup(true);
        }else{ // GIVE VOTE OR DOWN VOTE!
            setUpdatingVotes(true);
            // CHECK IF USER ALREADY GIVE VOTE !!!
            if(backendVotes.includes(session?.user?.id)){ // THEN REMOVE!
             const remove = [...feed?.votes.filter((id:any,ind:any) => id !== session?.user?.id)] // NEW ARRAY!
             setBackendVotes(remove);console.log("removed!");
             axios.put('/api/feedback?id='+feed?._id,{votes:remove})
             .then((res:any)=>{console.log(res);setUpdatingVotes(false)});
                
            }else{ // OTHERWISE NEW VOTE !!!
                const add = [...feed?.votes,session?.user?.id] // NEW ARRAY!
                setBackendVotes(add);console.log("added!")
                axios.put('/api/feedback?id='+feed?._id,{votes:add})
                .then((res:any)=>{console.log(res);setUpdatingVotes(false)});

            }   
        }
    }

    const give_down_votes = async(e:any) => {
        // e.stopPropagation();
        // e.preventDefault();
        updateVotes();
    }

    const close = () =>{
        setLoginPopup(false);
    }

     // FUNCTION TO SHOW FEEDBACK ITEM!!
    const showFeedbackItem = (id:any) => {
      setShowItem(id);
    }


    const handle_login = async(e:any) => {
       e.preventDefault();
       e.stopPropagation();
       await signIn('google');
    }

    console.log(feed);


    return (<>

        <div   className="flex gap-8 items-center my-8">
            <Link href="" onClick={(e) => { e.preventDefault();showFeedbackItem(feed)}} className="flex-grow">
                <h2 className="font-bold">{feed?.title}</h2>
                <p className="text-gray-600 text-sm ">{feed?.description}</p>
            </Link>
            {loginPopup && (<>
              <Popup close={close} title={"Login to Submit your vote"} narrow>
                <Button onClick={handle_login} primary>Login WIth Google</Button>
              </Popup>
            </>)}
            <div className="" onClick={give_down_votes} >
                <button type="button" className={(backendVotes.includes(session?.user?.id) ? 'bg-blue-500 text-white' : ' text-gray-400 bg-white  ')+" text-sm items-center shadow-sm shadow-gray-200 border rounded-md py-1 px-1 flex gap-1"}>
                    <span className="triangle" ></span>
                    { (!updatingVotes) && (backendVotes?.length || 0)}
                    { (updatingVotes) && (<ClipLoader size={16} color={'blue'}/>)}
                </button>
            </div>
        </div>


          {/* SHOW FEEDBACK MODAL! */}
        {showItem && (<><FeedbackItemPopup _id={feed?._id} images={feed?.images} votes={backendVotes}  updateVotes={updateVotes}
             description={feed?.description} title={feed?.title} updatingVotes={updatingVotes}
             close={() => showFeedbackItem(null)} /></>)}

    </>)
}