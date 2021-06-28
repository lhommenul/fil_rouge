class Card{
    constructor(props){
        this.id = props.id;
        this.name = props.name;
        this.message = props.message;
        this.ts = props.ts;
        this.likes = props.likes;
        this.comments_count = props.comments_count;
        this.ip = props.ip;
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
            icon_like = document.createElement("img"),
        text_icon_com = document.createElement("button"),
            icon_comment = document.createElement("img");
        // SET CLASS'S
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
        // APPEND ELEMENTS
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
                    text_icon.innerText = this.likes
                    text_icon.appendChild(icon_like)
                    icon_like.src = "/assets/like.svg"
                    text_icon.alt = "icn like"
                article.appendChild(text_icon_com)
                    text_icon_com.innerText = this.comments_count
                    text_icon_com.appendChild(icon_comment)
                    icon_comment.src = "/assets/comment.svg"
        })();
        return li;
    }
    likeComment(){
        
    }
}


const list = [{
    id:"15561651",
    name:"Jhon Doe",
    message:"kzrop kez3232 k^prkez ^pk z^pk êpzk^p zrek^pr k^pzk ^pkze^p kerz^pk",
    ts:"20-02-2021",
    likes:202,
    comments_count:19,
    ip:"10.15610205"
},{
    id:"3213143243",
    name:"Sarah Doe",
    message:"kzrop dspq sdlpqzk^p zrek^pr k^pzk ^pkze^p kerz^pk",
    ts:"20-02-2021",
    likes:240,
    comments_count:1,
    ip:"10.15610205"
},{
    id:"4446467897",
    name:"Jerome Salmon",
    message:"kzrop kezk roezk rokez ôrkez^p kr^pz k^prkez ^pk z^pk êpzk^p zrek^pr k^pzk ^pkze^p kerz^pk",
    ts:"20-02-2021",
    likes:240,
    comments_count:32,
    ip:"10.15610205"
},{
    id:"32",
    name:"Kevin",
    message:"dsqds ;dpsqk dpsk pdksqp lkpk",
    ts:"20-02-2021",
    likes:1,
    comments_count:6,
    ip:"10.15610205"
},]


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