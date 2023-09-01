
import Link from 'next/link';
import mongoose from 'mongoose';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Popup from './Popup';
import Button from './Button';
import {signIn} from 'next-auth/react';

type Props = {
    openItem: () => void;
    feed: any;
}

export default function FeedbackItem({ openItem, feed }: Props) {

    const [loginPopup,setLoginPopup] = useState<boolean>(false);


    const give_down_votes = async(e:any) => {
        e.stopPropagation();
        e.preventDefault();
        setLoginPopup(true);

    }

    const close = () =>{
        setLoginPopup(false);
    }


    const handle_login = (e:any) => {
       e.preventDefault();
       e.stopPropagation();

       signIn('google');
    }


    return (<>

        <div   className="flex gap-8 items-center my-8">
            <Link href="" onClick={(e) => { e.preventDefault(); openItem() }} className="flex-grow">
                <h2 className="font-bold">{feed?.title}</h2>
                <p className="text-gray-600 text-sm ">{feed?.description}</p>
            </Link>
            {loginPopup && (<>
              <Popup close={close} title={"Login to Submit your vote"} narrow>
                <Button onClick={handle_login}>Login WIth Google</Button>
              </Popup>
            </>)}
            <div className="" onClick={give_down_votes} >
                <button type="button" className="text-gray-400 text-sm items-center shadow-sm shadow-gray-200 border rounded-md py-1 px-1 flex gap-1">
                    <span className="triangle" ></span>{feed?.votes || 0}
                </button>
            </div>
        </div>


    </>)
}