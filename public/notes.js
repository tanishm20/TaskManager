 async function Notes(id) {
    id = Number(id)
    const resp = await fetch(`/todos/${id}/notes`, { method: 'GET' })
    const note = await resp.json()
    document.getElementById('id01').style.display='block'
    document.getElementById('modalHeader').innerHTML = `Notes for Task ${id}`
    const table = document.getElementById("modalContent")
    const add = document.getElementById("addNotes")
    add.setAttribute("action",`/todos/${id}/notes `)
    var row = table.getElementsByTagName("tr")
    for (var i = 1; i < row.length; i++) {
        row[i].style.display = 'none';
      }
      if(note.length<1){
        var tr = document.createElement("tr");
      var text = document.createTextNode("NO notes available")
      tr.appendChild(text)
     table.appendChild(tr)
    }
    else{
    for(var i = 0; i < note.length; i++){
        var tr = document.createElement("tr");
        var text = document.createTextNode(note[i].notes)
        tr.appendChild(text)
        table.appendChild(tr)
    }
  }
  }