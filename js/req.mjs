export { 
    getTouits,
    getTrending,
    getOneTouit,
    getMostActiveUser,
    sendComment,
    sendTouit,
    getTouitComment,
    createBubble
}
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
            xhr.open("GET",`http://touiteur.cefim-formation.org/comments/list?message_id=${message_id }`)
            xhr.send()
        } catch (error) {
            reject(error)
        }
    })
}



let createBubble = (data)=>{
    // CREATE BUBBLE
    let li = document.createElement('li'),
        likes = document.createElement('span'),
        name = document.createElement('p'),
        message = document.createElement('p');
    (()=>{
        li.className = "touit"
    })();
        // Set Data
    (()=>{
        // comments_count: 1
        // id: "10"
        // ip: "90.63.116.81"
        // likes: 2216
        // message: "defined"
        // name: "defined"
        // ts: 1622627971
        likes.innerText = data.likes; 
        name.innerText = data.name;
        message.innerText = data.message;
    })();
    // Append
    (()=>{
        li.appendChild(likes)
        li.appendChild(name)
        li.appendChild(message)
    })();       
    // event
    (()=>{
        li.addEventListener('click',()=>{
            getTouitComment(data.id)
            .then(data=>{
                console.log(JSON.parse(data));
            })
        })
    })();
    return li
}