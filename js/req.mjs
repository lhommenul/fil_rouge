export { 
    getTouits,
    getTrending,
    getOneTouit,
    getMostActiveUser,
    sendComment,
    sendTouit,
    getTouitComment,
    createBubble,
    likeTouit
}
let observer = new IntersectionObserver((ent)=>{
    ent.forEach(observ=>{
        if (observ.intersectionRatio > 0.5) {
            observ.target.children[0].src = `http://touiteur.cefim-formation.org/avatar/get?username=${observ.target.children[2].textContent}`
            observ.target.classList.add("touit")
            observ.target.classList.remove("dsq")
            // observer.unobserve(observ.target)
        }else{
            observ.target.classList.add("dsq")
        }
    })
    
},{
    threshold:[0.5]
})
// ====== GET TOUIT ======
let getTouits = new Promise((resolve,reject) => {
    try {
        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = ()=>{
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                resolve(xhttp.responseText);
            }
        }
        xhttp.open("GET","http://touiteur.cefim-formation.org/list")
        xhttp.send()
    } catch (error) {
        reject(error);
    }
})

// ====== LIKE TOUIT ======
let likeTouit = (message_id)=>{
    return new Promise((resolve,reject) => {
        try {
            let xhttp = new XMLHttpRequest();
            let formData = new FormData();
            formData.append("message_id",message_id)
            xhttp.onreadystatechange = ()=>{
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    resolve(xhttp.responseText);
                }
            }
            xhttp.open("PUT",`http://touiteur.cefim-formation.org/likes/send`)
            xhttp.send(formData)
        } catch (error) {
            reject(error);
        }
    })
}

// ====== SEND TOUIT ======
let sendTouit = (inp_nickname,inp_text_area_send_message)=>{
    return new Promise((resolve,reject)=>{
        try {
            let xhttp = new XMLHttpRequest(),
            formData = new FormData();
            xhttp.onreadystatechange = ()=>{
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    resolve(xhttp.responseText)
                }
            }
            formData.append("name",inp_nickname)
            formData.append("message",inp_text_area_send_message)
            xhttp.open("POST",`http://touiteur.cefim-formation.org/send`)
            xhttp.send(formData)      
        } catch (error) {
            reject(error)
        }
    })
}

// ====== GET TRANDING ======
let getTrending = new Promise((resolve,reject)=>{
    try {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
            }
        }
        xhr.open("GET","http://touiteur.cefim-formation.org/trending")
        xhr.send()
    } catch (error) {
        reject(error)
    }
})

// ====== GET ONE TOUIT ======
let getOneTouit = (id)=>{return new Promise((resolve,reject) => {
    try {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText);
            }
        }
        xhr.open("GET",`http://touiteur.cefim-formation.org/get?id=${id}`)
        xhr.send()
    } catch (error) {
        reject(error);
    }
})}

// ====== GET MOST ACTIVE USER ======

let getMostActiveUser = (count=1)=> {
    return new Promise((resolve,reject)=>{
        try {
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = ()=>{
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(xhr.responseText)
                }
            }
            xhr.open("GET",`http://touiteur.cefim-formation.org/influencers?count =${count}`)
            xhr.send()
        } catch (error) {
            reject(error)        
        }
    })
}

// ====== GET MOST TOUIT LIKES ======
let getMostTouitLike = (count=1)=> {
    return new Promise((resolve,reject)=>{
        try {
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = ()=>{
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(xhr.responseText)
                }
            }
            xhr.open("GET",`http://touiteur.cefim-formation.org/likes/top?count =${count}`)
            xhr.send()      
        } catch (error) {
            reject(error)
        }
    })
}

// ====== SEND COMMENT ======
// sendComment(8,"default name","default comment")
let sendComment = (message_id,name,comment)=> {
    return new Promise((resolve,reject)=>{
            try {
                let formData = new FormData();
                formData.append("message_id",message_id)
                formData.append("name",name)
                formData.append("comment",comment)
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = ()=>{
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(xhr.responseText)
                }
            }
            xhr.open("POST",`http://touiteur.cefim-formation.org/comments/send`)
            xhr.send(formData)
        } catch (error) {
            reject(error)
        }
    })
}

// ====== GET TOUIT COMMENT ======
let getTouitComment = (message_id)=>{
    return new Promise((resolve,reject)=>{
        try {
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = ()=>{
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(xhr.responseText)
                }
            }
            xhr.open("GET",`http://touiteur.cefim-formation.org/comments/list?message_id=${message_id}`)
            xhr.send()
        } catch (error) {
            reject(error)
        }
    })
}



let createBubble = (data,active_user)=>{
    // CREATE BUBBLE
    let li = document.createElement('li'),
        likes = document.createElement('span'),
        img = document.createElement('img'),
        name = document.createElement('p'),
        button_like = document.createElement('button'),
        button_comment = document.createElement('button'),
        form = document.createElement('form'),
        form_name = document.createElement('input'),
        form_textarea = document.createElement('textarea'),
        form_btn = document.createElement('button'),
        comment = document.createElement('ul'),
        message = document.createElement('p');
        // Set Data
    (()=>{
        // comments_count: 1
        // id: "10"
        // ip: "90.63.116.81"
        // likes: 2216
        // message: "defined"
        // name: "defined"
        // ts: 1622627971
        // img.src = `http://touiteur.cefim-formation.org/avatar/get?username=${data.name}`
        img.className = "img_touit"
        button_like.textContent = "like"
        button_comment.textContent = "comment"
        likes.textContent = data.likes; 
        name.textContent = data.name;
        form_btn.textContent = "envoyer";
        message.textContent = data.message;
    })();
    // Append
    (()=>{
        li.appendChild(img)
        li.appendChild(likes)
        li.appendChild(name)
        li.appendChild(message)
        li.appendChild(button_like)
        li.appendChild(button_comment)
        li.appendChild(form)
        form.appendChild(form_name)
        form.appendChild(form_textarea)
        form.appendChild(form_btn)
        li.appendChild(comment)
        li.classList.add("dsq")
        observer.observe(li)
    })();       
    // event
    (()=>{
        // open comment space
        button_comment.addEventListener('click',()=>{
            if (!comment.hasChildNodes()) {                
                getTouitComment(data.id)
                .then(data=>{
                    JSON.parse(data).comments.forEach(v=>{
                        comment.appendChild(createComment(v))
                    })
                })
            }else{
                while (comment.hasChildNodes()) {
                    comment.firstChild.remove()
                }
            }
        })
        // like touit
        button_like.addEventListener('click',()=>{
            likeTouit(data.id).then(e=>{
                if (JSON.parse(e).success) {
                    likes.innerText = parseInt(likes.innerText)+1;
                }
            })
        })
        //envoyer comment
        form.addEventListener('submit',e=>{
            e.preventDefault();
            if (!comment.hasChildNodes()) {  
                console.log("here");              
                getTouitComment(data.id)
                .then(data=>{
                    JSON.parse(data).comments.forEach(v=>{
                        comment.appendChild(createComment(v))
                    })
                })
            }
            sendComment(data.id,form_name.value,form_textarea.value).then(res=>{
                comment.appendChild(createComment({name:form_name.value,comment:form_textarea.value}))
            })
        })
        function createComment(v) {
            const li_c = document.createElement('li'),
            name_c = document.createElement('p'),
            p_c = document.createElement('p');
            name_c.innerText = v.name;
            p_c.innerText = v.comment;
            // Append
            (()=>{
                li_c.appendChild(name_c)
                li_c.appendChild(p_c)
            })();
            return li_c;
        }
    })();
    return li;
}