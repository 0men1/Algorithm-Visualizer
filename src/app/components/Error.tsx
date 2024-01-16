


function Error(props: {errorMessage: string}) {
    return (
        <div className="min-w-64 min-h-64 ">
            <h2>{props.errorMessage}</h2>
        </div>
    )
}


export default Error;