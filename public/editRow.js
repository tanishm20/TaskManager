//  this script edits the task

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

function tomorrowDate(){
    const today = new Date()
    const tommorow = new Date(today)
    tommorow.setDate(tommorow.getDate() + 1)
    return formatDate(tommorow)
}

function editTask(no)
{
    let btn = document.getElementById("edit"+no)
    if(btn.innerHTML === 'Edit'){
        let date = document.getElementById("date"+no)
        let priority = document.getElementById("priority"+no)
        let state = document.getElementById("state"+no)
            
        let date_data = date.innerHTML;
        let priority_data = priority.innerHTML;
        let state_data = state.innerHTML;

        date.innerHTML="<input type='date' id='date_text"+no+"' value='"+date_data+"'>";
        priority.innerHTML = "<select id='priority_text"+no+"'><option value='high'>High</option><option value='medium'>Medium</option><option value='low'>Low</option></select>"
        state.innerHTML = "Completed: <input type='checkbox' id='state_text"+no+"'>"
        btn.innerHTML = 'Save'
    }else{

        let date_val = document.getElementById("date_text"+no).value
        if(date_val === ""){
            date_val = tomorrowDate()
        }
         
        let priority_val = document.getElementById("priority_text"+no).value 
        let state_chk = document.getElementById("state_text"+no).checked
        let state_val = 'incomplete'
        if(state_chk === true){
            state_val = 'complete'
        }
        
        let date = document.getElementById("date"+no)
        let priority = document.getElementById("priority"+no)
        let state = document.getElementById("state"+no)

        date.innerHTML = date_val
        priority.innerHTML = priority_val
        state.innerHTML = state_val

        addTaskToJson(date_val, priority_val, state_val, no)
        btn.innerHTML = 'Edit'
    }
}


async function addTaskToJson(date, priority, state, id){
    const resp = await fetch('/tasks/'+id,{
        method: 'PATCH',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({date, priority, state})
    })
}