
import Button from './Button';


type Props = {
   close: () => void;
}

export default function FeedbackForm({close}:Props) {


    return(<>
    {/* MAIN!! */}
     <div className="fixed bg-white md:bg-black inset-0 md:bg-opacity-80 flex md:items-center ">

        {/* CLOSE CROSS! */}
         <button title={'dummy'} className="fixed hidden md:block top-4 right-4 text-white" onClick={close} type="button" >   
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
         </button>

        <div className="w-full">
          <div className="bg-white md:max-w-2xl md:rounded-md md:mx-auto overflow-hidden">
            
            {/* HEADER FOR MODAL!! */}
               <div className="relative">
                 <button title={'dummy'} onClick={close} type="button" className="md:hidden fixed top-4 left-8 text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" /></svg></button>
                 <h2 className="py-4 text-center border-b">Make a Suggestion</h2>
               </div>

            
            <form className="p-8">
                <label className="block mt-4 mb-1 text-slate-700">Title</label>
                <input className="w-full border rounded-md p-2" type="text" placeholder="A short descriptive , title" />
                <label className="block mt-4 mb-1 text-slate-700">Details</label>
                <textarea className="w-full border resize-none rounded-md p-2" placeholder="Please includes any details"  />
                <div className="flex gap-2 mt-2 justify-end">
                <Button>Attach files</Button>
                <Button primary >Create post</Button>
                </div>

            </form>

          </div>
        </div>
     </div>
    </>)
}