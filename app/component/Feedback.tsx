
import Link from 'next/link';

export interface feedback {
    title: string;
    description: string;
    votes: number;
}


type Props = {
    openItem: () => void;
    feed: feedback;
}

export default function FeedbackItem({ openItem, feed }: Props) {


    return (<>

        <Link href="" onClick={(e) => { e.preventDefault(); openItem() }} className="flex gap-8 items-center my-8">
            <div className="">
                <h2 className="font-bold">{feed?.title}</h2>
                <p className="text-gray-600 text-sm">{feed?.description}</p>
            </div>
            <div className="" >
                <button type="button" className="text-gray-400 text-sm items-center shadow-sm shadow-gray-200 border rounded-md py-1 px-1 flex gap-1">
                    <span className="triangle"></span>{feed?.votes}
                </button>
            </div>
        </Link>


    </>)
}