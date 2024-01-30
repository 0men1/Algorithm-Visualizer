import GraphNode from "./GraphNode"
import {spec} from "node:test/reporters";


class Graph {
	public graph: GraphNode[]; // Map of vertices and edges
	public numEdges: number;

	public constructor() {
		this.graph = [];
		this.numEdges = 0;
	}

	public addNode(node_: GraphNode) {
		this.graph.push(node_);
	}

	public addEdge(source: GraphNode, destination: GraphNode) {
		if (this.checkNeighbors(source, destination)) {
			return;
		}

		source.addNeighbor(destination);
		destination.addNeighbor(source);
		this.numEdges++;
	}

	public checkNeighbors(source: GraphNode, destination: GraphNode) {
		return (source == destination) || (source.neighbors.has(destination) || destination.neighbors.has(destination))
	}

	public getNodeCount() {
		return this.graph.length;
	}

	public getEdgeCount() {
		return this.numEdges;
	}

	public removeNode() {
		const removed_node = this.graph.pop()

		if (removed_node?.neighbors.size != undefined) {
			this.numEdges = this.numEdges - removed_node?.neighbors.size;

			removed_node?.neighbors.forEach((elem) => {
				elem.neighbors.delete(removed_node)
			})
			removed_node?.neighbors.clear()
		}

		return removed_node
	}


}
export default Graph