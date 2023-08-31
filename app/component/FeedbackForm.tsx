
import Button from './Button';
import Popup from './Popup';
import {useState} from 'react';
import axios from 'axios';
import {supabase_Storage} from '../utils/supabase/storage';
import {AiFillDelete} from 'react-icons/ai';

type Props = {
    close: () => void;
}

export default function FeedbackForm({ close }: Props) {

    const [suggestion , setSuggestion] = useState<{title:string,description:string}>({
        title: '',
        description:'',
    });

    const [images ,setImages] = useState<any>([]);
    const [uploading , setUploading] = useState(false);

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
      if(!files.length) return;
      setUploading(true);

      const data = await supabase_Storage(files);
      //  const upload = await axios.post('/api/upload',data);
      setUploading(false);
       setImages([...images , ...data]);

     }

    // REMOVE ITEM FROM ARRAY!
    const deleteAttachment = (e:any,val:string) => {
      e.preventDefault();
      setImages([...images.filter((v:any,i:any) => v !== val)]);
    }

    return (<>
       
       <Popup close={close} title={'Make a Suggestion'} > 

         <form className="p-8">
            <label className="block mt-4 mb-1 text-slate-700">Title</label>
            <input value={suggestion.title} onChange={handler} name="title" className="w-full border rounded-md p-2" type="text" placeholder="A short descriptive , title" />
            <label className="block mt-4 mb-1 text-slate-700">Details</label>
            <textarea value={suggestion.description} onChange={handler} name="description" className="w-full border resize-none rounded-md p-2" placeholder="Please includes any details" />
           
           {/* DISPLAYING IMAGES! */}
           
            <section className="flex flex-wrap gap-4">
             {(images?.length>0) && images.map((link:string,ind:number)=>(<div key={ind} className=" relative w-20 h-24 border p-1  rounded-md border-blue-300 border-dashed">
              <div onClick={(e:any) => deleteAttachment(e,link)} className="absolute -top-1 -right-1 bg-red-300 bg-opacity-50 cursor-pointer text-red-600  h-5 w-5 flex items-center justify-center rounded-full hover:w-7 hover:h-7 transition-all ease-in-out duration-300"><AiFillDelete /></div>
               {(['jpeg','jfif','jpg','png','gif','webp'].includes(link.split('.')[3])) ? (<><img className="w-full h-full" src={link} alt="text"/></>):(<a href={link} target={"_blank"} className="text-blue-400 ">visit</a>)}
             </div>))}
            </section>

            <div className="flex gap-2 mt-2 justify-end">
                 <label className="py-2 px-4 text-gray-600 cursor-pointer">
                   <span >{uploading ? 'uploading' : 'Attach Files'}</span> 
                   <input multiple onChange={handleAttachFiles} type="file" className="hidden" placeholder="attach files" title="attaching files" />
                 </label>
                <Button primary onClick={postFeedback} >Create post</Button>
            </div>
          </form>
          
        </Popup>

    </>)
}