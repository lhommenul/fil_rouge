export function Scroll(elements,index){
    console.log(elements);
    globalThis.addEventListener("mousewheel",(e)=>{
        let goUp = ()=>{
            index = index<=0?elements.length:index--;
            console.log(index);
            return index;
        }
        let goDown = ()=>{
            index = index<=0?elements.length:index--;
            console.log(index);
            return index;
        }
        return e.deltaY>=0?goUp():goDown();
    });
}