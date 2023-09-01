import Popup from "./Popup";
import {feedback} from './Feedback';
import Button from './Button';
import FeedbackPopupComments from './FeedbackPopupComments';

type Props = {
    feedback: any;
    close: () => void;
}

export default function FeedbackItemPopup({ feedback, close }: Props) {



    return (<>

        <Popup title={""} close={close} >

            {/* MAIN! */}
             <div className="">
              
                <div className="p-8 pb-2">
                <h2 className="text-lg font-bold mb-2">{feedback?.title}</h2>
                <p className="text-gray-600">{feedback?.description}</p>
                </div>

                <div className="flex justify-end border-b px-8 py-2 text-white">
                    <Button primary>
                         <span className="triangle"></span>
                         <span>Votes {feedback?.votes}</span>
                    </Button>
                </div>

                <FeedbackPopupComments />

             </div>
            
        </Popup>



    </>)
}