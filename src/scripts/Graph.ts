import GraphNode from "./GraphNode"


class Graph {
	public graph: GraphNode[]; // Map of vertices and edges
	public numEdges: number;

	public constructor() {
		this.graph = [];
		this.numEdges = 0;
	}

	public addNode(data_: any) {
		let newNode = new GraphNode(data_);
		this.graph.push(newNode);
	}

	public addEdge(source: GraphNode, destination: GraphNode) {
		source.addNeighbor(destination);
		destination.addNeighbor(source);
		this.numEdges++;
	}

	public getGraphNodeCount() {
		return this.graph.length;
	}

	public removeNode() {
		this.graph.pop();
	}

	public getNumEdges() {
		return this.numEdges;
	}
}
export default Graph