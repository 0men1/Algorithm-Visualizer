"use client"

import Node from "./components/Node"
import Edge from "./components/Edge"
import Graph from "@/scripts/Graph"
import GraphNode from "@/scripts/GraphNode";
import React, {useRef, useState, useEffect} from "react";
import Draggable from 'react-draggable'
import getRandNodePosition from '@/utility/utility'
import graphNode from "@/scripts/GraphNode";


export default function Home() {

    // FOR NODE MANIPULATION
    const [nodeCount, setNodeCount] = useState(0);
    const [edgeCount, setEdgeCount] = useState(0);
    const [myGraph, setMyGraph] = useState(new Graph()); // Store the graph in the state
    const [nodePosition, setNodePosition] = useState<{[index: string]: {x: number, y: number}}>({});
    const [instructionText, setInstructionText] = useState("");


    // FOR ALGORITHMS
    const [DFS_, setDFS] = useState(false);
    const [BFS_, setBFS] = useState(false);
    const [Dijkstra_, setDijkstra] = useState(false);
    const visitedRef = useRef(new Array(myGraph.numNodes).fill(false));
    const [visitedState, setVisitedState] = useState<boolean[]>(new Array(myGraph.numNodes).fill(false))
    const algorithms = ["BFS", "DFS", "Dijkstra"]


    /* FOR EDGE MANIPULATION */const [edgeMode, setEdgeMode] = useState(false);const [selectedNodes, setSelectedNodes] = useState<any[]>([]);


    /**
     * Adds nodes to myGraph which is created as a state above. First maps every node from the old graph to new graph and then adds the new node.
     */
    function handleAddingNodes() {
        const newNodePos = {[nodeCount]: getRandNodePosition()}
        const newNode = new GraphNode(nodeCount);
        myGraph.addNode(newNode); // Add the new node

        setNodePosition({...nodePosition, ...newNodePos})
        setMyGraph(myGraph); // Update the state with the new graph
        setNodeCount(nodeCount + 1); // Increment the node count
    }


    async function DFS(start: graphNode) {

        const visited = visitedRef.current;
        visited[start.data] = true;


        setVisitedState([...visited])

        await new Promise(resolve => setTimeout(resolve, 1000))

        for (const vertex of myGraph.graph[start.data].neighbors) {
            if (!visited[vertex.data]) {
                await DFS(vertex);
            }
        }
    }

    function resetVisited() {
        const resetArray = new Array(myGraph.numNodes).fill(false);
        visitedRef.current = resetArray;
        setVisitedState(resetArray);
    }
    function handleAlgo(event: any) {
        event.preventDefault();

        if (event.target.value == "DFS") {
            DFS(myGraph.graph[0]).then(r => {
                console.log("RESET ARRAY");
                resetVisited();
            })
        }
    }

    useEffect(() => {
        console.log(visitedRef)
    }, [visitedRef]);


    /**
     * Removes nodes form myGraph which is created as a state. First maps every node in the old graph to a new graph except for the node to be removed.
     */
    function handleRemovingNodes() {
        if (nodeCount > 0) {
            const removed_node = myGraph.removeNode();
            delete nodePosition[removed_node?.data];

            setMyGraph(myGraph);
            setNodeCount(myGraph.numNodes); // Decrement the node count
            setNodePosition(nodePosition)
        }
    }


    /**
     * Sets the node positions as they are being dragged.
     * @param e
     * @param data
     * @param nodeID
     */
    // TODO: Do not let it escape the vertex box
    function onDragNode(e: any, data: any, nodeID: any) {
        setNodePosition(prevNodes => ({
            ...prevNodes,
            [nodeID]: {x: data.x, y: data.y}
        }))
    }

    /**
     * Given 2 values of nodes (The dataValue inside the node) Find the positions of the nodes and connect them with an edge
     * @param node1
     * @param node2
     */
    function printEdge(node1: any, node2: any) {
        if ((nodePosition[node1] == undefined || nodePosition[node2] == undefined)
            ||  (myGraph.graph[node1] == null || myGraph.graph[node2] == null)) {
            return;
        }
        return <Edge key={`${node1}${node2}`} x1={nodePosition[node1]?.x+40} x2={nodePosition[node2]?.x+40} y1={nodePosition[node1]?.y+40} y2={nodePosition[node2]?.y+40}/>
    }


    /**
     * Toggles setEdgeMode so the user can know that they did, and then they can start adding edges between pairs of nodes
     */
    function toggleEdgeMode() {
        setEdgeMode(!edgeMode);
    }





    /**
     * Every time a node is selected while edgeMode is true, it will be stored inside selectedNodes. Once selectedNodes has 2 nodes inside of it, it will add an edge connecting them.
     * @param nodeID
     */
    function selectNode(nodeID: any) {
        if (edgeMode) {
            let newSelection: any = [...selectedNodes, nodeID]
            setInstructionText("Edge Mode Activated: Please select two nodes to connect.");

            // Once two nodes are selected by user
            if (newSelection.length === 2) {
                if (myGraph.checkNeighbors(myGraph.graph[newSelection[0]], myGraph.graph[newSelection[1]])){
                    setInstructionText("They are already connected")
                    newSelection = [];
                    setSelectedNodes(newSelection);
                    return;
                }
                createEdge(newSelection[0], newSelection[1])

                newSelection = [];
            }
            setSelectedNodes(newSelection);
        }
    }



    function createEdge(node1: any, node2: any) {
        myGraph.addEdge(myGraph.graph[node1], myGraph.graph[node2])
        setEdgeCount(edgeCount+1);
    }


    /**
     * UseEffect to actively update edgeMode whenever there is a change to it because react states are stupid and weird
     */
    useEffect(() => {
        if (edgeMode) {
            setSelectedNodes([]);
            setInstructionText("Edge Mode Activated: Please select two nodes to connect.");
        } else {
            setInstructionText("")
        }
    }, [edgeMode]);



    return (
        <main className="mainscreen min-h-screen">
            {instructionText == "" ? <div></div> :
                <div className={`w-full flex bg-white p-4 border-2 border-black justify-center items-center`}>
                    {instructionText}
                </div>
            }
            {<div className={`toolbar bg-white p-10 flex gap-8 items-center justify-center`}>

                {
                    <div className="flex-col justify-center items-center ">
                        <form className={"flex-col"} onSubmit={handleAlgo}>
                            <h4>Choose an algorithm:</h4>
                            <select name="Algos" onChange={handleAlgo} id={"Algos"}>
                                <option>Choose one dawg</option>
                                {algorithms.map((algos) => {
                                    return (
                                        <option value={algos} key={algos}>{algos}</option>
                                    )
                                })}
                            </select>
                            <button type={"submit"} className={"px-4 py-2 bg-gray-500 rounded-md"}>Go</button>
                        </form>
                    </div>
                }

                <div className="managing-nodes flex flex-col gap-4 items-center justify-center">
                    <div className="flex flex-row gap-4">
                        <button onClick={handleAddingNodes} className="px-4 py-2 bg-gray-500 rounded-md">+</button>
                        <button onClick={handleRemovingNodes} className="px-4 py-2 bg-gray-500 rounded-md">-</button>
                        <button onClick={toggleEdgeMode} className="px-4 py-2 bg-gray-500 rounded-md"> ⇄</button>
                    </div>
                    <div className="flex gap-4">
                        <h3># of Nodes: {myGraph.getNodeCount()}</h3>
                        <h3>|</h3>
                        <h3># of Edges: {myGraph.getEdgeCount()}</h3>
                    </div>
                </div>
            </div>}


            <div className="node-field flex min-w-screen " id={"node-field"}>
                {myGraph.graph.map((key) => {
                    return (
                        <Draggable
                            onDrag={(e, data) => {
                                onDragNode(e, data, key.data)
                            }}
                            bounds={'body'}
                            key={key.data}
                            defaultPosition={nodePosition[key.data]}>

                            <div onClick={() => {
                                if (edgeMode) selectNode(key.data)
                            }}>
                                <Node color={visitedState[key.data] ? "red": "green"} DataValue={key.data}/>
                            </div>
                        </Draggable>
                    )
                })}


                {
                    myGraph.graph.map((key) =>
                        //@ts-ignore
                        [...key.neighbors].map((node_) => {
                            return (printEdge(key.data, node_.data))
                        })
                    )
                }
        </div>

</main>
)
}


//TODO:
/**
 * Implement DFS algorithm
 *
 * Make a separate component for each algorithm? How would I change the state of each node though?
 *
 * Make component (Call it DFS)
 * Pass in the graph.
 * In those components have their used data structures (queues, stacks, array) whatever
 * Wait 2 sec every time a node is referenced and it make it a nice color
 * When an algorithm starts, change the colors of all nodes to
 * yellow (not visited)
 * green (visited)
 * red (failed to visit)
 */
