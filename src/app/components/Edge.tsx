import {Simulate} from "react-dom/test-utils";
import abort = Simulate.abort;


function Edge(props: {x: any, y: any}) {
    return(
        <div className="border-2 border-black"
             style={{
                 position: "absolute",
                 top: props.y,
                 left: props.x
             }}></div>
    )
}


export default Edge;