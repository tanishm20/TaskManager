async function Edit(id){
    document.getElementById('id02').style.display='block'
    id = Number(id)
    const update = document.getElementById("update")
    update.setAttribute("action",`/todos/${id}/`)
  }