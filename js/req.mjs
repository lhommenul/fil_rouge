export { 
    getTouits,
    getTranding,
    getOneTouit,
    getMostActiveUser,
    sendComment,
    getTouitComment
}
// ====== GET TOUIT ======
function getTouits() {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = ()=>{
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            const cont = document.getElementsByClassName('cards_list_container')[0];
            let i = JSON.parse(xhttp.responseText).messages.reverse()
            for (let index = 0; index < 50; index++) {
                const element = array[index];
                cont.appendChild(new Card(element).generateHtml())   
            }
        }
    }
    xhttp.open("GET","http://touiteur.cefim-formation.org/list")
    xhttp.send()
}

// ====== SEND TOUIT ======

// document.getElementById('form_add_touit').addEventListener('submit',e=>{
//     e.preventDefault();
//     const inp_nickname = document.getElementById('inp_nickname'),
//         inp_text_area_send_message = document.getElementById('inp_text_area_send_message');
//     if (inp_nickname.value != "" && inp_text_area_send_message.value != "") {
//         let xhttp = new XMLHttpRequest(),
//             formData = new FormData();
//         xhttp.onreadystatechange = ()=>{
//             if (xhttp.readyState === 4 && xhttp.status === 200) {
//                 console.log(xhttp.responseText);
//             }
//         }
//         formData.append("name",inp_nickname.value)
//         formData.append("message",inp_text_area_send_message.value)
//         xhttp.open("POST",`http://touiteur.cefim-formation.org/send`)
//         xhttp.send(formData)
//     }else alert("Les champs ne sont pas good :/");
// })

// ====== GET TRANDING ======
let getTranding = new Promise((resolve,reject)=>{
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

function getOneTouit(id) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = ()=>{
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    }
    xhr.open("GET",`http://touiteur.cefim-formation.org/get?id=${id}`)
    xhr.send()
}

// ====== GET MOST ACTIVE USER ======

function getMostActiveUser(count=1) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = ()=>{
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    }
    xhr.open("GET",`http://touiteur.cefim-formation.org/influencers?count =${count}`)
    xhr.send()
}

// ====== GET MOST TOUIT LIKES ======
function getMostTouitLike(count=1) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = ()=>{
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    }
    xhr.open("GET",`http://touiteur.cefim-formation.org/likes/top?count =${count}`)
    xhr.send()
}

// ====== SEND COMMENT ======
// sendComment(8,"default name","default comment")
function sendComment(message_id,name,comment) {
    let formData = new FormData();
        formData.append("message_id",message_id)
        formData.append("name",name)
        formData.append("comment",comment)
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = ()=>{
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    }
    xhr.open("POST",`http://touiteur.cefim-formation.org/comments/send`)
    xhr.send(formData)
}

// ====== GET TOUIT COMMENT ======
function getTouitComment(message_id) {
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