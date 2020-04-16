// this script add new task to the table and database 

// this function format the date
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// returns tomorrow date
function tomorrowDate(){
    const today = new Date()
    const tommorow = new Date(today)
    tommorow.setDate(tommorow.getDate() + 1)
    return formatDate(tommorow)
}

window.onload = function(){
    document.getElementById("myDate").value = tomorrowDate()
}

// add task
function addTask(){
    let title = document.getElementById('title').value
    if(title === ""){
        alert('Enter Title')
        return
    }
    let description = document.getElementById('description').value
    let date = document.getElementById('myDate').value
    if(date === ""){
        date = tomorrowDate()
    }
    let priority = document.getElementById('priority').value
    let state = document.getElementById('state').value

    addNewTaskToJson(title, description, date, priority, state)
    getLastTask()
}

// display the task added in table
async function getLastTask(){
    let table = document.querySelector("table")
    let lastRow = table.rows.length
    const resp = await fetch('/tasks/'+(lastRow), {method: 'GET'})
    const tasks = await resp.json()
    let row = table.insertRow();
    row.id = "row" + lastRow
    let cell = row.insertCell();
    let text = document.createTextNode('+');
    cell.className = "child"
    cell.id = 'icon' + lastRow
    cell.setAttribute('hit', 0)
    cell.setAttribute('onclick', "displayNotes("+ lastRow +");");
    cell.appendChild(text);
    
    for (key in tasks) {
        let cell = row.insertCell();
        cell.id = key+lastRow
        let text = document.createTextNode(tasks[key]);
        cell.appendChild(text);
    }
    
    let lcell = row.insertCell();
    let ltext = document.createTextNode('Edit');
    lcell.className = "child"
    lcell.id = 'edit' + lastRow
    lcell.setAttribute('onclick', "editTask(" + lastRow +");");
    lcell.appendChild(ltext);

}

async function addNewTaskToUrlEncode(title, description, date, priority, state){
    const resp = await fetch('/tasks',{
        method: 'POST',
        headers:{
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: `title=${title}&description=${description}&date=${date}&priority=${priority}&state=${state}`
    })
}

async function addNewTaskToJson(title, description, date, priority, state){
    const resp = await fetch('/tasks',{
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({title, description, date, priority, state})
    })
}