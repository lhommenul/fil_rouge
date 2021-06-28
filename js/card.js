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
            text_icon.addEventListener('click',(e)=>{
                this.likeComment(icon_text,icon_like)
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
                    user_infos.appendChild(user_name_info_container)
                        user_name_info_container.appendChild(username)
                            username.innerText = this.name ;
                        user_name_info_container.appendChild(touit_date)
                            touit_date.innerText = this.ts;
                article.appendChild(card_message)
                    card_message.innerText = this.message
                article.appendChild(touit_img)
                    touit_img.src = "https://picsum.photos/300"+(Math.random()*5).toFixed(0)
                article.appendChild(text_icon)
                    icon_text.innerText = this.likes
                    text_icon.appendChild(icon_like)
                    text_icon.appendChild(icon_text)
                    icon_like.src = "/assets/like.svg"
                    text_icon.alt = "icn like"
                article.appendChild(text_icon_com)
                icon_text_com.innerText = this.comments_count
                    text_icon_com.appendChild(icon_comment)
                    text_icon_com.appendChild(icon_text_com)
                    icon_comment.src = "/assets/comment.svg"
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
                        console.log(button.className += " clicked");
                        this.liked = true;
                    }else{
                        console.error("je ne peux pas ajouter le like");
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
// get touit

let xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = ()=>{
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        const cont = document.getElementsByClassName('cards_list_container')[0]
        JSON.parse(xhttp.responseText).messages.reverse().forEach(element => {
            cont.appendChild(new Card(element).generateHtml())
        });
    }
}
xhttp.open("GET","http://touiteur.cefim-formation.org/list")
xhttp.send()

// Ajouter un touit

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


// get Tranding

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

// get iunfluenceurs

// let xmlrequest = new XMLHttpRequest()
// xmlrequest.onreadystatechange = ()=>{
//     if (xmlrequest.readyState === 4 && xmlrequest.status === 200) {
//             let res = JSON.parse(xmlrequest.responseText)
//             const c = document.getElementsByClassName('list_top_trend')[0]
//             for (const key in res) {
//                 if (res.hasOwnProperty(key)) {
//                     c.appendChild(new TopWord({name:key,nb:res[key]}).generateHtml())
//                 }
//             }
//     }
// }
// xmlrequest.open("GET","http://touiteur.cefim-formation.org/trending")
// xmlrequest.send()