import React from 'react'
interface LoaderProp {
    size: string
}
const Loading: React.FC<LoaderProp> = ({ size }) => {

    return (
        <div className="flex justify-center items-center p-8 w-full">
            <div className={`loading loading-spinner text-success ${size} `}></div>

        </div >
    );

}

export default Loading