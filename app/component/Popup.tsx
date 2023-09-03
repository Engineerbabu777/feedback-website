




type Props = {
    close: () => void;
    children?: React.ReactNode;
    title?: string;
    narrow?: boolean;
}

export default function Popup({ close,children, title , narrow }: Props) {



    return (<>

        {/* MAIN!! */}
        <div className="fixed bg-white md:bg-black inset-0 md:bg-opacity-80 flex md:items-center " onClick={close}>

            {/* CLOSE CROSS! */}
            <button title={'dummy'} className="fixed hidden md:block top-4 right-4 text-white" onClick={close} type="button" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="w-full">
                <div className={(narrow ? 'md:max-w-sm' :'md:max-w-2xl')+" bg-white   md:rounded-md md:mx-auto overflow-hidden"} 
                onClick={(e:any) => e.stopPropagation()}>

                    {/* HEADER FOR MODAL!! */}
                    <div className="relative min-h-[40px] md:min-h-0 ">
                        <button title={'dummy'} onClick={close} type="button" className=" md:hidden fixed top-4 left-8 text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" /></svg></button>
                        {!!title && <h2 className="py-4 text-center border-b">{title}</h2>}
                    </div>

                    <>{children}</>

                </div>
            </div>
        </div>


    </>)
}