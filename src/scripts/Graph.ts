import GraphNode from "./GraphNode"


class Graph {
	public graph: GraphNode[]; // Map of vertices and edges
	public numEdges: number;
	public numNodes: number;

	public constructor() {
		this.graph = [];
		this.numEdges = 0;
		this.numNodes = 0;
	}

	public addNode(node_: GraphNode) {
		this.graph.push(node_);
		this.numNodes++;
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

		if (removed_node?.neighbors.size != undefined && removed_node.neighbors.size > 0) {
			this.numEdges = this.numEdges - removed_node?.neighbors.size;

			removed_node?.neighbors.forEach((elem) => {
				elem.neighbors.delete(removed_node)
			})
			removed_node?.neighbors.clear()
		}

		this.numNodes--;

		return removed_node
	}


}
export default Graph
