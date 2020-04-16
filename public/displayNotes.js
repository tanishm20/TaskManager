// this script displays the notes of a specific task

async function displayNotes(taskID){
    let hit = document.getElementById('icon' + taskID)
    if(hit.getAttribute("hit") === "0"){
        const resp = await fetch('/tasks/' + taskID + '/notes', {method: 'GET'})
        notes = await resp.json()

        let myTable = document.getElementById('taskTable')
        let myDiv = document.createElement('div')
        myDiv.id = 'myDiv'+ taskID
        if(notes.length > 0){
            let ul = document.createElement('ul')
            ul.id = 'ul' + taskID
            for (let element of notes) {
                for (key in element) {
                    let li = document.createElement("li")
                    li.textContent = element[key]
                    ul.appendChild(li)
                }
            }

            myDiv.appendChild(ul)

            let x = document.createElement("INPUT");
            x.setAttribute("type", "text");
            x.placeholder = "Enter Note"
            x.id = 'inputNotes'+taskID
            myDiv.appendChild(x)
            
            let btn = document.createElement("button")
            btn.id = 'addNotes'+taskID
            btn.innerHTML = 'ADD'
            btn.setAttribute('onclick', "addNotes("+ taskID + ");")
            myDiv.appendChild(btn)

            let referenceNode = document.querySelector('#row' + taskID)
            referenceNode.after(myDiv)  
   
        }else{
            let x = document.createElement("INPUT");
            x.setAttribute("type", "text");
            x.id = 'inputNotes'+taskID
            x.placeholder = "Enter Note"
            myDiv.appendChild(x)
            
            let btn = document.createElement("button")
            btn.id = 'addNotes'+ taskID
            btn.setAttribute('onclick', "addNotes("+ taskID + ");")
            btn.innerHTML = 'ADD'
            myDiv.appendChild(btn)

            let referenceNode = document.querySelector('#row' + taskID)
            referenceNode.after(myDiv)  
        }
        hit.setAttribute('hit', 1)
        hit.innerHTML = '-'
    }else{
        document.querySelectorAll('#myDiv'+ taskID).forEach(function(a) {
            a.remove()
        })
        hit.setAttribute('hit', 0)
        hit.innerHTML = '+'
    }
}