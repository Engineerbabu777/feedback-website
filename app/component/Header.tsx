

import {useSession,signOut,signIn} from 'next-auth/react';
import Button from './Button';


export default function Header({}) {


    const {data:session} = useSession();



    return(<>
             <div className="bg-gradient-to-r from-[#2190FA] to-blue-300 px-2 md:shadow-md shdaow-gray-300 md:border rounded-md md:max-w-2xl h-10 mt-2 mx-auto">
                {session?.user?.email ? (<>
                    <div className="flex justify-end items-center gap-4 h-full">
                        <span>Hello, <span className="text-lg font-semibold">{session?.user?.name}</span></span>
                        <button onClick={async() => await signOut()} className="flex gap-2 text-white bg-red-400 px-2 py-1 rounded-md "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>Logout</button>
                    </div>
                </>) : (<>
                    <div className="flex justify-end items-center gap-4 h-full ">
                       <p className="text-red-700">sign-in required!</p>
                       <Button primary onClick={async() => signIn('google')}>Sign in</Button>
                    </div>
                </>)}
            </div>
 
    </>)
}