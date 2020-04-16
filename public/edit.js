async function Edit(id){
  var date = document.getElementById('due')
var tomorrowLocal = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 - new Date().getTimezoneOffset() * 60 * 1000).toISOString().substr(0,10);
date.value = tomorrowLocal
    document.getElementById('id02').style.display='block'
    id = Number(id)
    const update = document.getElementById("update")
    update.setAttribute("action",`/todos/${id}/`)
  }