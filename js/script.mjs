
import { getTouits,
    getTrending,
    getOneTouit,
    getMostActiveUser,
    createBubble,
    sendTouit,
    sendComment,
    likeTouit,
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
        getMostActiveUser().then((users)=>{
            users = JSON.parse(users)
            getTouits.then(data=>{    
                JSON.parse(data).messages.reverse().map((msg)=>{
                   container.appendChild(createBubble(msg,users)) 
                });
            })
        })
})();



// send touits
document.querySelector('#send_btn').addEventListener('click',()=>{
    let name = document.querySelector("#id").value,
        message = document.querySelector("#message").value;
    sendTouit(name,message).then(res=>{
        res = JSON.parse(res)
        if (res.success) {
            const container = document.getElementsByClassName('touits')[0];
            getMostActiveUser().then(e=>{
                container.insertBefore(createBubble({likes:0,
                    name:name,
                    message:message,id:res.id}, JSON.parse(e)),container.firstChild)
            })
        }
    })
})

// check Input 
checkInput('id',16);
checkInput('message',256);
function checkInput(id,max) {
    document.getElementById(id).addEventListener('input',(e)=>{
        if (e.target.value.length > max) {
            e.target.value = e.target.value.slice(0,max)
        }
    })
    
}
