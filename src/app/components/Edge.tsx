function Edge(props: {x1: any, x2: any, y1: any, y2: any}) {

    return(
        <div >
            <svg id="Edge" style={{
                position:"absolute",
                height: "100%",
                width: "100%",
                zIndex: '-1'
            }}>
                <line x1={props.x1} x2={props.x2} y1={props.y1} y2={props.y2} stroke="black" strokeWidth={"4"}/>
            </svg>
        </div>
    )
}


export default Edge;