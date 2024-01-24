


export function getEdgePositions(node1: string, node2: string) {

    let node1Pos = document.getElementById(node1)?.getBoundingClientRect()
    let node2Pos = document.getElementById(node2)?.getBoundingClientRect()

    if (node1Pos == undefined && node2Pos == undefined) {
        return {}
    }
    return {x1: node1Pos?.x, y1: node1Pos?.y, x2: node2Pos?.x, y2: node2Pos?.y}
}

export function getRandNodePosition() {
    const maxWidth = window.innerWidth - 150;
    const maxHeight = window.innerHeight - 400;
    const x = Math.random() * maxWidth;
    const y = Math.random() * maxHeight;

    return {x,y}
}



