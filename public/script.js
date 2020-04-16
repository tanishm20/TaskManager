var date = document.getElementById('due')
var tomorrowLocal = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0,10);
date.value = tomorrowLocal
window.onload= async function getTodos() {
  const resp = await fetch('/todos', { method: 'GET' })
  const todos = await resp.json()
var i=0

 for(i=0;i<todos.length;i++){
  var tr = document.createElement("tr");
  var id=document.createElement("td");
  var title = document.createElement("td");
  var description = document.createElement("td");
  var due = document.createElement("td");
  var status = document.createElement("td");
  var priority = document.createElement("td");
  var td  = document.createElement("td");
  var tdedit = document.createElement("td");
  var edit = document.createElement("input");
  var view = document.createElement("input");
  
  var text = [document.createTextNode(todos[i].id),
          document.createTextNode(todos[i].title),
          document.createTextNode(todos[i].description),
          document.createTextNode((todos[i].due)),
          document.createTextNode(todos[i].status),
          document.createTextNode(todos[i].priority),
          document.createTextNode("Edit"),
          document.createTextNode("View")]
          
  id.appendChild(text[0])
  title.appendChild(text[1]);
  description.appendChild(text[2]);
  due.appendChild(text[3]);
  status.appendChild(text[4]);
  priority.appendChild(text[5]);
  edit.append(text[6])
  edit.id = "edit"
  edit.type="button"
  edit.value = "edit"
  edit.setAttribute("onclick","Edit("+todos[i].id+")")
  view.appendChild(text[7])
  view.id="view"
  view.type="button"
  view.value="view"
  view.setAttribute("onclick","Notes("+todos[i].id+")")
  td.appendChild(view)
  tdedit.appendChild(edit)
  tr.appendChild(id);
  tr.appendChild(title);
  tr.appendChild(description);
  tr.appendChild(due);
  tr.appendChild(status);
  tr.appendChild(priority);
  tr.appendChild(tdedit);
  tr.appendChild(td);
  
    document.getElementById("table").appendChild(tr);
  }
}