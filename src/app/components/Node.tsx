import {useState} from "react";


export default function Node(props: {DataValue: any}) {




    return (
        <div
            id={props.DataValue}
            className="w-20 h-20 absolute flex items-center justify-center overflow-hidden bg-blue-50 rounded-full border-2 border-black hover:border-4 hover:border-gray-500"

        >{props.DataValue}</div>
    )
}

