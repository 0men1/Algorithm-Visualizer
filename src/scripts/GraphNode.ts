
class GraphNode {
    public data: any;
    public neighbors: GraphNode[];

    public constructor(data_: any) {
       this.data = data_;
       this.neighbors = []
    }

    public addNeighbor(graphnode_: GraphNode) {
        this.neighbors.push(graphnode_);
    }
}

export default GraphNode