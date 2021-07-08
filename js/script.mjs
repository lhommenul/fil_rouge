
import { getTouits,
    getTrending,
    getOneTouit,
    getMostActiveUser,
    createBubble,
    sendTouit,
    sendComment,
    getTouitComment} from "./req.mjs"
// globalThis
// go throw all msg



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
// GET TOUITS
(async ()=>{
    const container = document.getElementsByClassName('touits')[0];
        getTouits.then(data=>{    
            JSON.parse(data).messages.reverse().map((msg)=>{
               container.appendChild(createBubble(msg)) 
            });
        });
})();



// send touits
document.querySelector('#send_btn').addEventListener('click',()=>{
    let name = document.querySelector("#id").value,
        message = document.querySelector("#message").value;
    sendTouit(name,message).then(res=>{
        if (JSON.parse(res).success) {
            const container = document.getElementsByClassName('touits')[0];
            container.insertBefore(createBubble({likes:0,
                name:name,
                message:message}),container.firstChild)
        }
    })
})