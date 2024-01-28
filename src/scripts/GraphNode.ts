import Graph from "@/scripts/Graph";

class GraphNode {
    public data: any;
    public neighbors: Set<GraphNode>;


    public constructor(data_: any) {
       this.data = data_;
       this.neighbors = new Set<GraphNode>();
    }

    public addNeighbor(graphnode_: GraphNode) {
        this.neighbors.add(graphnode_);
    }
}

export default GraphNode