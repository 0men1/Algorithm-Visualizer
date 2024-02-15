export default function Node(props: { color: string, DataValue: any }) {
    const bgColorClass = () => {
        switch (props.color) {
            case 'red': return 'bg-red-300';
            case 'green': return 'bg-green-300';
            default: return 'bg-green-50'; // Default color
        }
    };

    return (
        <div
            id={props.DataValue}
            className={`${bgColorClass()} w-20 h-20 absolute flex items-center justify-center overflow-hidden rounded-full border-2 border-black hover:border-4 hover:border-gray-500`}
        >
            {props.DataValue}
        </div>
    );
}
