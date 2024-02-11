import Graph from '@/scripts/Graph';
import GraphNode from '@/scripts/GraphNode';

describe("Test Adding Nodes", () => {
    it("Should add the nodes to the graph correctly", () => {
        let myGraph = new Graph();
        for (let i = 0; i < 5; ++i) {
            let node = new GraphNode(i);
            myGraph.addNode(node);
            expect(myGraph.graph[i]).toEqual(node);
        }
        expect(myGraph.getNodeCount()).toEqual(5);
    })
})

describe("Test Adding Edges (duplicate connect)", () => {
    it("Should add the correct nodes to the correct neighbors", () => {
        let myGraph = new Graph();

        myGraph.addNode(new GraphNode(0));
        myGraph.addNode(new GraphNode(1));

        myGraph.addEdge(myGraph.graph[0], myGraph.graph[1]);
        expect(myGraph.graph[0].neighbors.has(myGraph.graph[1])).toEqual(true)
        expect(myGraph.graph[1].neighbors.has(myGraph.graph[0])).toEqual(true)

        myGraph.addEdge(myGraph.graph[0], myGraph.graph[1]);
        expect(myGraph.graph[0].neighbors.size).toEqual(1);
        expect(myGraph.graph[1].neighbors.size).toEqual(1);

        myGraph.addEdge(myGraph.graph[1], myGraph.graph[0]);
        expect(myGraph.graph[0].neighbors.size).toEqual(1);
        expect(myGraph.graph[1].neighbors.size).toEqual(1);

        expect(myGraph.numEdges).toEqual(1);
    })
})
describe("Test Adding Edges (single)", () => {
    it("Should add the correct node to the correct neighbor", () => {
        let myGraph = new Graph();
        myGraph.addNode(new GraphNode(0));

        myGraph.addEdge(myGraph.graph[0], myGraph.graph[0]);

        expect(myGraph.graph[0].neighbors.has(myGraph.graph[0])).toEqual(false);

        expect(myGraph.numEdges).toEqual(0);
    })
})
describe("Test Adding Edges (many)", () => {
    it("Should add the correct nodes to the correct neighbors", () => {
        let myGraph = new Graph();

        for (let i = 0; i < 5; ++i) {
            myGraph.addNode(new GraphNode(i));
        }

        for (let i = 0; i < 4; ++i) {
            myGraph.addEdge(myGraph.graph[i], myGraph.graph[i+1]);

            expect(myGraph.graph[i].neighbors.has(myGraph.graph[i+1])).toEqual(true);
            expect(myGraph.graph[i+1].neighbors.has(myGraph.graph[i])).toEqual(true);
        }

        expect(myGraph.numEdges).toEqual(4);
    })
})




describe("Test Removing Nodes (empty)", () => {
    it("Should remove the nodes from graph", () => {
        let myGraph = new Graph();

        expect(myGraph.removeNode()).toEqual(undefined);
        expect(myGraph.getNodeCount()).toEqual(0);
    })
})

describe("Test Removing Nodes (single)", () => {
    it("Should remove the nodes from graph", () => {
        let myGraph = new Graph();

        let node = new GraphNode(1);
        myGraph.addNode(node);

        expect(myGraph.removeNode()).toEqual(node);
        expect(myGraph.getNodeCount()).toEqual(0);
    })
})
describe("Test Removing Nodes (many)", () => {
    it("Should remove the nodes from graph", () => {
        let myGraph = new Graph();

        let nodeArr = [];

        for (let i = 0; i < 3; ++i) {
            nodeArr.push(new GraphNode(i));
            myGraph.addNode(nodeArr[i]);
        }

        expect(myGraph.removeNode()).toEqual(nodeArr[2]);
        expect(myGraph.getNodeCount()).toEqual(2);

        expect(myGraph.removeNode()).toEqual(nodeArr[1]);
        expect(myGraph.getNodeCount()).toEqual(1);

        expect(myGraph.removeNode()).toEqual(nodeArr[0]);
        expect(myGraph.getNodeCount()).toEqual(0);
    })
})


describe("Test Removing Nodes+Edges (single)", () => {
    it("Should remove the nodes & associated edges from graph", () => {
        let myGraph = new Graph();

        let node = new GraphNode(1);
        let node2 = new GraphNode(2);
        myGraph.addNode(node);
        myGraph.addNode(node2);

        myGraph.addEdge(node, node2);

        expect(myGraph.removeNode()).toEqual(node2);

        expect(myGraph.graph[0].neighbors.has(node2)).toEqual(false);

        expect(myGraph.getNodeCount()).toEqual(1);
        expect(myGraph.getEdgeCount()).toEqual(0);
    })
})

describe("Test Removing Nodes+Edges (many)", () => {
    it("Should remove the nodes & associated edges from graph", () => {
        let myGraph = new Graph();

        let nodeArr = [];

        for (let i = 0; i < 3; ++i) {
            nodeArr.push(new GraphNode(i));
            myGraph.addNode(nodeArr[i]);
        }

        myGraph.addEdge(nodeArr[0], nodeArr[1]);
        myGraph.addEdge(nodeArr[1], nodeArr[2]);

        expect(myGraph.removeNode()).toEqual(nodeArr[2]);
        expect(myGraph.graph[0].neighbors.has(nodeArr[1])).toEqual(true);
        expect(myGraph.graph[1].neighbors.has(nodeArr[0])).toEqual(true);
        expect(myGraph.graph[1].neighbors.has(nodeArr[2])).toEqual(false);

        expect(myGraph.removeNode()).toEqual(nodeArr[1]);
        expect(myGraph.graph[0].neighbors.has(nodeArr[1])).toEqual(false);
    })
})