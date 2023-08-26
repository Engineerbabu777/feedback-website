
import Link from 'next/link';

type Props = {
   openItem: () => void;
}

export default function FeedbackItem({openItem}:Props) {


    return(<>
    
        <Link href="" onClick={(e) => {e.preventDefault();openItem()}} className="flex gap-8 items-center my-8">
            <div className="">
                <h2 className="font-bold">Please, post more videos</h2>
                <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </div>
            <div className="" >
                <button type="button"  className="text-gray-400 text-sm items-center shadow-sm shadow-gray-200 border rounded-md py-1 px-1 flex gap-1">
                    <span className="triangle"></span>80
                </button>
            </div>
        </Link>

    
    </>)
}