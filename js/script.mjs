import { getTouits,
    getTrending,
    getOneTouit,
    getMostActiveUser,
    sendComment,
    getTouitComment} from "./req.mjs"
// globalThis







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