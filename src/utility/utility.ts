


/**
 * Get a random x,y coordinates scaled off of the size of the window
 */
export default function getRandNodePosition() {
    const maxWidth = window.innerWidth - 150;
    const maxHeight = window.innerHeight - 400;
    const x = Math.random() * maxWidth;
    const y = Math.random() * maxHeight;
    return {x,y}
}