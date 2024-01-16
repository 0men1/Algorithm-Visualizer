
const nodeSize = {width: 96, height: 96}

export function isColliding(pos1: any, pos2: any) {
    return !(pos1.x + nodeSize.width < pos2.x ||
             pos1.y + nodeSize.height < pos2.y ||
             pos1.x > pos2.x + nodeSize.width ||
             pos1.y > pos2.y + nodeSize.height);
}

export function getNonCollidingPosition() {
   let position: any;
   let collides: boolean;

   do {
       position = {
           x: Math.random() * (window.innerHeight - nodeSize.height),
           y: Math.random() * (window.innerWidth - nodeSize.width)
       };
       collides = Object.values(position).some(pos => isColliding(pos, position));
   } while (collides);

   return position;

}



export function getRandNodePosition() {
    const maxWidth = window.innerWidth - 150;
    const maxHeight = window.innerHeight - 400;
    const x = Math.random() * maxWidth;
    const y = Math.random() * maxHeight;
    return {x,y}
}



