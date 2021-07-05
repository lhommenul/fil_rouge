import {getTranding} from "./req.mjs"
// globalThis





(async ()=>{
    const container = document.getElementsByClassName('trends')[0];
        getTranding.then(data=>{            
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
                // console.log(`obj.${pr} = ${data[pr]}`);
            }
        });
})();

