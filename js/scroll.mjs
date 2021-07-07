export function Scroll(elements,index){
    let result;
    elements[index].element?.classList?.add("selected_touit")
    globalThis.addEventListener("mousewheel",(e)=>{
        elements[index].element?.classList?.remove("selected_touit")
        let goUp = ()=>{
            index = index<elements.length-1?index+1:0;
            return index;
        }
        let goDown = ()=>{
            index = index<=0?elements.length-1:index-1;
            return index;
        }
        result = e.deltaY>=0?goUp():goDown();
        console.log(result);
        elements[index].element?.classList?.add("selected_touit")
    });
    return result;
}

