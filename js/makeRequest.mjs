export {sendComment,getMostTouitLike,getMostActiveUser,getOneTouit}


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


// ====== GET TRANDING ======
getTranding()
function getTranding() {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = ()=>{
        if (xhr.readyState === 4 && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)
                const c = document.getElementsByClassName('list_top_trend')[0]
                for (const key in res) {
                    if (res.hasOwnProperty(key)) {
                        c.appendChild(new TopWord({name:key,nb:res[key]}).generateHtml())
                    }
                }
        }
    }
    xhr.open("GET","http://touiteur.cefim-formation.org/trending")
    xhr.send()
}



// ====== SEND TOUIT ======

document.getElementById('form_add_touit').addEventListener('submit',e=>{
    e.preventDefault();
    const inp_nickname = document.getElementById('inp_nickname'),
        inp_text_area_send_message = document.getElementById('inp_text_area_send_message');
    if (inp_nickname.value != "" && inp_text_area_send_message.value != "") {
        let xhttp = new XMLHttpRequest(),
            formData = new FormData();
        xhttp.onreadystatechange = ()=>{
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                console.log(xhttp.responseText);
            }
        }
        formData.append("name",inp_nickname.value)
        formData.append("message",inp_text_area_send_message.value)
        xhttp.open("POST",`http://touiteur.cefim-formation.org/send`)
        xhttp.send(formData)
    }else alert("Les champs ne sont pas good :/");
})