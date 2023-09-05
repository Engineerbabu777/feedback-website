



type Props = {
 url?: string | null;
}

export default function Avator({url}:Props) {


    return(<>

    <div className="rounded-full overflow-hidden bg-blue-300 w-12 h-12">
       {url && <img src={url} alt="text" /> }
    </div>
    
    
    </>)
}