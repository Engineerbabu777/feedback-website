
import Button from './Button';
import Popup from './Popup';
import {useState} from 'react';
import axios from 'axios';
import {supabase_Storage} from '../utils/supabase/storage';

type Props = {
    close: () => void;
}

export default function FeedbackForm({ close }: Props) {

    const [suggestion , setSuggestion] = useState<{title:string,description:string}>({
        title: '',
        description:'',
    });

    // FUNCTION TO HANDLE THE STATES!
     const handler = (e:any) => {
        setSuggestion({...suggestion , [e.target.name]:e.target.value});
     }

    // FUNCTION TO POST NEW FEEDBACK !!
     const postFeedback = async(e:any) => {
       e.preventDefault();
       // CHECKING IF ANY STATE IS EMPTY!
       
       // POST REQUEST USING AXIOS!
       axios.post('/api/feedback',{title:suggestion?.title , description:suggestion?.description})
       .then((response:any) => close).catch((err:any) => console.log(err.message))
     }

   
    // ATTACH FILES FUNCTION !!
     const handleAttachFiles = async(e:any) =>  {
      e.preventDefault();

      const files = [...e.target.files]; // GETTING FILES PROPERTY FROM EVENT HANDLER !!

      supabase_Storage(files);
      //  const upload = await axios.post('/api/upload',data);
      //  console.log(upload)

     }




    return (<>
       
       <Popup close={close} title={'Make a Suggestion'} > 

         <form className="p-8">
            <label className="block mt-4 mb-1 text-slate-700">Title</label>
            <input value={suggestion.title} onChange={handler} name="title" className="w-full border rounded-md p-2" type="text" placeholder="A short descriptive , title" />
            <label className="block mt-4 mb-1 text-slate-700">Details</label>
            <textarea value={suggestion.description} onChange={handler} name="description" className="w-full border resize-none rounded-md p-2" placeholder="Please includes any details" />
            <div className="flex gap-2 mt-2 justify-end">
                 <label className="py-2 px-4 text-gray-600 cursor-pointer">
                   <span >Attach Files</span> 
                   <input multiple onChange={handleAttachFiles} type="file" className="hidden" placeholder="attach files" title="attaching files" />
                 </label>
                <Button primary onClick={postFeedback} >Create post</Button>
            </div>
          </form>
          
        </Popup>

    </>)
}