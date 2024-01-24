import GraphNode from "./GraphNode"


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
		if (source == destination || (source.neighbors[destination.data] == destination && destination.neighbors[source.data] == source)) {
			return
		}
		source.addNeighbor(destination);
		destination.addNeighbor(source);
		this.numEdges++;
	}

	public getNodeCount() {
		return this.graph.length;
	}

	public getEdgeCount() {
		return this.numEdges;
	}

	public removeNode() {
		this.graph.pop();
	}


}
export default Graph