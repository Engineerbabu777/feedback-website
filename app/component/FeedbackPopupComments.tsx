
import Button from './Button';
import {useState} from 'react';
import Avator from './Avator';

export default function FeedbackPopupComments({}) {


    const [comment , setComment] = useState<string>(''); 


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
            <div  className="flex justify-end mt-2 gap-2">
                <Button>Attach Files</Button>
                <Button primary disabled={!comment}>Comment</Button>
            </div>
        </form>

       </div>
    
    
        </>)
}