import { getTouits,
    getTrending,
    getOneTouit,
    getMostActiveUser,
    sendComment,
    getTouitComment} from "./req.mjs"
// globalThis
// go throw all msg


import {Scroll} from './scroll.mjs'


// GET TREND
(async ()=>{
    const container = document.getElementsByClassName('trends')[0];
        getTrending.then(data=>{    
            console.log(data);        
            for (const pr in data) {
                // CREATE BUBBLE
                (()=>{
                    let li = document.createElement('li'),
                        prop = document.createElement('p'),
                        p = document.createElement('p');
                    (()=>{
                        li.className = "trend"
                    })();
                    // Set Data
                    (()=>{
                        prop.innerText = pr;
                        p.innerText = data[pr];
                    })();
                    // Append
                    (()=>{
                        li.appendChild(prop)
                        li.appendChild(p)
                        container.appendChild(li)
                    })();
                })();
            }
        });
})();

(async ()=>{
    const container = document.getElementsByClassName('touits')[0];
        getTouits.then(data=>{    
            let current_index = 0;
            const msg = JSON.parse(data).messages.map((msg)=>{
                // CREATE BUBBLE
                let li = document.createElement('li'),
                    likes = document.createElement('span'),
                        icon_like = document.createElement('img'),
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
                    likes.innerText = msg.likes;
                    icon_like
                    name.innerText = msg.name
                    message.innerText = msg.message
                })();
                // Append
                (()=>{
                    li.appendChild(likes)
                        likes.appendChild(icon_like)
                    li.appendChild(name)
                    li.appendChild(message)
                    container.appendChild(li)
                })();       
                return {data:msg,element:li}
            });
            msg[0]?.element?.classList?.add("selected_touit");
            current_index = Scroll(msg,current_index)
        });
})();