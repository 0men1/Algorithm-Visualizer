"use client"

import Node from "./components/Node"
import Edge from "./components/Edge"
import Graph from "@/scripts/Graph"
import GraphNode from "@/scripts/GraphNode";
import React, {useState, useEffect} from "react";
import Draggable from 'react-draggable'

export default function Home() {
    // IGNORE
    const nodeRef = React.useRef(null);


    const [nodeCount, setNodeCount] = useState(0);
    const [edgeCount, setEdgeCount] = useState(0);
    const [myGraph, setMyGraph] = useState(new Graph()); // Store the graph in the state
    const [nodePosition, setNodePosition] = useState<{[index: string]: {x: number, y: number}}>({});
    const [instructionText, setInstructionText] = useState("");



    // FOR EDGE ADDITION
    const [edgeMode, setEdgeMode] = useState(false);
    const [selectedNodes, setSelectedNodes] = useState<any[]>([]);

    /**
     * Adds nodes to myGraph which is created as a state above. First maps every node from the old graph to new graph and then adds the new node.
     */
    function handleAddingNodes() {
        const newGraph = new Graph();
        // Copy the existing nodes to the new graph (or implement a method in your Graph class to handle this)
        myGraph.graph.forEach(( key) => newGraph.addNode(key));

        newGraph.numEdges = myGraph.numEdges;

        const newNode = new GraphNode(nodeCount);
        newGraph.addNode(newNode); // Add the new node
        setMyGraph(newGraph); // Update the state with the new graph
        setNodeCount(nodeCount + 1); // Increment the node count
    }


    /**
     * Removes nodes form myGraph which is created as a state. First maps every node in the old graph to a new graph except for the node to be removed.
     */
    function handleRemovingNodes() {
        if (nodeCount > 0) {
            const newGraph = new Graph();
            // Copy the existing nodes to the new graph (or implement a method in your Graph class to handle this)
            myGraph.graph.map(( key) => newGraph.addNode(key));

            newGraph.numEdges = myGraph.numEdges;

            newGraph.removeNode();
            setMyGraph(newGraph)
            setNodeCount(nodeCount - 1); // Decrement the node count
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
     * Get a random x,y coordinates scaled off of the size of the window
     */
    function getRandNodePosition() {
        const maxWidth = window.innerWidth - 150;
        const maxHeight = window.innerHeight - 400;
        const x = Math.random() * maxWidth;
        const y = Math.random() * maxHeight;
        return {x,y}
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
        return <Edge key={`${node1}-${node2}`} x1={nodePosition[node1]?.x+40} x2={nodePosition[node2]?.x+40} y1={nodePosition[node1]?.y+40} y2={nodePosition[node2]?.y+40}/>
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


    /**
     * UseEffect to actively spawn new nodes and give them their random x,y positions that are inside the window.
     */
    useEffect(() => {
        // const newNodeId = Object.keys(nodePosition).length
        const newNodeId = myGraph.graph.length;
        const newNode = {[newNodeId]: getRandNodePosition()}
        setNodePosition({...nodePosition, ...newNode})

    }, [myGraph.graph]);


    return (
        <main className="mainscreen min-h-screen">
            {instructionText == "" ? <div></div> :
                <div className={`w-full flex bg-white p-4 border-2 border-black justify-center items-center`}>
                    {instructionText}
                </div>
            }
            {<div className={`toolbar bg-white p-10 flex gap-8 items-center justify-center`}>
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
                            nodeRef={nodeRef}
                            key={key.data}
                            defaultPosition={nodePosition[key.data]}>

                            <div onClick={() => {
                                if (edgeMode) selectNode(key.data)
                            }} ref={nodeRef}>
                                <Node DataValue={key.data}/>
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
 * 1. When deleting a node the edges stay printed, and it causes an error because the node is removed but the edges are still drawn so the data is messed up
 * 2. Issues with the edge count. It draws 2 edges per 1 connection
 * 3. Figure out how to do unit/integration testing.
 */