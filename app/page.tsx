'use client';
import Image from 'next/image'
import FeedbackItem from './component/Feedback';
import {useState,useEffect} from 'react';
import FeedbackForm from './component/FeedbackForm';
import Button from './component/Button';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import Header from './component/Header';
import Popup from './component/Popup';


export default function Home() {

  const {data:session,status:sessionStatus} = useSession();

  const [showPopup , setShowPopup] = useState<boolean>(false);
  const [showItem , setShowItem] = useState<any>(null);
  const [feedbacks, setFeedbacks] = useState<[string]|[]>([]);
  const [showLogin , setShowLogin] = useState<boolean>(false);

  console.log(session?.user);
  

  const getData = async () => {
    axios.get('/api/feedback').then((res:any)=> {setFeedbacks(res.data.feedbacks);console.log(res.data)});
  }

  useEffect(() => {
    getData();
  },[]);

  // FUNCTION TO SHOW FORM POPUP!!
  const showFeedbackPopup = () => {
    setShowPopup(showPopup ? false : true);
  }


  const loginToGiveFeedback = () => {
     setShowLogin(!showLogin);
  }


  if(sessionStatus === 'loading'){
    return 'loading session';
  }

  return (<>

        {/* HEADER !! */}
         <Header />
         
       {/* MAIN-CONTAINER!! */}
        <main className="bg-white md:max-w-2xl mx-auto md:shadow-lg md:rounded-md md:mt-8 overflow-hidden" >
          
          {/* HEADER!! */}
           <header className="bg-gradient-to-r from-cyan-400 to-blue-400 p-8 " >
              <h2 className="font-bold text-xl" >Babu&apos;s World </h2>
              <p className="text-opacity-90 text-slate-700" >Help me , about my Builds , to make them more Attractive & Featureful 😊🎉</p>
           </header>
          
          {/* FUNCTIONS-MAIN!!  */}
           <section className="flex bg-gray-100 px-8 py-4 border-b" >
            <div className="grow"></div>
            <div className="">
              <Button 
                onClick={ session?.user?.email ? showFeedbackPopup : loginToGiveFeedback} 
                primary >Make a suggestion</Button>
            </div>
           </section>

          {/* MAIN-SECTIONS-SHOW!! */}
          <section className="px-8 ">
            { feedbacks?.length > 0 && feedbacks.map((feed,ind) => (
              <FeedbackItem  key={ind} feed={feed} />
            ))

            }
          </section>

          {/* POPUP MODAL! */}
          {showPopup && (<><FeedbackForm close={showFeedbackPopup} /></>)}

          {showLogin && (<Popup title={'Login to make Suggestion'} close={() => setShowLogin(false)}></Popup>)}

          {/* SHOW FEEDBACK MODAL! */}
          {/* {showItem && (<><FeedbackItemPopup feedback={showItem} close={() => showFeedbackItem(null)} /></>)} */}

        </main>
  </>)
}

