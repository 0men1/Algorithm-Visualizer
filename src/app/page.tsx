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


    // Handle node positions
    function onDragNode(e: any, data: any, nodeID: any) {
        setNodePosition(prevNodes => ({
            ...prevNodes,
            [nodeID]: {x: data.x, y: data.y}
        }))
    }

    function getRandNodePosition() {
        const maxWidth = window.innerWidth - 150;
        const maxHeight = window.innerHeight - 400;
        const x = Math.random() * maxWidth;
        const y = Math.random() * maxHeight;
        return {x,y}
    }


    // ----------------------------------------------------------------Edge Handle --------------------------------------
    function printEdge(node1: any, node2: any) {
        if (nodePosition[node1] == undefined || nodePosition[node2] == undefined) {
            return;
        }
        if (myGraph.graph[node1] == null || myGraph.graph[node2] == null) {
            return;
        }
        return <Edge key={`${node1}-${node2}`} x1={nodePosition[node1]?.x+40} x2={nodePosition[node2]?.x+40} y1={nodePosition[node1]?.y+40} y2={nodePosition[node2]?.y+40}/>
    }


    // Edge button is pressed
    function toggleEdgeMode() {
        setEdgeMode(!edgeMode);
        setSelectedNodes([]);
        if (!edgeMode) {
            // Add instructions for the user here
            setInstructionText("Edge Mode Activated: Please select two nodes to connect.");
        } else {
            setInstructionText("")
        }
    }

    function selectedNode(nodeID: any) {
        if (edgeMode) {
            const newSelection: any[] = [...selectedNodes];
            if (newSelection.length < 2) {
                newSelection.push(nodeID);

                if (newSelection.length === 2) {
                    // Add edge between newSelection[0] and newSelection[1]
                    myGraph.addEdge(myGraph.graph[newSelection[0]], myGraph.graph[newSelection[1]]);
                    setEdgeCount(edgeCount + 1);
                    setEdgeMode(false); // Exit edge mode after adding an edge
                    setInstructionText("")
                    console.log("Added edges and then set edge mode to off");
                }

                setSelectedNodes(newSelection);
                console.log("Returning newSelected");
            }
        }
    }

    useEffect(() => {
        // const newNodeId = Object.keys(nodePosition).length
        const newNodeId = myGraph.graph.length;
        const newNode = {[newNodeId]: getRandNodePosition()}
        setNodePosition({...nodePosition, ...newNode})

    }, [myGraph.graph]);


  return (
      <main className="mainscreen min-h-screen">
          {instructionText == ""? <div></div>:
              <div className={`w-full flex bg-white p-4 border-2 border-black justify-center items-center`}>
                  {instructionText}
              </div>}
          {<div className={`toolbar bg-white p-10 flex gap-8 items-center justify-center`}>
              <div className="managing-nodes flex flex-col gap-4 items-center justify-center">
                  <div className="flex flex-row gap-4">
                      <button onClick={handleAddingNodes} className="px-4 py-2 bg-gray-500 rounded-md">+</button>
                      <button onClick={handleRemovingNodes} className="px-4 py-2 bg-gray-500 rounded-md">-</button>
                      <button onClick={toggleEdgeMode} className="px-4 py-2 bg-gray-500 rounded-md"> ⇄ </button>
                  </div>
                  <div className="flex gap-4">
                      <h3># of Nodes: {myGraph.getNodeCount()}</h3>
                      <h3>|</h3>
                      <h3># of Edges: {myGraph.getEdgeCount()}</h3>
                  </div>
              </div>
          </div>}


          <div className="node-field flex min-w-screen " id={"node-field"} >
              {myGraph.graph.map((key) => {
                  return (
                      <Draggable
                          onDrag={(e, data) => {onDragNode(e, data, key.data)}}
                          bounds={'body'}
                          nodeRef={nodeRef}
                          key={key.data}
                          defaultPosition={nodePosition[key.data]}>

                          <div onClick={() => {if (edgeMode) selectedNode(key.data)}} ref={nodeRef}>
                              <Node  DataValue={key.data}/>
                          </div>
                      </Draggable>
                  )
              })}

              {
                  myGraph.graph.map((key) =>
                    key.neighbors.map((node_) => {
                         return(printEdge(key.data, node_.data))
                    })
                  )
              }
          </div>

      </main>
  )
}