
import React from 'react';





type Props ={
    children: React.ReactNode;
    onClick?: () => void | any;
    primary?: boolean;
    disabled?: boolean;
}


export default function Button({children, onClick, primary, disabled}:Props) {


    return(<button title={'dummy'} disabled={disabled} type="button"  onClick={onClick}
            className={"flex items-center gap-2 py-1 px-2 rounded-md text-opacity-90 " +(primary? "bg-blue-500 text-white":"text-gray-600") + (disabled ? ' text-opacity-50 bg-opacity-50 cursor-not-allowed': ' ')}
            >{children}</button>
    );


}