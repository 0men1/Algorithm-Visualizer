"use client"

import Node from "./components/Node"
import Graph from "../scripts/Graph"
import React, {useState, useEffect} from "react";
import Draggable from 'react-draggable'
import {getRandNodePosition} from "@/utility/utility";



export default function Home() {
    // IGNORE
    const nodeRef = React.useRef(null);


    const [nodeCount, setNodeCount] = useState(0);
    const [myGraph, setMyGraph] = useState(new Graph()); // Store the graph in the state
    const [nodePosition, setNodePosition] = useState({});


    function handleAddingNodes() {
        const newGraph = new Graph();
        // Copy the existing nodes to the new graph (or implement a method in your Graph class to handle this)
        myGraph.graph.forEach(( key) => newGraph.addNode(key.data));

        newGraph.addNode(nodeCount); // Add the new node
        setMyGraph(newGraph); // Update the state with the new graph
        setNodeCount(nodeCount + 1); // Increment the node count
    }


    function handleRemovingNodes(){
        if (nodeCount > 0) {
            const newGraph = new Graph();
            // Copy the existing nodes to the new graph (or implement a method in your Graph class to handle this)
            myGraph.graph.map(( key) => newGraph.addNode(key.data));

            newGraph.removeNode();
            setNodeCount(nodeCount - 1); // Decrement the node count
        }
    }

    function connectNodes(node1: any, node2: any) {
        if (node1 == '' || node2 == '') {
            console.log("user has not picked the nodes to connect")
        }
        myGraph.addEdge(node1, node2);
    }

    useEffect(() => {
        let initialPositions = {};
        myGraph.graph.forEach((node) => {
            // @ts-ignore
            initialPositions[node.data] = getRandNodePosition();
        });
        setNodePosition(initialPositions)
    }, [myGraph.graph]);



  return (
      <main className="mainscreen min-h-screen">
          <div className="toolbar p-10 flex gap-8 bg-white items-center justify-center">
              <div className="managing-nodes flex flex-col gap-4 items-center justify-center">
                  <div className="flex flex-row gap-4">
                      <button onClick={handleAddingNodes} className="px-4 py-2 bg-gray-500 rounded-md">+</button>
                      <button onClick={handleRemovingNodes} className="px-4 py-2 bg-gray-500 rounded-md">-</button>
                  </div>
                  <h3># of Nodes: {myGraph.getGraphNodeCount()}</h3>
              </div>

              <div className="managing-edges flex flex-col gap-4 items-center justify-center">
                  <div className="flex flex-row gap-4">
                      <select name="node1" id="node1">
                          {myGraph.graph.map((key) => {
                              // eslint-disable-next-line react/jsx-key
                              return (<option key={key.data} value={key.data}>{key.data}</option>);
                          })}
                      </select>
                      <select name="node2" id="node2">
                          {myGraph.graph.map((key) => {
                              // eslint-disable-next-line react/jsx-key
                              return (<option key={key.data} value={key.data}>{key.data}</option>);
                          })}
                      </select>

                      <button className="border-2 border-black rounded-full p-1">Connect</button>
                      <button className="border-2 border-black rounded-full p-1">Disconnect</button>
                  </div>
                  <h3># of Edges: {myGraph.getNumEdges()}</h3>
              </div>
          </div>


          <div className="node-field flex min-w-screen ">
              {myGraph.graph.map((key) => {
                  // @ts-ignore
                  const position = nodePosition[key.data] || getRandNodePosition()
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Draggable nodeRef={nodeRef} key={key.data} defaultPosition={position}>
                        <div ref={nodeRef}>
                            <Node DataValue={key.data}/>
                        </div>
                    </Draggable>
                  )
              })}
          </div>


      </main>
  )

}


