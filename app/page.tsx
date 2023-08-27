'use client';
import Image from 'next/image'
import FeedbackItem from './component/Feedback';
import {useState} from 'react';
import FeedbackForm from './component/FeedbackForm';
import Button from './component/Button';
import FeedbackItemPopup from './component/FeedbackItemPopup';
import {feedback} from './component/Feedback';



export default function Home() {

  const [showPopup , setShowPopup] = useState<boolean>(false);
  const [showItem , setShowItem] = useState<feedback | null>(null);

  // FUNCTION TO SHOW FORM POPUP!!
  const showFeedbackPopup = () => {
    setShowPopup(showPopup ? false : true);
  }

  // FUNCTION TO SHOW FEEDBACK ITEM!!
  const showFeedbackItem = (id:feedback|null) => {
    setShowItem(id);
  }

  // FEEDBACK ARRAY!!
  const feedbacks = [{title:'Please, post more videos',description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s,',votes:97},{title:'Please, post more videos',description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s,',votes:81},{title:'Please, post more videos',description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s,',votes:78},{title:'Please, post more videos',description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s,',votes:50},{title:'Please, post more videos',description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s,',votes:41}]


  return (<>
       {/* MAIN-CONTAINER!! */}
        <main className="bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded-md md:mt-8 overflow-hidden" >
          
          {/* HEADER!! */}
           <header className="bg-gradient-to-r from-cyan-400 to-blue-400 p-8 " >
              <h2 className="font-bold text-xl" >Babu&apos;s World</h2>
              <p className="text-opacity-90 text-slate-700" >Help me , about my Builds , to make them more Attractive & Featureful 😊🎉</p>
           </header>
          
          {/* FUNCTIONS-MAIN!!  */}
           <section className="flex bg-gray-100 px-8 py-4 border-b" >
            <div className="grow"></div>
            <div className="">
              <Button onClick={showFeedbackPopup} primary >Make a suggestion</Button>
            </div>
           </section>

          {/* MAIN-SECTIONS-SHOW!! */}
          <section className="px-8 ">
            { feedbacks?.length > 0 && feedbacks.map((feed,ind) => (
              <FeedbackItem openItem={() => showFeedbackItem(feed)} key={ind} feed={feed} />
            ))

            }
          </section>

          {/* POPUP MODAL! */}
          {showPopup && (<><FeedbackForm close={showFeedbackPopup} /></>)}

          {/* SHOW FEEDBACK MODAL! */}
          {showItem && (<><FeedbackItemPopup feedback={showItem} close={() => showFeedbackItem(null)} /></>)}

        </main>
  </>)
}
