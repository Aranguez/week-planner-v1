const globalAny:any = global;

const requestAnimationFrame = (globalAny.requestAnimationFrame) = callback => {
    setTimeout(callback, 0);
}
   
export default requestAnimationFrame;