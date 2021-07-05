
let comment_space = false,type_mode = false;
window.onkeyup = (e=>{

    let checkKey = ()=> {
        if ((e?.key)==="n") {
            console.log("n pressed");
            touit()
        }
    }
    let checkOpened = ()=>{
        if (type_mode) {
            document.activeElement.className === "inpt_dis"
        } else {
            
        }
    }
    let touit = ()=> {
        type_mode = true;
        let form = document.createElement('form'), 
            label = document.createElement('label'),
            input = document.createElement('input'),
            disinput = document.createElement('input');
        // set class Name
        (()=>{
            form.className = "form_new"
            label.className = "labe_new"
            input.className = "input_new"
            disinput.className = "inpt_dis"
        })();

        // data
        (()=>{
            label.innerText = "Titre du Touit"
            // form
            form.setAttribute("aria-dialog",true)
        })();
        // append
        (()=>{
            label.appendChild(input)
            form.appendChild(label)
            form.appendChild(disinput)
            document.getElementsByTagName('body')[0]?.appendChild(form)
        })();
        
        // set focus
        (()=>{
            label.focus()
        })();

    }   
    let comment = ()=> {
        
    }
    // check if the comment space is open 
    comment_space||type_mode?checkOpened():checkKey()
})