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


class Card{
    constructor(props){
        this.id = props.id;
        this.name = props.name;
        this.message = props.message;
        this.ts = props.ts;
        this.likes = props.likes;
        this.comments_count = props.comments_count;
        this.ip = props.ip;
        this.liked = false;
    }
    generateHtml(){
        const li = document.createElement("li"),
        article = document.createElement("article"),
        user_infos = document.createElement("div"),
            user_picture =document.createElement("img"),
            user_name_info_container= document.createElement("div"),
                username = document.createElement("p"),
                touit_date = document.createElement("p"),
        card_message= document.createElement("p"),
        touit_img=document.createElement("img"),
        text_icon = document.createElement("button"),
            icon_text = document.createElement("span"),
            icon_like = document.createElement("img"),
        text_icon_com = document.createElement("button"),
            icon_text_com = document.createElement("span"),
            icon_comment = document.createElement("img");

        // ==== EVENTS ======
        (()=>{
            // like
            text_icon.addEventListener('click',(e)=>{
                this.likeComment(icon_text,icon_like)
            })
            // comment
            text_icon_com.addEventListener('click',(e)=>{
                this.displayComments(li,this.id)
            })
        })();
        // ==== SET CLASS'S ====
        (()=>{
            li.className = "card_container";
            article.className = "card";
            user_infos.className = "user_infos";
            user_picture.className = "user_picture";
            user_name_info_container.className = "user_name_info_container";
            username.className = "username";
            touit_date.className = "touit_date";
            card_message.className = "card_message";
            touit_img.className = "touit_img";
            text_icon.className = "text_icon";
            icon_like.className = "icon_like";
            text_icon_com.className = "text_icon";
            icon_comment.className = "icon_comment";
        })();
        // ==== APPEND ELEMENTS ====
        (()=>{
            li.appendChild(article)
                article.appendChild(user_infos)
                    user_infos.appendChild(user_picture)
                        user_picture.src = "https://picsum.photos/50"
                        user_picture.loading= "lazy"
                    user_infos.appendChild(user_name_info_container)
                        user_name_info_container.appendChild(username)
                            username.innerText = this.name ;
                        user_name_info_container.appendChild(touit_date)
                            touit_date.innerText = this.ts;
                article.appendChild(card_message)
                    card_message.innerText = this.message
                article.appendChild(touit_img)
                    touit_img.src = "https://picsum.photos/300"+(Math.random()*5).toFixed(0)
                    touit_img.loading= "lazy"
                article.appendChild(text_icon)
                    icon_text.innerText = this.likes
                    text_icon.appendChild(icon_like)
                    text_icon.appendChild(icon_text)
                    icon_like.src = "/assets/like.svg"
                    icon_like.loading = "lazy"
                    text_icon.alt = "icn like"
                article.appendChild(text_icon_com)
                icon_text_com.innerText = this.comments_count
                    text_icon_com.appendChild(icon_comment)
                    text_icon_com.appendChild(icon_text_com)
                    icon_comment.src = "/assets/comment.svg"
                    icon_comment.loading = "lazy"
        })();
        return li;
    }
    likeComment(element,button){
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    console.log(JSON.parse(xhr.responseText).success);
                    if (JSON.parse(xhr.responseText).success === true && this.liked === false) {
                        this.likes+=1;
                        element.innerText = this.likes;
                        button.classList.add('clicked')
                        this.liked = true;
                    }else{
                        this.liked = false;
                        this.likes-=1;
                        element.innerText = this.likes;
                        let xhr = new XMLHttpRequest()
                        xhr.onreadystatechange = ()=>{
                            button.classList.remove('clicked')
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                console.error("dislicked");
                            }
                        }
                        xhr.open('DELETE',`http://touiteur.cefim-formation.org/likes/remove?message_id=${this.id}`)
                        xhr.send()
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        const i = new FormData()
            i.append("message_id",this.id)
        xhr.open("PUT","http://touiteur.cefim-formation.org/likes/send")
        xhr.send(i)
    }
    displayComments(container,id){
        let i = document.getElementsByClassName("list_comments")[0],
            list=i===undefined?document.createElement('ul'):i;
        list.className = "list_comments";
        // delete all childrens
        while (list.hasChildNodes()) {
            list.firstChild.remove()
        }
        // get data => generate comments
        (async ()=>{
            JSON.parse(await getTouitComment(id)).comments.forEach(e=>{
                let li = document.createElement('li'),
                    p = document.createElement('p'),
                    comment = document.createElement('p');
                // data set 
                p.innerText = e.name;
                comment.innerText = e.comment;
                li.appendChild(p)
                li.appendChild(comment)
                li.className = "comment" // set className
                // append  
                list.appendChild(li)
            });
            // Ajouter un espace commentaire
            (()=>{
                
            })();
            container.appendChild(list)
        })();
    }
}

class TopWord{
    constructor(props){
        this.name=props.name;
        this.nb=props.nb;
    }
    generateHtml(){
        const btn = document.createElement('button'),
            nb = document.createElement('span');
        btn.innerText = this.name;
        btn.className = "btn_top_trend";
        nb.innerText = this.nb;
        nb.className = "nb_top_trend";
        // ==== APPEND ====
        (()=>{
            btn.appendChild(nb)
        })();
        return btn;
    }
}

// ====== GET TOUIT ======
getTouits()
function getTouits() {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = ()=>{
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            const cont = document.getElementsByClassName('cards_list_container')[0];
            let i = JSON.parse(xhttp.responseText).messages.reverse()
            for (let index = 0; index < 50; index++) {
                const element = i[index];
                cont.appendChild(new Card(element).generateHtml())   
            }
        }
    }
    xhttp.open("GET","http://touiteur.cefim-formation.org/list")
    xhttp.send()
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
