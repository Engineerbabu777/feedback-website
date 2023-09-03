
import Button from './Button';
import {useState} from 'react';
import Avator from './Avator';
import { supabase_Storage } from '../utils/supabase/storage';
import {ClipLoader} from 'react-spinners';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import {useSession} from 'next-auth/react';

export default function FeedbackPopupComments({}) {


    const [comment , setComment] = useState<string>(''); 
    const [images, setImages] = useState < any > ([]);
    const [uploading, setUploading] = useState < boolean > (false);
    const {data:session} = useSession();

    // ATTACH FILES FUNCTION !!
  const handleAttachFiles = async (e: any) => {
    e.preventDefault();

    const files = [...e.target.files]; // GETTING FILES PROPERTY FROM EVENT HANDLER !!
    if (!files.length) return;
    setUploading(true);

    const data = await supabase_Storage(files);
    //  const upload = await axios.post('/api/upload',data);
    setUploading(false);
    setImages([...images, ...data]);

  }

  // REMOVE ITEM FROM ARRAY!
  const deleteAttachment = (e: any, val: string) => {
    e.preventDefault();
    setImages([...images.filter((v: any, i: any) => v !== val)]);
  }

  // FUNCTION TO SAVE COMMENTS ON FEEDBACK !!
  const uploadNewComment = async(e) => {
     e.preventDefault();
     axios.post('/api/comment',{comment , images , userId:session?.user?.id})
     .then((res:any) => console.log(res)).catch((err:any) => console.log(err));
  }


    return(<>
      {/* PARENT! */}
       <div className="p-8">
        <div className="flex gap-4 mb-8">
            <span className=""><Avator /></span>
            <div className="">
             <p className="text-gray-600">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.
             </p>
             <div className="text-gray-400 mt-2 text-sm">Anonymous &middot; a few seconds ago</div>
            </div>
        </div>

        <form className="">
            <textarea className="border rounded-md w-full p-2" placeholder="Let us know what do you think ..." 
             value={comment} onChange={(e) => setComment(e.target.value)} />

             {/* ATTACHED IMAGES !!! */}
             <section className="flex flex-wrap gap-4">
               {(images?.length > 0) && images.map((link: string, ind: number) => (<div key={ind} className=" relative w-20 h-24 border p-1  rounded-md border-blue-300 border-dashed">
                <div onClick={(e: any) => deleteAttachment(e, link)} className="absolute -top-1 -right-1 bg-red-300 bg-opacity-50 cursor-pointer text-red-600  h-5 w-5 flex items-center justify-center rounded-full hover:w-7 hover:h-7 transition-all ease-in-out duration-300"><AiFillDelete /></div>
               {(['jpeg', 'jfif', 'jpg', 'png', 'gif', 'webp'].includes(link.split('.')[3])) ? (<><img className="w-full h-full" src={link} alt="text" /></>) : (<a href={link} target={"_blank"} className="text-blue-400 ">visit</a>)}
               </div>))}
             </section>


            <div  className="flex justify-end mt-2 gap-2">
              <label className=" text-gray-600 cursor-pointer">
               <span className={"flex items-center gap-2 py-1 px-2 rounded-md " + (uploading ? ' bg-green-400 text-white ' : ' ')} >{uploading ? (<><ClipLoader size={16} color={'white'} />waiting</>) : 'Attach Files'}</span>
               <input multiple onChange={handleAttachFiles} type="file" className="hidden" placeholder="attach files" title="attaching files" />
              </label>
              <Button primary disabled={!comment} onClick={() => {uploadNewComment}}>Comment</Button>
            </div>
        </form>

       </div>
    
    
        </>)
}