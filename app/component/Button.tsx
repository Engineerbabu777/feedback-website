
import React from 'react';


type Props ={
    children: React.ReactNode;
    onClick?: () => void;
    primary?: boolean;
}


export default function Button({children,onClick,primary}:Props) {


    return(<button title={'dummy'} type="button"  onClick={onClick}
            className={" py-1 px-2 rounded-md text-opacity-90 " +(primary? "bg-blue-500 text-white":"text-gray-600")}
            >{children}</button>
    );


}