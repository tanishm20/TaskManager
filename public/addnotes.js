// add Notes to the task

function addNotes(taskID){
    let newNote = document.getElementById("inputNotes" + taskID).value
    if(newNote === ""){
        alert("Please Enter Note")
        return
    }
    let ul = document.getElementById("ul" + taskID)
    if(typeof(ul) != 'undefined' && ul != null){
        let li = document.createElement("li")
        li.textContent = newNote
        ul.appendChild(li)
    }else{
        let myDiv = document.getElementById('myDiv' + taskID)
        ul = document.createElement("ul")
        ul.id = "ul" + taskID
        let li = document.createElement("li")
        li.textContent = newNote
        ul.appendChild(li)
        let firstChild = document.getElementById("inputNotes"+ taskID)
        myDiv.insertBefore(ul, myDiv.firstChild)
    }
    addNewNoteToJson(newNote, taskID)
}

async function addNewNoteToJson(note, taskId){
    const resp = await fetch('/tasks/'+taskId+'/notes',{
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({note})
    })
}